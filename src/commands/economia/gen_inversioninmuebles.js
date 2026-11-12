'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "inversioninmuebles",
    "desc": "Invierte en inmuebles (5s).",
    "tipo": "inversion",
    "asset": "inmuebles",
    "titulo": "INVERSIÓN: INMUEBLES",
    "cooldown": 15,
    "campo": "lastInversionExtra",
    "emoji": "💹",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
