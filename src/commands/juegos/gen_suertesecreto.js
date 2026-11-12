'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "suertesecreto",
    "desc": "Consulta de suerte sobre secreto.",
    "tipo": "texto",
    "pool": "suerte",
    "titulo": "SUERTE · SECRETO",
    "emoji": "🍀",
    "soloGrupo": false,
    "category": "juegos",
    "alias": []
});
