'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "juego",
    "desc": "Acción: juego con un usuario mencionado.",
    "tipo": "accion",
    "textos": [
        "{user} jugó con {target}."
    ],
    "emoji": "🎲",
    "soloGrupo": true,
    "category": "accion",
    "alias": []
});
