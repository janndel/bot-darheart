'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "poema",
    "desc": "Acción: poema con un usuario mencionado.",
    "tipo": "accion",
    "textos": [
        "{user} le dedicó un poema a {target}."
    ],
    "emoji": "📜",
    "soloGrupo": true,
    "category": "accion",
    "alias": []
});
