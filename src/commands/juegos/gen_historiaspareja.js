'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "historiaspareja",
    "desc": "Consulta de historias sobre pareja.",
    "tipo": "texto",
    "pool": "historias",
    "titulo": "HISTORIA · PAREJA",
    "emoji": "📖",
    "soloGrupo": false,
    "category": "juegos",
    "alias": []
});
