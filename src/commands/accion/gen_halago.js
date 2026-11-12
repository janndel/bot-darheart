'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "halago",
    "desc": "Acción: halago con un usuario mencionado.",
    "tipo": "accion",
    "textos": [
        "{user} halagó a {target}."
    ],
    "emoji": "🌟",
    "soloGrupo": true,
    "category": "accion",
    "alias": []
});
