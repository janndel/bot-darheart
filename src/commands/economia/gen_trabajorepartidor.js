'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "trabajorepartidor",
    "desc": "Trabaja de repartidor y gana coins (5s).",
    "tipo": "trabajo",
    "oficio": "repartidor",
    "lugar": "un pedido",
    "emoji": "📦",
    "titulo": "TRABAJO: REPARTIDOR",
    "min": 120,
    "max": 310,
    "cooldown": 20,
    "campo": "lastTrabajoExtra",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
