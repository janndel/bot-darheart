const { EventEmitter } = require('events');

class DownloadQueue extends EventEmitter {
    constructor({ concurrency = 1, maxHistory = 40, timeoutMs = 30 * 60 * 1000 } = {}) {
        super();
        this.concurrency = Math.max(1, concurrency);
        this.maxHistory = maxHistory;
        this.timeoutMs = timeoutMs;
        this.activos = 0;
        this.cola = [];
        this.jobs = new Map();
        this.historial = [];
        this.secuencia = 0;
    }

    enqueue(meta, task) {
        const id = String(++this.secuencia).padStart(4, '0');
        const job = {
            id,
            chatId: meta.chatId,
            tipo: meta.tipo || 'descarga',
            url: meta.url || '',
            titulo: meta.titulo || '',
            estado: 'queued',
            progreso: 0,
            detalle: '',
            creado: Date.now(),
            iniciado: 0,
            terminado: 0,
            error: null,
            abortController: new AbortController(),
            proceso: null,
            task,
            timeoutMs: Number(meta.timeoutMs) || this.timeoutMs
        };
        this.jobs.set(id, job);
        this.cola.push(job);
        job.promise = new Promise((resolve, reject) => {
            job._resolve = resolve;
            job._reject = reject;
        });
        job.promise.catch(() => {});
        this.emit('queued', job);
        this._bombear();
        return job;
    }

    posicion(job) {
        if (!job) return 0;
        if (job.estado === 'running') return 1;
        if (job.estado !== 'queued') return 0;
        return this.cola.indexOf(job) + 1 + this.activos;
    }

    listar(chatId) {
        const todos = [...this.jobs.values()]
            .filter(j => !chatId || j.chatId === chatId)
            .filter(j => j.estado === 'running' || j.estado === 'queued')
            .sort((a, b) => a.creado - b.creado);
        const recientes = this.historial
            .filter(j => !chatId || j.chatId === chatId)
            .slice(-8);
        return { activos: todos, recientes };
    }

    cancelar(id, chatId) {
        const job = this._buscar(id, chatId);
        if (!job) return { ok: false, error: 'Trabajo no encontrado.' };
        if (job.estado === 'queued') {
            const i = this.cola.indexOf(job);
            if (i >= 0) this.cola.splice(i, 1);
            this._finalizar(job, 'cancelled', new Error('Descarga cancelada.'));
            return { ok: true, job };
        }
        if (job.estado === 'running') {
            job.estado = 'cancelando';
            try { job.abortController.abort(); } catch {}
            this._matarProceso(job);
            return { ok: true, job };
        }
        return { ok: false, error: 'Ese trabajo ya terminó.' };
    }

    _buscar(id, chatId) {
        const clave = String(id || '').replace(/^#/, '');
        for (const job of this.jobs.values()) {
            if (chatId && job.chatId !== chatId) continue;
            if (job.id === clave || job.id.endsWith(clave)) return job;
        }
        return null;
    }

    _bombear() {
        while (this.activos < this.concurrency && this.cola.length) {
            const job = this.cola.shift();
            if (job.estado !== 'queued') continue;
            this._ejecutar(job);
        }
    }

    async _ejecutar(job) {
        this.activos++;
        job.estado = 'running';
        job.iniciado = Date.now();
        this.emit('start', job);
        const timer = setTimeout(() => {
            try { job.abortController.abort(); } catch {}
            this._matarProceso(job);
        }, job.timeoutMs);
        timer.unref?.();

        const cancelacion = new Promise((_, reject) => {
            if (job.abortController.signal.aborted) return reject(new Error('Descarga cancelada.'));
            job.abortController.signal.addEventListener('abort', () => {
                reject(new Error('Descarga cancelada.'));
            }, { once: true });
        });

        try {
            const resultado = await Promise.race([
                job.task({
                    job,
                    signal: job.abortController.signal,
                    reportar: (porcentaje, detalle = '') => this._reportar(job, porcentaje, detalle)
                }),
                cancelacion
            ]);
            this._finalizar(job, 'done', null, resultado);
        } catch (error) {
            const cancelado = job.estado === 'cancelando' || job.abortController.signal.aborted || /cancelad/i.test(String(error?.message));
            this._finalizar(job, cancelado ? 'cancelled' : 'error', error);
        } finally {
            clearTimeout(timer);
            this.activos = Math.max(0, this.activos - 1);
            this._bombear();
        }
    }

    _reportar(job, porcentaje, detalle) {
        const p = Math.max(0, Math.min(100, Math.round(Number(porcentaje) || 0)));
        if (p === job.progreso && detalle === job.detalle) return;
        job.progreso = p;
        job.detalle = detalle;
        this.emit('progress', job);
    }

    _matarProceso(job) {
        const child = job.proceso;
        if (!child || child.killed) return;
        const matar = (senal) => {
            try { child.kill(senal); } catch {}
            if (job.grupoProceso && child.pid) {
                try { process.kill(-child.pid, senal); } catch {}
            }
        };
        matar('SIGTERM');
        const t = setTimeout(() => matar('SIGKILL'), 5000);
        t.unref?.();
        child.once?.('exit', () => clearTimeout(t));
    }

    registrarProceso(job, child, { grupo = false } = {}) {
        if (!job || !child) return;
        job.proceso = child;
        job.grupoProceso = Boolean(grupo);
        if (job.abortController.signal.aborted) this._matarProceso(job);
        child.once?.('exit', () => {
            if (job.proceso === child) job.proceso = null;
        });
    }

    _finalizar(job, estado, error, resultado) {
        if (job.estado === 'done' || job.estado === 'error' || job.estado === 'cancelled') return;
        job.estado = estado;
        job.terminado = Date.now();
        job.error = error ? String(error.message || error) : null;
        job.resultado = resultado;
        this.jobs.delete(job.id);
        this.historial.push(job);
        if (this.historial.length > this.maxHistory) {
            this.historial.splice(0, this.historial.length - this.maxHistory);
        }
        this.emit(estado, job);
        if (estado === 'done') job._resolve(resultado);
        else job._reject(error || new Error(estado));
    }
}

module.exports = new DownloadQueue({ concurrency: 1 });
module.exports.DownloadQueue = DownloadQueue;
