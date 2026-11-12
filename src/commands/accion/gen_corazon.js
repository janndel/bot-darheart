'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "corazon",
    "desc": "Acción: corazon con un usuario mencionado.",
    "tipo": "accion",
    "textos": [
        "{user} le mandó un corazón a {target}."
    ],
    "emoji": "❤️",
    "soloGrupo": true,
    "category": "accion",
    "alias": []
});
