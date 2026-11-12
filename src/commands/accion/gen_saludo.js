'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "saludo",
    "desc": "Acción: saludo con un usuario mencionado.",
    "tipo": "accion",
    "textos": [
        "{user} saludó con cariño a {target}."
    ],
    "emoji": "👋",
    "soloGrupo": true,
    "category": "accion",
    "alias": []
});
