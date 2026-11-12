'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "recolectarbosque1",
    "desc": "Recolecta recursos en bosque (5s).",
    "tipo": "recolectar",
    "lugar": "bosque",
    "items": [
        [
            "seta",
            [
                40,
                130
            ]
        ],
        [
            "miel",
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
            "pluma",
            [
                100,
                265
            ]
        ],
        [
            "huevo",
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
