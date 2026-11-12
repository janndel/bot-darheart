'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "historiassalud",
    "desc": "Consulta de historias sobre salud.",
    "tipo": "texto",
    "pool": "historias",
    "titulo": "HISTORIA · SALUD",
    "emoji": "📖",
    "soloGrupo": false,
    "category": "juegos",
    "alias": []
});
