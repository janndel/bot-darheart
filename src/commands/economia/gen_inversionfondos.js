'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "inversionfondos",
    "desc": "Invierte en fondos (5s).",
    "tipo": "inversion",
    "asset": "fondos",
    "titulo": "INVERSIÓN: FONDOS",
    "cooldown": 15,
    "campo": "lastInversionExtra",
    "emoji": "💹",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
