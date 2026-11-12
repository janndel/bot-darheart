'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "preguntastrabajo",
    "desc": "Consulta de preguntas sobre trabajo.",
    "tipo": "texto",
    "pool": "preguntas",
    "titulo": "PREGUNTA · TRABAJO",
    "emoji": "❓",
    "soloGrupo": false,
    "category": "juegos",
    "alias": []
});
