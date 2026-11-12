'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "suertepresente",
    "desc": "Consulta de suerte sobre presente.",
    "tipo": "texto",
    "pool": "suerte",
    "titulo": "SUERTE · PRESENTE",
    "emoji": "🍀",
    "soloGrupo": false,
    "category": "juegos",
    "alias": []
});
