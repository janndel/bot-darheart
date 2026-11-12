'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "recolectarpantano1",
    "desc": "Recolecta recursos en pantano (5s).",
    "tipo": "recolectar",
    "lugar": "pantano",
    "items": [
        [
            "musgo",
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
            "reliquia",
            [
                80,
                220
            ]
        ],
        [
            "pez",
            [
                100,
                265
            ]
        ],
        [
            "fango",
            [
                120,
                310
            ]
        ]
    ],
    "emoji": "🧭",
    "fail": 15,
    "cooldown": 12,
    "campo": "lastRecolectarExtra",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
