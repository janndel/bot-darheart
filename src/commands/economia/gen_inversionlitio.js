'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "inversionlitio",
    "desc": "Invierte en litio (5s).",
    "tipo": "inversion",
    "asset": "litio",
    "titulo": "INVERSIÓN: LITIO",
    "cooldown": 15,
    "campo": "lastInversionExtra",
    "emoji": "💹",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
