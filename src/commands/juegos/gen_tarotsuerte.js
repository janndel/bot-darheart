'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "tarotsuerte",
    "desc": "Consulta de tarot sobre suerte.",
    "tipo": "texto",
    "pool": "tarot",
    "titulo": "TAROT · SUERTE",
    "emoji": "🔮",
    "soloGrupo": false,
    "category": "juegos",
    "alias": []
});
