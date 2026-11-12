const dl = require('./dl.js');

module.exports = {
    ...dl,
    name: 'tiktok',
    alias: ['tt', 'ttdl'],
    category: 'descargas',
    desc: 'Descarga videos y fotos de TikTok',
    timeout: 1800000
};
