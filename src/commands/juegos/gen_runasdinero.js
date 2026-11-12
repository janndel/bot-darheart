'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "runasdinero",
    "desc": "Consulta de runas sobre dinero.",
    "tipo": "texto",
    "pool": "runas",
    "titulo": "RUNAS · DINERO",
    "emoji": "🪨",
    "soloGrupo": false,
    "category": "juegos",
    "alias": []
});
