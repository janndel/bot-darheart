'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "inversioncobre",
    "desc": "Invierte en cobre (5s).",
    "tipo": "inversion",
    "asset": "cobre",
    "titulo": "INVERSIÓN: COBRE",
    "cooldown": 15,
    "campo": "lastInversionExtra",
    "emoji": "💹",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
