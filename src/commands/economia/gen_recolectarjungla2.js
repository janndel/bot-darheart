'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "recolectarjungla2",
    "desc": "Recolecta recursos en jungla (5s).",
    "tipo": "recolectar",
    "lugar": "jungla",
    "items": [
        [
            "orquídea",
            [
                50,
                160
            ]
        ],
        [
            "pluma",
            [
                70,
                205
            ]
        ],
        [
            "fruta",
            [
                90,
                250
            ]
        ],
        [
            "gema",
            [
                110,
                295
            ]
        ],
        [
            "ídolo",
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
