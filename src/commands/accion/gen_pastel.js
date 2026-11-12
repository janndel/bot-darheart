'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "pastel",
    "desc": "Acción: pastel con un usuario mencionado.",
    "tipo": "accion",
    "textos": [
        "{user} le dio pastel a {target}."
    ],
    "emoji": "🍰",
    "soloGrupo": true,
    "category": "accion",
    "alias": []
});
