'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "recolectarnieve2",
    "desc": "Recolecta recursos en nieve (5s).",
    "tipo": "recolectar",
    "lugar": "nieve",
    "items": [
        [
            "cristal",
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
            "moneda",
            [
                90,
                250
            ]
        ],
        [
            "piedra",
            [
                110,
                295
            ]
        ],
        [
            "diamante",
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
