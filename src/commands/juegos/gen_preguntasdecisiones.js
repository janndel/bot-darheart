'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "preguntasdecisiones",
    "desc": "Consulta de preguntas sobre decisiones.",
    "tipo": "texto",
    "pool": "preguntas",
    "titulo": "PREGUNTA · DECISIONES",
    "emoji": "❓",
    "soloGrupo": false,
    "category": "juegos",
    "alias": []
});
