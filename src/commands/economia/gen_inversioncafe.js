'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "inversioncafe",
    "desc": "Invierte en cafe (5s).",
    "tipo": "inversion",
    "asset": "cafe",
    "titulo": "INVERSIÓN: CAFE",
    "cooldown": 15,
    "campo": "lastInversionExtra",
    "emoji": "💹",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
