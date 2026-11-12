'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "fiesta",
    "desc": "Acción: fiesta con un usuario mencionado.",
    "tipo": "accion",
    "textos": [
        "{user} armó una fiesta con {target}."
    ],
    "emoji": "🎉",
    "soloGrupo": true,
    "category": "accion",
    "alias": []
});
