'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "recolectarmercado1",
    "desc": "Recolecta recursos en mercado (5s).",
    "tipo": "recolectar",
    "lugar": "mercado",
    "items": [
        [
            "moneda",
            [
                40,
                130
            ]
        ],
        [
            "fruta",
            [
                60,
                175
            ]
        ],
        [
            "teléfono",
            [
                80,
                220
            ]
        ],
        [
            "cartera",
            [
                100,
                265
            ]
        ],
        [
            "reloj",
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
