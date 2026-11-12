'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "inversionyenes",
    "desc": "Invierte en yenes (5s).",
    "tipo": "inversion",
    "asset": "yenes",
    "titulo": "INVERSIÓN: YENES",
    "cooldown": 15,
    "campo": "lastInversionExtra",
    "emoji": "💹",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
