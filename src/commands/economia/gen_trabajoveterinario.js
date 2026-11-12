'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "trabajoveterinario",
    "desc": "Trabaja de veterinario y gana coins (5s).",
    "tipo": "trabajo",
    "oficio": "veterinario",
    "lugar": "una veterinaria",
    "emoji": "🐾",
    "titulo": "TRABAJO: VETERINARIO",
    "min": 80,
    "max": 310,
    "cooldown": 20,
    "campo": "lastTrabajoExtra",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
