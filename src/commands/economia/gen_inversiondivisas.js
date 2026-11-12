'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "inversiondivisas",
    "desc": "Invierte en divisas (5s).",
    "tipo": "inversion",
    "asset": "divisas",
    "titulo": "INVERSIÓN: DIVISAS",
    "cooldown": 15,
    "campo": "lastInversionExtra",
    "emoji": "💹",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
