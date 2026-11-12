'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "adivinanza",
    "desc": "Acción: adivinanza con un usuario mencionado.",
    "tipo": "accion",
    "textos": [
        "{user} le lanzó una adivinanza a {target}."
    ],
    "emoji": "🧩",
    "soloGrupo": true,
    "category": "accion",
    "alias": []
});
