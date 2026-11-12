'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "recolectarrio2",
    "desc": "Recolecta recursos en rio (5s).",
    "tipo": "recolectar",
    "lugar": "rio",
    "items": [
        [
            "piedra",
            [
                50,
                160
            ]
        ],
        [
            "pez",
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
            "lata",
            [
                110,
                295
            ]
        ],
        [
            "rama",
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
