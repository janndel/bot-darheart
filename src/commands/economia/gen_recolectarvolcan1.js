'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "recolectarvolcan1",
    "desc": "Recolecta recursos en volcan (5s).",
    "tipo": "recolectar",
    "lugar": "volcan",
    "items": [
        [
            "obsidiana",
            [
                40,
                130
            ]
        ],
        [
            "azufre",
            [
                60,
                175
            ]
        ],
        [
            "gema",
            [
                80,
                220
            ]
        ],
        [
            "piedra",
            [
                100,
                265
            ]
        ],
        [
            "ceniza",
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
