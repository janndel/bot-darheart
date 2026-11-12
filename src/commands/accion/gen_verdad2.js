'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "verdad2",
    "desc": "Acción: verdad con un usuario mencionado.",
    "tipo": "accion",
    "textos": [
        "{user} le pidió una verdad a {target}."
    ],
    "emoji": "👀",
    "soloGrupo": true,
    "category": "accion",
    "alias": []
});
