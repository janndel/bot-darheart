'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "recolectarciudad1",
    "desc": "Recolecta recursos en ciudad (5s).",
    "tipo": "recolectar",
    "lugar": "ciudad",
    "items": [
        [
            "moneda",
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
            "anillo",
            [
                80,
                220
            ]
        ],
        [
            "cable",
            [
                100,
                265
            ]
        ],
        [
            "chip",
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
