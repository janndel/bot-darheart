'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "masaje",
    "desc": "Acción: masaje con un usuario mencionado.",
    "tipo": "accion",
    "textos": [
        "{user} le dio un masaje a {target}."
    ],
    "emoji": "💆",
    "soloGrupo": true,
    "category": "accion",
    "alias": []
});
