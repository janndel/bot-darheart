const dl = require('./dl.js');

module.exports = {
    ...dl,
    name: 'facebook',
    alias: ['fb', 'fbdl'],
    category: 'descargas',
    desc: 'Descarga videos y fotos de Facebook',
    timeout: 1800000
};
