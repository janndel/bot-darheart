'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "guino",
    "desc": "Acción: guino con un usuario mencionado.",
    "tipo": "accion",
    "textos": [
        "{user} le guiñó el ojo a {target}."
    ],
    "emoji": "😉",
    "soloGrupo": true,
    "category": "accion",
    "alias": []
});
