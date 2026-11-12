'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "disfraz",
    "desc": "Acción: disfraz con un usuario mencionado.",
    "tipo": "accion",
    "textos": [
        "{user} disfrazó a {target}."
    ],
    "emoji": "🎭",
    "soloGrupo": true,
    "category": "accion",
    "alias": []
});
