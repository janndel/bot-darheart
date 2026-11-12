'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "preguntasproteccion",
    "desc": "Consulta de preguntas sobre protección.",
    "tipo": "texto",
    "pool": "preguntas",
    "titulo": "PREGUNTA · PROTECCIÓN",
    "emoji": "❓",
    "soloGrupo": false,
    "category": "juegos",
    "alias": []
});
