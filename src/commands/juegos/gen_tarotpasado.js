'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "tarotpasado",
    "desc": "Consulta de tarot sobre pasado.",
    "tipo": "texto",
    "pool": "tarot",
    "titulo": "TAROT · PASADO",
    "emoji": "🔮",
    "soloGrupo": false,
    "category": "juegos",
    "alias": []
});
