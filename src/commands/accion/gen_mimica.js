'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "mimica",
    "desc": "Acción: mimica con un usuario mencionado.",
    "tipo": "accion",
    "textos": [
        "{user} le hizo mímica a {target}."
    ],
    "emoji": "🤐",
    "soloGrupo": true,
    "category": "accion",
    "alias": []
});
