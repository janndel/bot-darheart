'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "preguntasviaje",
    "desc": "Consulta de preguntas sobre viaje.",
    "tipo": "texto",
    "pool": "preguntas",
    "titulo": "PREGUNTA · VIAJE",
    "emoji": "❓",
    "soloGrupo": false,
    "category": "juegos",
    "alias": []
});
