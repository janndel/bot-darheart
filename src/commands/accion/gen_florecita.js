'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "florecita",
    "desc": "Acción: florecita con un usuario mencionado.",
    "tipo": "accion",
    "textos": [
        "{user} le regaló una flor a {target}."
    ],
    "emoji": "🌸",
    "soloGrupo": true,
    "category": "accion",
    "alias": []
});
