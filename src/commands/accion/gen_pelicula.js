'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "pelicula",
    "desc": "Acción: pelicula con un usuario mencionado.",
    "tipo": "accion",
    "textos": [
        "{user} vio una película con {target}."
    ],
    "emoji": "🍿",
    "soloGrupo": true,
    "category": "accion",
    "alias": []
});
