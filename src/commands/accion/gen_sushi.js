'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "sushi",
    "desc": "Acción: sushi con un usuario mencionado.",
    "tipo": "accion",
    "textos": [
        "{user} le invitó sushi a {target}."
    ],
    "emoji": "🍣",
    "soloGrupo": true,
    "category": "accion",
    "alias": []
});
