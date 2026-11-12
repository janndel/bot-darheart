'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "helado",
    "desc": "Acción: helado con un usuario mencionado.",
    "tipo": "accion",
    "textos": [
        "{user} le invitó un helado a {target}."
    ],
    "emoji": "🍦",
    "soloGrupo": true,
    "category": "accion",
    "alias": []
});
