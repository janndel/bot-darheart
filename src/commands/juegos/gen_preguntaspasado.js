'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "preguntaspasado",
    "desc": "Consulta de preguntas sobre pasado.",
    "tipo": "texto",
    "pool": "preguntas",
    "titulo": "PREGUNTA · PASADO",
    "emoji": "❓",
    "soloGrupo": false,
    "category": "juegos",
    "alias": []
});
