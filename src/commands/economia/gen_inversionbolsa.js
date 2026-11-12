'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "inversionbolsa",
    "desc": "Invierte en bolsa (5s).",
    "tipo": "inversion",
    "asset": "bolsa",
    "titulo": "INVERSIÓN: BOLSA",
    "cooldown": 15,
    "campo": "lastInversionExtra",
    "emoji": "💹",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
