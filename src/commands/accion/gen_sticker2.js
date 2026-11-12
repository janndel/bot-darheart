'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "sticker2",
    "desc": "Acción: sticker con un usuario mencionado.",
    "tipo": "accion",
    "textos": [
        "{user} le mandó un sticker a {target}."
    ],
    "emoji": "🖼️",
    "soloGrupo": true,
    "category": "accion",
    "alias": []
});
