'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "congelado",
    "desc": "Acción: congelado con un usuario mencionado.",
    "tipo": "accion",
    "textos": [
        "{user} jugó a congelado con {target}."
    ],
    "emoji": "🧊",
    "soloGrupo": true,
    "category": "accion",
    "alias": []
});
