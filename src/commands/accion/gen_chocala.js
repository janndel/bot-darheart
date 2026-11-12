'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "chocala",
    "desc": "Acción: chocala con un usuario mencionado.",
    "tipo": "accion",
    "textos": [
        "{user} chocó esos cinco con {target}."
    ],
    "emoji": "🙌",
    "soloGrupo": true,
    "category": "accion",
    "alias": []
});
