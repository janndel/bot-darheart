'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "preguntassuerte",
    "desc": "Consulta de preguntas sobre suerte.",
    "tipo": "texto",
    "pool": "preguntas",
    "titulo": "PREGUNTA · SUERTE",
    "emoji": "❓",
    "soloGrupo": false,
    "category": "juegos",
    "alias": []
});
