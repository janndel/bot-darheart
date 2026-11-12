'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "recolectarbasurero2",
    "desc": "Recolecta recursos en basurero (5s).",
    "tipo": "recolectar",
    "lugar": "basurero",
    "items": [
        [
            "botella",
            [
                50,
                160
            ]
        ],
        [
            "llave",
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
            "juguete",
            [
                110,
                295
            ]
        ],
        [
            "cable",
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
