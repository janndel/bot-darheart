'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "suertedinero",
    "desc": "Consulta de suerte sobre dinero.",
    "tipo": "texto",
    "pool": "suerte",
    "titulo": "SUERTE · DINERO",
    "emoji": "🍀",
    "soloGrupo": false,
    "category": "juegos",
    "alias": []
});
