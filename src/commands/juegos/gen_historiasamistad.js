'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "historiasamistad",
    "desc": "Consulta de historias sobre amistad.",
    "tipo": "texto",
    "pool": "historias",
    "titulo": "HISTORIA · AMISTAD",
    "emoji": "📖",
    "soloGrupo": false,
    "category": "juegos",
    "alias": []
});
