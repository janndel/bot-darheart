'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "historiaspasado",
    "desc": "Consulta de historias sobre pasado.",
    "tipo": "texto",
    "pool": "historias",
    "titulo": "HISTORIA · PASADO",
    "emoji": "📖",
    "soloGrupo": false,
    "category": "juegos",
    "alias": []
});
