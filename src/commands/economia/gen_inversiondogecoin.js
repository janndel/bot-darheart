'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "inversiondogecoin",
    "desc": "Invierte en dogecoin (5s).",
    "tipo": "inversion",
    "asset": "dogecoin",
    "titulo": "INVERSIÓN: DOGECOIN",
    "cooldown": 15,
    "campo": "lastInversionExtra",
    "emoji": "💹",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
