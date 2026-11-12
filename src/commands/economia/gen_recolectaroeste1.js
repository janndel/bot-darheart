'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "recolectaroeste1",
    "desc": "Recolecta recursos en oeste (5s).",
    "tipo": "recolectar",
    "lugar": "oeste",
    "items": [
        [
            "bala",
            [
                40,
                130
            ]
        ],
        [
            "herradura",
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
            "botas",
            [
                100,
                265
            ]
        ],
        [
            "sombrero",
            [
                120,
                310
            ]
        ]
    ],
    "emoji": "🧭",
    "fail": 12,
    "cooldown": 12,
    "campo": "lastRecolectarExtra",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
