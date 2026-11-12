'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "recolectartemplo1",
    "desc": "Recolecta recursos en templo (5s).",
    "tipo": "recolectar",
    "lugar": "templo",
    "items": [
        [
            "incienso",
            [
                40,
                130
            ]
        ],
        [
            "moneda",
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
            "vela",
            [
                100,
                265
            ]
        ],
        [
            "gema",
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
