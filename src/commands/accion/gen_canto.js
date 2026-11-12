'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "canto",
    "desc": "Acción: canto con un usuario mencionado.",
    "tipo": "accion",
    "textos": [
        "{user} le cantó a {target}."
    ],
    "emoji": "🎤",
    "soloGrupo": true,
    "category": "accion",
    "alias": []
});
