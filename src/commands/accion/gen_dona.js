'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "dona",
    "desc": "Acción: dona con un usuario mencionado.",
    "tipo": "accion",
    "textos": [
        "{user} le regaló una dona a {target}."
    ],
    "emoji": "🍩",
    "soloGrupo": true,
    "category": "accion",
    "alias": []
});
