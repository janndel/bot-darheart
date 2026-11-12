'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "recolectarjungla1",
    "desc": "Recolecta recursos en jungla (5s).",
    "tipo": "recolectar",
    "lugar": "jungla",
    "items": [
        [
            "orquídea",
            [
                40,
                130
            ]
        ],
        [
            "pluma",
            [
                60,
                175
            ]
        ],
        [
            "fruta",
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
            "ídolo",
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
