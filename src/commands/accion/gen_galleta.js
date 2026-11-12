'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "galleta",
    "desc": "Acción: galleta con un usuario mencionado.",
    "tipo": "accion",
    "textos": [
        "{user} le compartió galletas a {target}."
    ],
    "emoji": "🍪",
    "soloGrupo": true,
    "category": "accion",
    "alias": []
});
