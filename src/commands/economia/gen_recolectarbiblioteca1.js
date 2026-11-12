'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "recolectarbiblioteca1",
    "desc": "Recolecta recursos en biblioteca (5s).",
    "tipo": "recolectar",
    "lugar": "biblioteca",
    "items": [
        [
            "libro",
            [
                40,
                130
            ]
        ],
        [
            "pergamino",
            [
                60,
                175
            ]
        ],
        [
            "moneda",
            [
                80,
                220
            ]
        ],
        [
            "pluma",
            [
                100,
                265
            ]
        ],
        [
            "mapa",
            [
                120,
                310
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
