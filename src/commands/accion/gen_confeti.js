'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "confeti",
    "desc": "Acción: confeti con un usuario mencionado.",
    "tipo": "accion",
    "textos": [
        "{user} llenó de confeti a {target}."
    ],
    "emoji": "🎊",
    "soloGrupo": true,
    "category": "accion",
    "alias": []
});
