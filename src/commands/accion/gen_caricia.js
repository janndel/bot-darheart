'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "caricia",
    "desc": "Acción: caricia con un usuario mencionado.",
    "tipo": "accion",
    "textos": [
        "{user} le hizo cariño en la cabeza a {target}."
    ],
    "emoji": "🫳",
    "soloGrupo": true,
    "category": "accion",
    "alias": []
});
