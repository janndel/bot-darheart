'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "suertetrabajo",
    "desc": "Consulta de suerte sobre trabajo.",
    "tipo": "texto",
    "pool": "suerte",
    "titulo": "SUERTE · TRABAJO",
    "emoji": "🍀",
    "soloGrupo": false,
    "category": "juegos",
    "alias": []
});
