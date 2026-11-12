'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "delito15",
    "desc": "Intenta un delito: te escapaste de la policía (5s).",
    "tipo": "delito",
    "delito": "te escapaste de la policía",
    "emoji": "🚨",
    "titulo": "DELITO #15",
    "chance": 55,
    "min": 210,
    "max": 650,
    "fineMin": 80,
    "fineMax": 260,
    "cooldown": 30,
    "campo": "lastCrimenExtra",
    "soloGrupo": true,
    "category": "economia",
    "alias": []
});
