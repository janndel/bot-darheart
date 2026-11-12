'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "recolectarplaya1",
    "desc": "Recolecta recursos en playa (5s).",
    "tipo": "recolectar",
    "lugar": "playa",
    "items": [
        [
            "concha",
            [
                40,
                130
            ]
        ],
        [
            "perla",
            [
                60,
                175
            ]
        ],
        [
            "botella",
            [
                80,
                220
            ]
        ],
        [
            "cangrejo",
            [
                100,
                265
            ]
        ],
        [
            "estrella de mar",
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
