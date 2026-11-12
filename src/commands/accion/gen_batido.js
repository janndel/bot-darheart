'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "batido",
    "desc": "Acción: batido con un usuario mencionado.",
    "tipo": "accion",
    "textos": [
        "{user} le preparó un batido a {target}."
    ],
    "emoji": "🥤",
    "soloGrupo": true,
    "category": "accion",
    "alias": []
});
