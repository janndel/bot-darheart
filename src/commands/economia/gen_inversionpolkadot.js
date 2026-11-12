'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "inversionpolkadot",
    "desc": "Invierte en polkadot (5s).",
    "tipo": "inversion",
    "asset": "polkadot",
    "titulo": "INVERSIÓN: POLKADOT",
    "cooldown": 15,
    "campo": "lastInversionExtra",
    "emoji": "💹",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
