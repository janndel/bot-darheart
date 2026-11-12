'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "recolectarrio1",
    "desc": "Recolecta recursos en rio (5s).",
    "tipo": "recolectar",
    "lugar": "rio",
    "items": [
        [
            "piedra",
            [
                40,
                130
            ]
        ],
        [
            "pez",
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
            "lata",
            [
                100,
                265
            ]
        ],
        [
            "rama",
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
