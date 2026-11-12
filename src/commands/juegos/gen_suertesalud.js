'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "suertesalud",
    "desc": "Consulta de suerte sobre salud.",
    "tipo": "texto",
    "pool": "suerte",
    "titulo": "SUERTE · SALUD",
    "emoji": "🍀",
    "soloGrupo": false,
    "category": "juegos",
    "alias": []
});
