'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "cena",
    "desc": "Acción: cena con un usuario mencionado.",
    "tipo": "accion",
    "textos": [
        "{user} invitó a cenar a {target}."
    ],
    "emoji": "🍽️",
    "soloGrupo": true,
    "category": "accion",
    "alias": []
});
