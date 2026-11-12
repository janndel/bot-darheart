'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "suertehogar",
    "desc": "Consulta de suerte sobre hogar.",
    "tipo": "texto",
    "pool": "suerte",
    "titulo": "SUERTE · HOGAR",
    "emoji": "🍀",
    "soloGrupo": false,
    "category": "juegos",
    "alias": []
});
