'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "trabajocartero",
    "desc": "Trabaja de cartero y gana coins (5s).",
    "tipo": "trabajo",
    "oficio": "cartero",
    "lugar": "el correo",
    "emoji": "📬",
    "titulo": "TRABAJO: CARTERO",
    "min": 120,
    "max": 190,
    "cooldown": 20,
    "campo": "lastTrabajoExtra",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
