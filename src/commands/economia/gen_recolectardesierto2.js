'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "recolectardesierto2",
    "desc": "Recolecta recursos en desierto (5s).",
    "tipo": "recolectar",
    "lugar": "desierto",
    "items": [
        [
            "arena",
            [
                50,
                160
            ]
        ],
        [
            "vidrio",
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
            "hueso",
            [
                110,
                295
            ]
        ],
        [
            "ámbar",
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
