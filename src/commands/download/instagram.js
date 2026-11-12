const dl = require('./dl.js');

module.exports = {
    ...dl,
    name: 'instagram',
    alias: ['ig', 'igdl', 'reel'],
    category: 'descargas',
    desc: 'Descarga fotos y videos de Instagram',
    timeout: 1800000
};
