'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "inversionplata",
    "desc": "Invierte en plata (5s).",
    "tipo": "inversion",
    "asset": "plata",
    "titulo": "INVERSIÓN: PLATA",
    "cooldown": 15,
    "campo": "lastInversionExtra",
    "emoji": "💹",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
