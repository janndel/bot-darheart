'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "recolectaroeste2",
    "desc": "Recolecta recursos en oeste (5s).",
    "tipo": "recolectar",
    "lugar": "oeste",
    "items": [
        [
            "bala",
            [
                50,
                160
            ]
        ],
        [
            "herradura",
            [
                70,
                205
            ]
        ],
        [
            "moneda",
            [
                90,
                250
            ]
        ],
        [
            "botas",
            [
                110,
                295
            ]
        ],
        [
            "sombrero",
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
