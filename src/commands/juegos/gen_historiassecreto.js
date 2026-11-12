'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "historiassecreto",
    "desc": "Consulta de historias sobre secreto.",
    "tipo": "texto",
    "pool": "historias",
    "titulo": "HISTORIA · SECRETO",
    "emoji": "📖",
    "soloGrupo": false,
    "category": "juegos",
    "alias": []
});
