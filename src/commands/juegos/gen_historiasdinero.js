'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "historiasdinero",
    "desc": "Consulta de historias sobre dinero.",
    "tipo": "texto",
    "pool": "historias",
    "titulo": "HISTORIA · DINERO",
    "emoji": "📖",
    "soloGrupo": false,
    "category": "juegos",
    "alias": []
});
