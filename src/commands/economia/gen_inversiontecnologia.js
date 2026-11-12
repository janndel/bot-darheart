'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "inversiontecnologia",
    "desc": "Invierte en tecnologia (5s).",
    "tipo": "inversion",
    "asset": "tecnologia",
    "titulo": "INVERSIÓN: TECNOLOGIA",
    "cooldown": 15,
    "campo": "lastInversionExtra",
    "emoji": "💹",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
