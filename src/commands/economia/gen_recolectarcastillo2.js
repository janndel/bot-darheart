'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "recolectarcastillo2",
    "desc": "Recolecta recursos en castillo (5s).",
    "tipo": "recolectar",
    "lugar": "castillo",
    "items": [
        [
            "armadura",
            [
                50,
                160
            ]
        ],
        [
            "espada",
            [
                70,
                205
            ]
        ],
        [
            "corona",
            [
                90,
                250
            ]
        ],
        [
            "moneda",
            [
                110,
                295
            ]
        ],
        [
            "escudo",
            [
                130,
                340
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
