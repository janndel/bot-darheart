'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "arepa",
    "desc": "Acción: arepa con un usuario mencionado.",
    "tipo": "accion",
    "textos": [
        "{user} le invitó una arepa a {target}."
    ],
    "emoji": "🫓",
    "soloGrupo": true,
    "category": "accion",
    "alias": []
});
