'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "taco",
    "desc": "Acción: taco con un usuario mencionado.",
    "tipo": "accion",
    "textos": [
        "{user} le invitó tacos a {target}."
    ],
    "emoji": "🌮",
    "soloGrupo": true,
    "category": "accion",
    "alias": []
});
