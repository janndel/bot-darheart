'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "trivia",
    "desc": "Acción: trivia con un usuario mencionado.",
    "tipo": "accion",
    "textos": [
        "{user} retó a {target} a una trivia."
    ],
    "emoji": "🧠",
    "soloGrupo": true,
    "category": "accion",
    "alias": []
});
