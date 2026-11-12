'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "brindis",
    "desc": "Acción: brindis con un usuario mencionado.",
    "tipo": "accion",
    "textos": [
        "{user} brindó con {target}."
    ],
    "emoji": "🥂",
    "soloGrupo": true,
    "category": "accion",
    "alias": []
});
