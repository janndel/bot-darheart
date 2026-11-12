'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "recolectarbosque2",
    "desc": "Recolecta recursos en bosque (5s).",
    "tipo": "recolectar",
    "lugar": "bosque",
    "items": [
        [
            "seta",
            [
                50,
                160
            ]
        ],
        [
            "miel",
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
            "pluma",
            [
                110,
                295
            ]
        ],
        [
            "huevo",
            [
                130,
                340
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
