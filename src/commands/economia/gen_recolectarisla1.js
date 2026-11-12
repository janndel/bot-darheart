'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "recolectarisla1",
    "desc": "Recolecta recursos en isla (5s).",
    "tipo": "recolectar",
    "lugar": "isla",
    "items": [
        [
            "coco",
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
            "concha",
            [
                80,
                220
            ]
        ],
        [
            "mapa",
            [
                100,
                265
            ]
        ],
        [
            "tesoro",
            [
                120,
                310
            ]
        ]
    ],
    "emoji": "🧭",
    "fail": 18,
    "cooldown": 12,
    "campo": "lastRecolectarExtra",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
