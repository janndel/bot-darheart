'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "video2",
    "desc": "Acción: video con un usuario mencionado.",
    "tipo": "accion",
    "textos": [
        "{user} grabó un video con {target}."
    ],
    "emoji": "🎬",
    "soloGrupo": true,
    "category": "accion",
    "alias": []
});
