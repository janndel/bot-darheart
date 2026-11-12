'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "regalo",
    "desc": "Acción: regalo con un usuario mencionado.",
    "tipo": "accion",
    "textos": [
        "{user} le hizo un regalo a {target}."
    ],
    "emoji": "🎁",
    "soloGrupo": true,
    "category": "accion",
    "alias": []
});
