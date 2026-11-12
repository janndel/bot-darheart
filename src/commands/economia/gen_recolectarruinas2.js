'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "recolectarruinas2",
    "desc": "Recolecta recursos en ruinas (5s).",
    "tipo": "recolectar",
    "lugar": "ruinas",
    "items": [
        [
            "reliquia",
            [
                50,
                160
            ]
        ],
        [
            "moneda",
            [
                70,
                205
            ]
        ],
        [
            "jade",
            [
                90,
                250
            ]
        ],
        [
            "figura",
            [
                110,
                295
            ]
        ],
        [
            "pergamino",
            [
                130,
                340
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
