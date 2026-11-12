const dl = require('./dl.js');

module.exports = {
    ...dl,
    name: 'x',
    alias: ['tw', 'twitter'],
    category: 'descargas',
    desc: 'Descarga fotos y videos de X/Twitter',
    timeout: 1800000
};
