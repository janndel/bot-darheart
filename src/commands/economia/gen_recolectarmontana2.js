'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "recolectarmontana2",
    "desc": "Recolecta recursos en montaña (5s).",
    "tipo": "recolectar",
    "lugar": "montaña",
    "items": [
        [
            "cristal",
            [
                50,
                160
            ]
        ],
        [
            "mineral",
            [
                70,
                205
            ]
        ],
        [
            "pluma",
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
            "gema",
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
