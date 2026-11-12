'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "acertijo",
    "desc": "Acción: acertijo con un usuario mencionado.",
    "tipo": "accion",
    "textos": [
        "{user} le puso un acertijo a {target}."
    ],
    "emoji": "🔐",
    "soloGrupo": true,
    "category": "accion",
    "alias": []
});
