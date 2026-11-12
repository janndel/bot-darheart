'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "historiasdecisiones",
    "desc": "Consulta de historias sobre decisiones.",
    "tipo": "texto",
    "pool": "historias",
    "titulo": "HISTORIA · DECISIONES",
    "emoji": "📖",
    "soloGrupo": false,
    "category": "juegos",
    "alias": []
});
