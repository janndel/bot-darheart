'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "cartas",
    "desc": "Acción: cartas con un usuario mencionado.",
    "tipo": "accion",
    "textos": [
        "{user} jugó a las cartas con {target}."
    ],
    "emoji": "🃏",
    "soloGrupo": true,
    "category": "accion",
    "alias": []
});
