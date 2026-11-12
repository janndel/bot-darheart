'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "caramelo",
    "desc": "Acción: caramelo con un usuario mencionado.",
    "tipo": "accion",
    "textos": [
        "{user} le dio un caramelo a {target}."
    ],
    "emoji": "🍬",
    "soloGrupo": true,
    "category": "accion",
    "alias": []
});
