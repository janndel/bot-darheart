'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "palmada",
    "desc": "Acción: palmada con un usuario mencionado.",
    "tipo": "accion",
    "textos": [
        "{user} le dio una palmada en la espalda a {target}."
    ],
    "emoji": "🫱",
    "soloGrupo": true,
    "category": "accion",
    "alias": []
});
