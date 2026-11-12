'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "recolectarbiblioteca2",
    "desc": "Recolecta recursos en biblioteca (5s).",
    "tipo": "recolectar",
    "lugar": "biblioteca",
    "items": [
        [
            "libro",
            [
                50,
                160
            ]
        ],
        [
            "pergamino",
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
            "pluma",
            [
                110,
                295
            ]
        ],
        [
            "mapa",
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
