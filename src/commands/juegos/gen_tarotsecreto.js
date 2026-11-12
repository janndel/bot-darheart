'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "tarotsecreto",
    "desc": "Consulta de tarot sobre secreto.",
    "tipo": "texto",
    "pool": "tarot",
    "titulo": "TAROT · SECRETO",
    "emoji": "🔮",
    "soloGrupo": false,
    "category": "juegos",
    "alias": []
});
