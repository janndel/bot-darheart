'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "recolectarisla2",
    "desc": "Recolecta recursos en isla (5s).",
    "tipo": "recolectar",
    "lugar": "isla",
    "items": [
        [
            "coco",
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
            "concha",
            [
                90,
                250
            ]
        ],
        [
            "mapa",
            [
                110,
                295
            ]
        ],
        [
            "tesoro",
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
