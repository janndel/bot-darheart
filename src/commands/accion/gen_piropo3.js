'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "piropo3",
    "desc": "Acción: piropo con un usuario mencionado.",
    "tipo": "accion",
    "textos": [
        "{user} le echó un piropo a {target}."
    ],
    "emoji": "😏",
    "soloGrupo": true,
    "category": "accion",
    "alias": []
});
