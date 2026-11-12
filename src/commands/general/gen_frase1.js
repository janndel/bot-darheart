'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "frase1",
    "desc": "Frase motivacional número 1.",
    "tipo": "texto",
    "pool": "frases",
    "titulo": "FRASE #1",
    "emoji": "💭",
    "soloGrupo": false,
    "category": "general",
    "alias": []
});
