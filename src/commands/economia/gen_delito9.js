'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "delito9",
    "desc": "Intenta un delito: falsificaste billetes (5s).",
    "tipo": "delito",
    "delito": "falsificaste billetes",
    "emoji": "💵",
    "titulo": "DELITO #9",
    "chance": 45,
    "min": 210,
    "max": 350,
    "fineMin": 80,
    "fineMax": 260,
    "cooldown": 30,
    "campo": "lastCrimenExtra",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
