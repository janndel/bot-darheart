const fs = require('fs');
const path = require('path');

function readJson(file, fallback = {}) {
    try {
        const data = JSON.parse(fs.readFileSync(file, 'utf8'));
        return data && typeof data === 'object' ? data : fallback;
    } catch {
        return fallback;
    }
}

function writeJsonAtomic(file, data) {
    const dir = path.dirname(file);
    fs.mkdirSync(dir, { recursive: true });
    const tmp = path.join(dir, `.${path.basename(file)}.${process.pid}.${Date.now()}.tmp`);
    const json = JSON.stringify(data, null, 2);
    let fd;
    try {
        fd = fs.openSync(tmp, 'w');
        fs.writeFileSync(fd, json);
        try { fs.fsyncSync(fd); } catch {}
    } finally {
        if (fd !== undefined) {
            try { fs.closeSync(fd); } catch {}
        }
    }
    fs.renameSync(tmp, file);
    try {
        const dfd = fs.openSync(dir, 'r');
        try { fs.fsyncSync(dfd); } catch {}
        fs.closeSync(dfd);
    } catch {}
    return true;
}

function updateJson(file, mutator, fallback = {}) {
    const data = readJson(file, fallback);
    const result = mutator(data);
    writeJsonAtomic(file, data);
    return result === undefined ? data : result;
}

module.exports = { readJson, writeJsonAtomic, updateJson };
