'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "chocolate",
    "desc": "Acción: chocolate con un usuario mencionado.",
    "tipo": "accion",
    "textos": [
        "{user} le regaló chocolate a {target}."
    ],
    "emoji": "🍫",
    "soloGrupo": true,
    "category": "accion",
    "alias": []
});
