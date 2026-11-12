'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "preguntasfuturo",
    "desc": "Consulta de preguntas sobre futuro.",
    "tipo": "texto",
    "pool": "preguntas",
    "titulo": "PREGUNTA · FUTURO",
    "emoji": "❓",
    "soloGrupo": false,
    "category": "juegos",
    "alias": []
});
