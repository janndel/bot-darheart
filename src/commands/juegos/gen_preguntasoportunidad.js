'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "preguntasoportunidad",
    "desc": "Consulta de preguntas sobre oportunidad.",
    "tipo": "texto",
    "pool": "preguntas",
    "titulo": "PREGUNTA · OPORTUNIDAD",
    "emoji": "❓",
    "soloGrupo": false,
    "category": "juegos",
    "alias": []
});
