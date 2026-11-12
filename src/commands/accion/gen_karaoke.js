'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "karaoke",
    "desc": "Acción: karaoke con un usuario mencionado.",
    "tipo": "accion",
    "textos": [
        "{user} hizo karaoke con {target}."
    ],
    "emoji": "🎙️",
    "soloGrupo": true,
    "category": "accion",
    "alias": []
});
