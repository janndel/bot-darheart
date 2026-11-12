'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "suertepareja",
    "desc": "Consulta de suerte sobre pareja.",
    "tipo": "texto",
    "pool": "suerte",
    "titulo": "SUERTE · PAREJA",
    "emoji": "🍀",
    "soloGrupo": false,
    "category": "juegos",
    "alias": []
});
