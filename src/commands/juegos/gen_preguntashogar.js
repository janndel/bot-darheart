'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "preguntashogar",
    "desc": "Consulta de preguntas sobre hogar.",
    "tipo": "texto",
    "pool": "preguntas",
    "titulo": "PREGUNTA · HOGAR",
    "emoji": "❓",
    "soloGrupo": false,
    "category": "juegos",
    "alias": []
});
