'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "trabajozapatero",
    "desc": "Trabaja de zapatero y gana coins (5s).",
    "tipo": "trabajo",
    "oficio": "zapatero",
    "lugar": "unos zapatos",
    "emoji": "👞",
    "titulo": "TRABAJO: ZAPATERO",
    "min": 60,
    "max": 310,
    "cooldown": 20,
    "campo": "lastTrabajoExtra",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
