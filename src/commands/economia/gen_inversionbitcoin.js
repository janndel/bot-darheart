'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "inversionbitcoin",
    "desc": "Invierte en bitcoin (5s).",
    "tipo": "inversion",
    "asset": "bitcoin",
    "titulo": "INVERSIÓN: BITCOIN",
    "cooldown": 15,
    "campo": "lastInversionExtra",
    "emoji": "💹",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
