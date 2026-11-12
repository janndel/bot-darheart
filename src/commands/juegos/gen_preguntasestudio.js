'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "preguntasestudio",
    "desc": "Consulta de preguntas sobre estudio.",
    "tipo": "texto",
    "pool": "preguntas",
    "titulo": "PREGUNTA · ESTUDIO",
    "emoji": "❓",
    "soloGrupo": false,
    "category": "juegos",
    "alias": []
});
