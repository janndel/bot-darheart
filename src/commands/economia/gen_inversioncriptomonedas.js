'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "inversioncriptomonedas",
    "desc": "Invierte en criptomonedas (5s).",
    "tipo": "inversion",
    "asset": "criptomonedas",
    "titulo": "INVERSIÓN: CRIPTOMONEDAS",
    "cooldown": 15,
    "campo": "lastInversionExtra",
    "emoji": "💹",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
