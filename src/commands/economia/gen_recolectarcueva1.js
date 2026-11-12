'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "recolectarcueva1",
    "desc": "Recolecta recursos en cueva (5s).",
    "tipo": "recolectar",
    "lugar": "cueva",
    "items": [
        [
            "cristal",
            [
                40,
                130
            ]
        ],
        [
            "oro",
            [
                60,
                175
            ]
        ],
        [
            "hueso",
            [
                80,
                220
            ]
        ],
        [
            "gema",
            [
                100,
                265
            ]
        ],
        [
            "fósil",
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
