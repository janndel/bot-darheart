'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "recolectarciudad2",
    "desc": "Recolecta recursos en ciudad (5s).",
    "tipo": "recolectar",
    "lugar": "ciudad",
    "items": [
        [
            "moneda",
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
            "anillo",
            [
                90,
                250
            ]
        ],
        [
            "cable",
            [
                110,
                295
            ]
        ],
        [
            "chip",
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
