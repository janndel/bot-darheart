'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "trabajoperiodista",
    "desc": "Trabaja de periodista y gana coins (5s).",
    "tipo": "trabajo",
    "oficio": "periodista",
    "lugar": "una noticia",
    "emoji": "📰",
    "titulo": "TRABAJO: PERIODISTA",
    "min": 140,
    "max": 220,
    "cooldown": 20,
    "campo": "lastTrabajoExtra",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
