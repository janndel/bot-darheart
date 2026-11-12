'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "suerteamistad",
    "desc": "Consulta de suerte sobre amistad.",
    "tipo": "texto",
    "pool": "suerte",
    "titulo": "SUERTE · AMISTAD",
    "emoji": "🍀",
    "soloGrupo": false,
    "category": "juegos",
    "alias": []
});
