'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "baile",
    "desc": "Acción: baile con un usuario mencionado.",
    "tipo": "accion",
    "textos": [
        "{user} sacó a bailar a {target}."
    ],
    "emoji": "💃",
    "soloGrupo": true,
    "category": "accion",
    "alias": []
});
