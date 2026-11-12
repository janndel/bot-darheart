'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "chiste3",
    "desc": "Acción: chiste con un usuario mencionado.",
    "tipo": "accion",
    "textos": [
        "{user} le contó un chiste a {target}."
    ],
    "emoji": "🤣",
    "soloGrupo": true,
    "category": "accion",
    "alias": []
});
