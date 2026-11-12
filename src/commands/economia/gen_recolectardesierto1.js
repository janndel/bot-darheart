'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "recolectardesierto1",
    "desc": "Recolecta recursos en desierto (5s).",
    "tipo": "recolectar",
    "lugar": "desierto",
    "items": [
        [
            "arena",
            [
                40,
                130
            ]
        ],
        [
            "vidrio",
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
            "hueso",
            [
                100,
                265
            ]
        ],
        [
            "ámbar",
            [
                120,
                310
            ]
        ]
    ],
    "emoji": "🧭",
    "fail": 21,
    "cooldown": 12,
    "campo": "lastRecolectarExtra",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
