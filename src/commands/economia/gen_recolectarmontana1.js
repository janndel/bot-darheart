'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "recolectarmontana1",
    "desc": "Recolecta recursos en montaña (5s).",
    "tipo": "recolectar",
    "lugar": "montaña",
    "items": [
        [
            "cristal",
            [
                40,
                130
            ]
        ],
        [
            "mineral",
            [
                60,
                175
            ]
        ],
        [
            "pluma",
            [
                80,
                220
            ]
        ],
        [
            "moneda",
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
