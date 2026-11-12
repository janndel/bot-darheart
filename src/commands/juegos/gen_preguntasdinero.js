'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "preguntasdinero",
    "desc": "Consulta de preguntas sobre dinero.",
    "tipo": "texto",
    "pool": "preguntas",
    "titulo": "PREGUNTA · DINERO",
    "emoji": "❓",
    "soloGrupo": false,
    "category": "juegos",
    "alias": []
});
