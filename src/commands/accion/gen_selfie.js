'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "selfie",
    "desc": "Acción: selfie con un usuario mencionado.",
    "tipo": "accion",
    "textos": [
        "{user} se sacó una selfie con {target}."
    ],
    "emoji": "🤳",
    "soloGrupo": true,
    "category": "accion",
    "alias": []
});
