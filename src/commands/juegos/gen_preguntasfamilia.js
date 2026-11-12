'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "preguntasfamilia",
    "desc": "Consulta de preguntas sobre familia.",
    "tipo": "texto",
    "pool": "preguntas",
    "titulo": "PREGUNTA · FAMILIA",
    "emoji": "❓",
    "soloGrupo": false,
    "category": "juegos",
    "alias": []
});
