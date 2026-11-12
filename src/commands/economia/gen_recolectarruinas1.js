'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "recolectarruinas1",
    "desc": "Recolecta recursos en ruinas (5s).",
    "tipo": "recolectar",
    "lugar": "ruinas",
    "items": [
        [
            "reliquia",
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
            "jade",
            [
                80,
                220
            ]
        ],
        [
            "figura",
            [
                100,
                265
            ]
        ],
        [
            "pergamino",
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
