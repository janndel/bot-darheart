'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "inversiondolares",
    "desc": "Invierte en dolares (5s).",
    "tipo": "inversion",
    "asset": "dolares",
    "titulo": "INVERSIÓN: DOLARES",
    "cooldown": 15,
    "campo": "lastInversionExtra",
    "emoji": "💹",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
