'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "preguntasamor",
    "desc": "Consulta de preguntas sobre amor.",
    "tipo": "texto",
    "pool": "preguntas",
    "titulo": "PREGUNTA · AMOR",
    "emoji": "❓",
    "soloGrupo": false,
    "category": "juegos",
    "alias": []
});
