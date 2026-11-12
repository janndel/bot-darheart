'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "recolectarnieve1",
    "desc": "Recolecta recursos en nieve (5s).",
    "tipo": "recolectar",
    "lugar": "nieve",
    "items": [
        [
            "cristal",
            [
                40,
                130
            ]
        ],
        [
            "hueso",
            [
                60,
                175
            ]
        ],
        [
            "moneda",
            [
                80,
                220
            ]
        ],
        [
            "piedra",
            [
                100,
                265
            ]
        ],
        [
            "diamante",
            [
                120,
                310
            ]
        ]
    ],
    "emoji": "🧭",
    "fail": 21,
    "cooldown": 12,
    "campo": "lastRecolectarExtra",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
