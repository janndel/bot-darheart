'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "inversioncommodities",
    "desc": "Invierte en commodities (5s).",
    "tipo": "inversion",
    "asset": "commodities",
    "titulo": "INVERSIÓN: COMMODITIES",
    "cooldown": 15,
    "campo": "lastInversionExtra",
    "emoji": "💹",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
