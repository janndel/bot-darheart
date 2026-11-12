'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "inversioncoleccionables",
    "desc": "Invierte en coleccionables (5s).",
    "tipo": "inversion",
    "asset": "coleccionables",
    "titulo": "INVERSIÓN: COLECCIONABLES",
    "cooldown": 15,
    "campo": "lastInversionExtra",
    "emoji": "💹",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
