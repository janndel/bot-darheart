'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "inversionacciones",
    "desc": "Invierte en acciones (5s).",
    "tipo": "inversion",
    "asset": "acciones",
    "titulo": "INVERSIÓN: ACCIONES",
    "cooldown": 15,
    "campo": "lastInversionExtra",
    "emoji": "💹",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
