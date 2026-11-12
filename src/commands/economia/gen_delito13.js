'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "delito13",
    "desc": "Intenta un delito: saqueaste un almacén (5s).",
    "tipo": "delito",
    "delito": "saqueaste un almacén",
    "emoji": "🏚️",
    "titulo": "DELITO #13",
    "chance": 45,
    "min": 150,
    "max": 550,
    "fineMin": 80,
    "fineMax": 260,
    "cooldown": 30,
    "campo": "lastCrimenExtra",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
