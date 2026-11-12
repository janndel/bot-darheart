'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "postre",
    "desc": "Acción: postre con un usuario mencionado.",
    "tipo": "accion",
    "textos": [
        "{user} compartió el postre con {target}."
    ],
    "emoji": "🍮",
    "soloGrupo": true,
    "category": "accion",
    "alias": []
});
