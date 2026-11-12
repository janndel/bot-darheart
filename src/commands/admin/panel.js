const path = require('path');
const {
    obtenerActivosDelGrupo,
    statsGrupo,
    soloNumero,
    formatearMencion,
    cargarJSON
} = require('../../lib/grupo');
const { esOwner } = require('../../lib/permissions');
const { NOMBRE_BOT, enviarRich } = require('../../lib/rich');

const HOME = process.env.HOME;
const CONFIG_GRUPOS = path.join(HOME, 'config_grupos.json');

function construirPanel(datos = {}) {
    const {
        metadata = {},
        stats = {},
        admins = [],
        inactivos = [],
        filtros = [],
        ultimaActividad = 'N/A',
        prefijo = ',',
        esOw = false,
        esAd = false
    } = datos;

    const top10 = Array.isArray(stats.top10) ? stats.top10 : [];
    const adminsValidos = admins.filter(a => a && soloNumero(a.id));
    const adminList = adminsValidos.length
        ? adminsValidos.map(a => `@${soloNumero(a.id)}`).join(', ')
        : 'Ninguno';
    const adminMenciones = adminsValidos.map(a => formatearMencion(a.id)).filter(Boolean);
    const topTexto = top10.length
        ? top10.slice(0, 5).map((u, i) => `${i + 1}. ${u.num} — ${u.count} msj`).join('\n')
        : 'Sin actividad registrada';

    const rich = [];
    rich.push({ text: `## 🎛️ PANEL — ${metadata.subject || 'Grupo'}` });
    rich.push({ text: '**📊 Resumen del grupo**' });
    rich.push({
        language: 'bash',
        code: [{
            highlightType: 0,
            codeContent:
`Miembros: ${stats.totalMiembros || 0}
Admins: ${adminsValidos.length}
Mensajes totales: ${stats.total || 0}
Promedio: ${stats.promedio || 0} msg/activo
Inactivos: ${inactivos.length}
Última actividad: ${ultimaActividad}`
        }]
    });

    rich.push({ text: '## ◆ 🏆 Top actividad' });
    rich.push({ language: 'bash', code: [{ highlightType: 0, codeContent: topTexto }] });

    rich.push({ text: '## ◆ 🔧 Filtros activos' });
    rich.push({
        language: 'bash',
        code: [{ highlightType: 0, codeContent: (filtros.length ? filtros : ['Ninguno']).join('\n') }]
    });

    rich.push({ text: '## ◆ 👮 Administradores' });
    rich.push({ text: `👮 *Administradores (${adminsValidos.length})*\n${adminList}` });

    const notas = [];
    if (esOw) notas.push('👑 Eres OWNER del bot');
    else if (esAd) notas.push('🛡️ Eres admin del grupo');
    if (notas.length) rich.push({ text: notas.join('\n') });

    rich.push({ text: `---\n\n📌 *Comandos rápidos*\n${prefijo}topactivos · ${prefijo}topinactivos · ${prefijo}reporte · ${prefijo}reportes` });

    return {
        rich,
        adminList,
        adminMenciones,
        totalAdmins: adminsValidos.length
    };
}

module.exports = {
    name: 'panel',
    alias: ['dashboard', 'grupoinfo', 'ginfo', 'groupinfo', 'gp'],
    category: 'admin',
    desc: 'Panel de control del grupo con estadísticas y configuración',
    async execute(sock, msg, args, { chatId, config }) {
        if (!chatId.endsWith('@g.us')) {
            return await sock.sendMessage(chatId, { text: '⚠️ Este comando solo funciona en grupos.' });
        }

        const prefijo = config?.prefijo || ',';
        const sender = msg.key.participant || msg.key.remoteJid;
        const senderNum = soloNumero(sender);
        const esOw = esOwner(sock, msg);

        try {
            const metadata = await sock.groupMetadata(chatId);
            const participantes = metadata.participants || [];
            const admins = participantes.filter(p => p.admin === 'admin' || p.admin === 'superadmin');
            const esAd = admins.some(a => [a.id, a.lid, a.phoneNumber]
                .filter(Boolean)
                .some(x => soloNumero(x) === senderNum));

            const activosGrupo = obtenerActivosDelGrupo(chatId);
            const stats = statsGrupo(activosGrupo, participantes);

            const botNum = soloNumero(sock.user?.id || '');
            const esElBot = p => [p.id, p.lid, p.phoneNumber]
                .filter(Boolean)
                .some(x => soloNumero(x) === botNum);
            const inactivos = stats.inactivos.filter(p => !esElBot(p));

            const configGrupos = cargarJSON(CONFIG_GRUPOS);
            const gc = configGrupos[chatId] || {};

            const filtros = [];
            if (gc.antilink) filtros.push('🔗 Antilink');
            if (gc.nsfw) filtros.push('🔞 NSFW');
            if (gc.antisticker) filtros.push('🧊 Antisticker');
            if (gc.antiflood) filtros.push('🚦 Antiflood');
            if (gc.modoadmin) filtros.push('🛡️ ModoAdmin');
            if (gc.botActivo === false) filtros.push('💤 Bot desactivado');

            const maxLast = stats.ranking.length
                ? Math.max(...stats.ranking.map(r => r.lastSeen || 0))
                : 0;
            const ultimaActividad = maxLast
                ? new Date(maxLast).toLocaleString('es-ES', { hour: '2-digit', minute: '2-digit' })
                : 'N/A';

            const panel = construirPanel({
                metadata,
                stats,
                admins,
                inactivos,
                filtros,
                ultimaActividad,
                prefijo,
                esOw,
                esAd
            });

            await enviarRich(sock, chatId, panel.rich, {
                disclaimerText: `${NOMBRE_BOT} — Prefijo: ${prefijo}`,
                footerText: `${NOMBRE_BOT} — by JANNDEL`,
                mentions: panel.adminMenciones
            });
        } catch (error) {
            console.error('Error panel:', error.message);
            try {
                await sock.sendMessage(chatId, { text: '❌ No se pudo cargar el panel del grupo.' });
            } catch (e) {}
        }
    }
};

module.exports.construirPanel = construirPanel;
