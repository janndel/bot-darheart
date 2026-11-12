'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "preguntasamistad",
    "desc": "Consulta de preguntas sobre amistad.",
    "tipo": "texto",
    "pool": "preguntas",
    "titulo": "PREGUNTA · AMISTAD",
    "emoji": "❓",
    "soloGrupo": false,
    "category": "juegos",
    "alias": []
});
