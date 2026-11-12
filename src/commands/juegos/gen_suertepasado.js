'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "suertepasado",
    "desc": "Consulta de suerte sobre pasado.",
    "tipo": "texto",
    "pool": "suerte",
    "titulo": "SUERTE · PASADO",
    "emoji": "🍀",
    "soloGrupo": false,
    "category": "juegos",
    "alias": []
});
