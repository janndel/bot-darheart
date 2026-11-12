'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "inversionoro",
    "desc": "Invierte en oro (5s).",
    "tipo": "inversion",
    "asset": "oro",
    "titulo": "INVERSIÓN: ORO",
    "cooldown": 15,
    "campo": "lastInversionExtra",
    "emoji": "💹",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
