'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "te",
    "desc": "Acción: te con un usuario mencionado.",
    "tipo": "accion",
    "textos": [
        "{user} le preparó un té a {target}."
    ],
    "emoji": "🍵",
    "soloGrupo": true,
    "category": "accion",
    "alias": []
});
