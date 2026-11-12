'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "trabajocajero",
    "desc": "Trabaja de cajero y gana coins (5s).",
    "tipo": "trabajo",
    "oficio": "cajero",
    "lugar": "una caja",
    "emoji": "💳",
    "titulo": "TRABAJO: CAJERO",
    "min": 140,
    "max": 310,
    "cooldown": 20,
    "campo": "lastTrabajoExtra",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
