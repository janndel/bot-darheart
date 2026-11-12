'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "tarotsalud",
    "desc": "Consulta de tarot sobre salud.",
    "tipo": "texto",
    "pool": "tarot",
    "titulo": "TAROT · SALUD",
    "emoji": "🔮",
    "soloGrupo": false,
    "category": "juegos",
    "alias": []
});
