'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "pizza",
    "desc": "Acción: pizza con un usuario mencionado.",
    "tipo": "accion",
    "textos": [
        "{user} compartió pizza con {target}."
    ],
    "emoji": "🍕",
    "soloGrupo": true,
    "category": "accion",
    "alias": []
});
