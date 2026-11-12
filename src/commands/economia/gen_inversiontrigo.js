'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "inversiontrigo",
    "desc": "Invierte en trigo (5s).",
    "tipo": "inversion",
    "asset": "trigo",
    "titulo": "INVERSIÓN: TRIGO",
    "cooldown": 15,
    "campo": "lastInversionExtra",
    "emoji": "💹",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
