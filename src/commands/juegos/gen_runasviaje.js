'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "runasviaje",
    "desc": "Consulta de runas sobre viaje.",
    "tipo": "texto",
    "pool": "runas",
    "titulo": "RUNAS · VIAJE",
    "emoji": "🪨",
    "soloGrupo": false,
    "category": "juegos",
    "alias": []
});
