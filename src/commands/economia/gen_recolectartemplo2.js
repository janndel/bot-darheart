'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "recolectartemplo2",
    "desc": "Recolecta recursos en templo (5s).",
    "tipo": "recolectar",
    "lugar": "templo",
    "items": [
        [
            "incienso",
            [
                50,
                160
            ]
        ],
        [
            "moneda",
            [
                70,
                205
            ]
        ],
        [
            "reliquia",
            [
                90,
                250
            ]
        ],
        [
            "vela",
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
