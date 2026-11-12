'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "recolectarbasurero1",
    "desc": "Recolecta recursos en basurero (5s).",
    "tipo": "recolectar",
    "lugar": "basurero",
    "items": [
        [
            "botella",
            [
                40,
                130
            ]
        ],
        [
            "llave",
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
            "juguete",
            [
                100,
                265
            ]
        ],
        [
            "cable",
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
