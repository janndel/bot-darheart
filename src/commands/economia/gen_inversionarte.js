'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "inversionarte",
    "desc": "Invierte en arte (5s).",
    "tipo": "inversion",
    "asset": "arte",
    "titulo": "INVERSIÓN: ARTE",
    "cooldown": 15,
    "campo": "lastInversionExtra",
    "emoji": "💹",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
