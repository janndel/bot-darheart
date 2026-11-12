'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "magia",
    "desc": "Acción: magia con un usuario mencionado.",
    "tipo": "accion",
    "textos": [
        "{user} le hizo magia a {target}."
    ],
    "emoji": "🪄",
    "soloGrupo": true,
    "category": "accion",
    "alias": []
});
