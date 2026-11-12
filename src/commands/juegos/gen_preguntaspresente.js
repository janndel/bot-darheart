'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "preguntaspresente",
    "desc": "Consulta de preguntas sobre presente.",
    "tipo": "texto",
    "pool": "preguntas",
    "titulo": "PREGUNTA · PRESENTE",
    "emoji": "❓",
    "soloGrupo": false,
    "category": "juegos",
    "alias": []
});
