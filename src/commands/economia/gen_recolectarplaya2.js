'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "recolectarplaya2",
    "desc": "Recolecta recursos en playa (5s).",
    "tipo": "recolectar",
    "lugar": "playa",
    "items": [
        [
            "concha",
            [
                50,
                160
            ]
        ],
        [
            "perla",
            [
                70,
                205
            ]
        ],
        [
            "botella",
            [
                90,
                250
            ]
        ],
        [
            "cangrejo",
            [
                110,
                295
            ]
        ],
        [
            "estrella de mar",
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
