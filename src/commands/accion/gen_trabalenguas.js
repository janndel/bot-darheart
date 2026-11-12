'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "trabalenguas",
    "desc": "Acción: trabalenguas con un usuario mencionado.",
    "tipo": "accion",
    "textos": [
        "{user} retó a {target} con un trabalenguas."
    ],
    "emoji": "👅",
    "soloGrupo": true,
    "category": "accion",
    "alias": []
});
