'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "preguntassecreto",
    "desc": "Consulta de preguntas sobre secreto.",
    "tipo": "texto",
    "pool": "preguntas",
    "titulo": "PREGUNTA · SECRETO",
    "emoji": "❓",
    "soloGrupo": false,
    "category": "juegos",
    "alias": []
});
