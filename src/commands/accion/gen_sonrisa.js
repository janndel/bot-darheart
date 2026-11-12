'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "sonrisa",
    "desc": "Acción: sonrisa con un usuario mencionado.",
    "tipo": "accion",
    "textos": [
        "{user} le regaló una sonrisa a {target}."
    ],
    "emoji": "😊",
    "soloGrupo": true,
    "category": "accion",
    "alias": []
});
