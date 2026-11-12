'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "recolectarpantano2",
    "desc": "Recolecta recursos en pantano (5s).",
    "tipo": "recolectar",
    "lugar": "pantano",
    "items": [
        [
            "musgo",
            [
                50,
                160
            ]
        ],
        [
            "hueso",
            [
                70,
                205
            ]
        ],
        [
            "reliquia",
            [
                90,
                250
            ]
        ],
        [
            "pez",
            [
                110,
                295
            ]
        ],
        [
            "fango",
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
