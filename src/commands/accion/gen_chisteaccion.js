'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "chisteaccion",
    "desc": "Acción: chisteaccion con un usuario mencionado.",
    "tipo": "accion",
    "textos": [
        "{user} le hizo una broma a {target}."
    ],
    "emoji": "🃏",
    "soloGrupo": true,
    "category": "accion",
    "alias": []
});
