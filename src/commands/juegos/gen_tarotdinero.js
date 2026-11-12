'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "tarotdinero",
    "desc": "Consulta de tarot sobre dinero.",
    "tipo": "texto",
    "pool": "tarot",
    "titulo": "TAROT · DINERO",
    "emoji": "🔮",
    "soloGrupo": false,
    "category": "juegos",
    "alias": []
});
