'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "suertedestino",
    "desc": "Consulta de suerte sobre destino.",
    "tipo": "texto",
    "pool": "suerte",
    "titulo": "SUERTE · DESTINO",
    "emoji": "🍀",
    "soloGrupo": false,
    "category": "juegos",
    "alias": []
});
