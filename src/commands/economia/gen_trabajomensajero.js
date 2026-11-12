'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "trabajomensajero",
    "desc": "Trabaja de mensajero y gana coins (5s).",
    "tipo": "trabajo",
    "oficio": "mensajero",
    "lugar": "un encargo",
    "emoji": "✉️",
    "titulo": "TRABAJO: MENSAJERO",
    "min": 140,
    "max": 340,
    "cooldown": 20,
    "campo": "lastTrabajoExtra",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
