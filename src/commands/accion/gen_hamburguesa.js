'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "hamburguesa",
    "desc": "Acción: hamburguesa con un usuario mencionado.",
    "tipo": "accion",
    "textos": [
        "{user} le invitó una hamburguesa a {target}."
    ],
    "emoji": "🍔",
    "soloGrupo": true,
    "category": "accion",
    "alias": []
});
