'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "consuelo",
    "desc": "Acción: consuelo con un usuario mencionado.",
    "tipo": "accion",
    "textos": [
        "{user} consoló a {target}."
    ],
    "emoji": "🫂",
    "soloGrupo": true,
    "category": "accion",
    "alias": []
});
