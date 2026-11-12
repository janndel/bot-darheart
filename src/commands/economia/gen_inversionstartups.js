'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "inversionstartups",
    "desc": "Invierte en startups (5s).",
    "tipo": "inversion",
    "asset": "startups",
    "titulo": "INVERSIÓN: STARTUPS",
    "cooldown": 15,
    "campo": "lastInversionExtra",
    "emoji": "💹",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
