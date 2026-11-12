'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "preguntasexito",
    "desc": "Consulta de preguntas sobre éxito.",
    "tipo": "texto",
    "pool": "preguntas",
    "titulo": "PREGUNTA · ÉXITO",
    "emoji": "❓",
    "soloGrupo": false,
    "category": "juegos",
    "alias": []
});
