'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "inversioneuros",
    "desc": "Invierte en euros (5s).",
    "tipo": "inversion",
    "asset": "euros",
    "titulo": "INVERSIÓN: EUROS",
    "cooldown": 15,
    "campo": "lastInversionExtra",
    "emoji": "💹",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
