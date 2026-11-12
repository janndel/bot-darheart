'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "fruta",
    "desc": "Acción: fruta con un usuario mencionado.",
    "tipo": "accion",
    "textos": [
        "{user} compartió fruta con {target}."
    ],
    "emoji": "🍎",
    "soloGrupo": true,
    "category": "accion",
    "alias": []
});
