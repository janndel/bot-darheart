'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "trabajolenador",
    "desc": "Trabaja de lenador y gana coins (5s).",
    "tipo": "trabajo",
    "oficio": "lenador",
    "lugar": "un bosque",
    "emoji": "🪓",
    "titulo": "TRABAJO: LENADOR",
    "min": 120,
    "max": 250,
    "cooldown": 20,
    "campo": "lastTrabajoExtra",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
