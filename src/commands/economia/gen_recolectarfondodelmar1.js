'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "recolectarfondodelmar1",
    "desc": "Recolecta recursos en fondo del mar (5s).",
    "tipo": "recolectar",
    "lugar": "fondo del mar",
    "items": [
        [
            "perla",
            [
                40,
                130
            ]
        ],
        [
            "ancla",
            [
                60,
                175
            ]
        ],
        [
            "cofre",
            [
                80,
                220
            ]
        ],
        [
            "oro",
            [
                100,
                265
            ]
        ],
        [
            "coral",
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
