'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "foto",
    "desc": "Acción: foto con un usuario mencionado.",
    "tipo": "accion",
    "textos": [
        "{user} se tomó una foto con {target}."
    ],
    "emoji": "📸",
    "soloGrupo": true,
    "category": "accion",
    "alias": []
});
