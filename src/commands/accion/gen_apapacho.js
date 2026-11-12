'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "apapacho",
    "desc": "Acción: apapacho con un usuario mencionado.",
    "tipo": "accion",
    "textos": [
        "{user} apapachó a {target}."
    ],
    "emoji": "🫂",
    "soloGrupo": true,
    "category": "accion",
    "alias": []
});
