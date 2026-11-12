'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "runassalud",
    "desc": "Consulta de runas sobre salud.",
    "tipo": "texto",
    "pool": "runas",
    "titulo": "RUNAS · SALUD",
    "emoji": "🪨",
    "soloGrupo": false,
    "category": "juegos",
    "alias": []
});
