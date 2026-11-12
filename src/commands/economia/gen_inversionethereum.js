'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "inversionethereum",
    "desc": "Invierte en ethereum (5s).",
    "tipo": "inversion",
    "asset": "ethereum",
    "titulo": "INVERSIÓN: ETHEREUM",
    "cooldown": 15,
    "campo": "lastInversionExtra",
    "emoji": "💹",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
