'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "palomitas",
    "desc": "Acción: palomitas con un usuario mencionado.",
    "tipo": "accion",
    "textos": [
        "{user} compartió palomitas con {target}."
    ],
    "emoji": "🍿",
    "soloGrupo": true,
    "category": "accion",
    "alias": []
});
