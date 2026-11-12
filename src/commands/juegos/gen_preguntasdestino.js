'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "preguntasdestino",
    "desc": "Consulta de preguntas sobre destino.",
    "tipo": "texto",
    "pool": "preguntas",
    "titulo": "PREGUNTA · DESTINO",
    "emoji": "❓",
    "soloGrupo": false,
    "category": "juegos",
    "alias": []
});
