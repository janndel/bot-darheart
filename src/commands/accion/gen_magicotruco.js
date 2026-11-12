'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "magicotruco",
    "desc": "Acción: magicotruco con un usuario mencionado.",
    "tipo": "accion",
    "textos": [
        "{user} le hizo un truco de magia a {target}."
    ],
    "emoji": "✨",
    "soloGrupo": true,
    "category": "accion",
    "alias": []
});
