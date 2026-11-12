'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "inversionvino",
    "desc": "Invierte en vino (5s).",
    "tipo": "inversion",
    "asset": "vino",
    "titulo": "INVERSIÓN: VINO",
    "cooldown": 15,
    "campo": "lastInversionExtra",
    "emoji": "💹",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
