'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "recolectarmercado2",
    "desc": "Recolecta recursos en mercado (5s).",
    "tipo": "recolectar",
    "lugar": "mercado",
    "items": [
        [
            "moneda",
            [
                50,
                160
            ]
        ],
        [
            "fruta",
            [
                70,
                205
            ]
        ],
        [
            "teléfono",
            [
                90,
                250
            ]
        ],
        [
            "cartera",
            [
                110,
                295
            ]
        ],
        [
            "reloj",
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
