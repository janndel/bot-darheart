'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "cafe",
    "desc": "Acción: cafe con un usuario mencionado.",
    "tipo": "accion",
    "textos": [
        "{user} le invitó un café a {target}."
    ],
    "emoji": "☕",
    "soloGrupo": true,
    "category": "accion",
    "alias": []
});
