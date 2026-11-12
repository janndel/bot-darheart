'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "suertedecisiones",
    "desc": "Consulta de suerte sobre decisiones.",
    "tipo": "texto",
    "pool": "suerte",
    "titulo": "SUERTE · DECISIONES",
    "emoji": "🍀",
    "soloGrupo": false,
    "category": "juegos",
    "alias": []
});
