'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "recolectarfondodelmar2",
    "desc": "Recolecta recursos en fondo del mar (5s).",
    "tipo": "recolectar",
    "lugar": "fondo del mar",
    "items": [
        [
            "perla",
            [
                50,
                160
            ]
        ],
        [
            "ancla",
            [
                70,
                205
            ]
        ],
        [
            "cofre",
            [
                90,
                250
            ]
        ],
        [
            "oro",
            [
                110,
                295
            ]
        ],
        [
            "coral",
            [
                130,
                340
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
