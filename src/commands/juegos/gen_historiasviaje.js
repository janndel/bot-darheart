'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "historiasviaje",
    "desc": "Consulta de historias sobre viaje.",
    "tipo": "texto",
    "pool": "historias",
    "titulo": "HISTORIA · VIAJE",
    "emoji": "📖",
    "soloGrupo": false,
    "category": "juegos",
    "alias": []
});
