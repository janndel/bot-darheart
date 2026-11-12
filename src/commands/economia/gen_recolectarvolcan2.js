'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "recolectarvolcan2",
    "desc": "Recolecta recursos en volcan (5s).",
    "tipo": "recolectar",
    "lugar": "volcan",
    "items": [
        [
            "obsidiana",
            [
                50,
                160
            ]
        ],
        [
            "azufre",
            [
                70,
                205
            ]
        ],
        [
            "gema",
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
            "ceniza",
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
