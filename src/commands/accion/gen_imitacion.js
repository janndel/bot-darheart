'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "imitacion",
    "desc": "Acción: imitacion con un usuario mencionado.",
    "tipo": "accion",
    "textos": [
        "{user} imitó a {target}."
    ],
    "emoji": "🎭",
    "soloGrupo": true,
    "category": "accion",
    "alias": []
});
