'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "protector",
    "desc": "Acción: protector con un usuario mencionado.",
    "tipo": "accion",
    "textos": [
        "{user} protegió a {target}."
    ],
    "emoji": "🛡️",
    "soloGrupo": true,
    "category": "accion",
    "alias": []
});
