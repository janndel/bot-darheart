'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "inversionsolana",
    "desc": "Invierte en solana (5s).",
    "tipo": "inversion",
    "asset": "solana",
    "titulo": "INVERSIÓN: SOLANA",
    "cooldown": 15,
    "campo": "lastInversionExtra",
    "emoji": "💹",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
