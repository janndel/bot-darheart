'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "historiassuerte",
    "desc": "Consulta de historias sobre suerte.",
    "tipo": "texto",
    "pool": "historias",
    "titulo": "HISTORIA · SUERTE",
    "emoji": "📖",
    "soloGrupo": false,
    "category": "juegos",
    "alias": []
});
