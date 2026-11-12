'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "inversionbienesraices",
    "desc": "Invierte en bienes raices (5s).",
    "tipo": "inversion",
    "asset": "bienes raices",
    "titulo": "INVERSIÓN: BIENES RAICES",
    "cooldown": 15,
    "campo": "lastInversionExtra",
    "emoji": "💹",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
