'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "beso2",
    "desc": "Acción: beso con un usuario mencionado.",
    "tipo": "accion",
    "textos": [
        "{user} le mandó un beso a {target}."
    ],
    "emoji": "😘",
    "soloGrupo": true,
    "category": "accion",
    "alias": []
});
