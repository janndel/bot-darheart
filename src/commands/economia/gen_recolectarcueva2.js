'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "recolectarcueva2",
    "desc": "Recolecta recursos en cueva (5s).",
    "tipo": "recolectar",
    "lugar": "cueva",
    "items": [
        [
            "cristal",
            [
                50,
                160
            ]
        ],
        [
            "oro",
            [
                70,
                205
            ]
        ],
        [
            "hueso",
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
            "fósil",
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
