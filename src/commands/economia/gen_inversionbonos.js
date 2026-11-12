'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "inversionbonos",
    "desc": "Invierte en bonos (5s).",
    "tipo": "inversion",
    "asset": "bonos",
    "titulo": "INVERSIÓN: BONOS",
    "cooldown": 15,
    "campo": "lastInversionExtra",
    "emoji": "💹",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
