'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "suerteviaje",
    "desc": "Consulta de suerte sobre viaje.",
    "tipo": "texto",
    "pool": "suerte",
    "titulo": "SUERTE · VIAJE",
    "emoji": "🍀",
    "soloGrupo": false,
    "category": "juegos",
    "alias": []
});
