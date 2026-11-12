'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "inversioncardano",
    "desc": "Invierte en cardano (5s).",
    "tipo": "inversion",
    "asset": "cardano",
    "titulo": "INVERSIÓN: CARDANO",
    "cooldown": 15,
    "campo": "lastInversionExtra",
    "emoji": "💹",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
