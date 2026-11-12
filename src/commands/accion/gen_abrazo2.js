'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "abrazo2",
    "desc": "Acción: abrazo con un usuario mencionado.",
    "tipo": "accion",
    "textos": [
        "{user} le dio un abrazo muy fuerte a {target}."
    ],
    "emoji": "🤗",
    "soloGrupo": true,
    "category": "accion",
    "alias": []
});
