'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "preguntassalud",
    "desc": "Consulta de preguntas sobre salud.",
    "tipo": "texto",
    "pool": "preguntas",
    "titulo": "PREGUNTA · SALUD",
    "emoji": "❓",
    "soloGrupo": false,
    "category": "juegos",
    "alias": []
});
