'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "recolectarcastillo1",
    "desc": "Recolecta recursos en castillo (5s).",
    "tipo": "recolectar",
    "lugar": "castillo",
    "items": [
        [
            "armadura",
            [
                40,
                130
            ]
        ],
        [
            "espada",
            [
                60,
                175
            ]
        ],
        [
            "corona",
            [
                80,
                220
            ]
        ],
        [
            "moneda",
            [
                100,
                265
            ]
        ],
        [
            "escudo",
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
