'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "cosquillas",
    "desc": "Acción: cosquillas con un usuario mencionado.",
    "tipo": "accion",
    "textos": [
        "{user} le hizo cosquillas a {target}."
    ],
    "emoji": "🦶",
    "soloGrupo": true,
    "category": "accion",
    "alias": []
});
