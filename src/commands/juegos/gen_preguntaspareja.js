'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "preguntaspareja",
    "desc": "Consulta de preguntas sobre pareja.",
    "tipo": "texto",
    "pool": "preguntas",
    "titulo": "PREGUNTA · PAREJA",
    "emoji": "❓",
    "soloGrupo": false,
    "category": "juegos",
    "alias": []
});
