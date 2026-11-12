'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "runassecreto",
    "desc": "Consulta de runas sobre secreto.",
    "tipo": "texto",
    "pool": "runas",
    "titulo": "RUNAS · SECRETO",
    "emoji": "🪨",
    "soloGrupo": false,
    "category": "juegos",
    "alias": []
});
