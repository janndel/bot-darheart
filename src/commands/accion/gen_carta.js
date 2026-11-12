'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "carta",
    "desc": "Acción: carta con un usuario mencionado.",
    "tipo": "accion",
    "textos": [
        "{user} le escribió una carta a {target}."
    ],
    "emoji": "✉️",
    "soloGrupo": true,
    "category": "accion",
    "alias": []
});
