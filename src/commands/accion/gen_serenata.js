'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "serenata",
    "desc": "Acción: serenata con un usuario mencionado.",
    "tipo": "accion",
    "textos": [
        "{user} le cantó una serenata a {target}."
    ],
    "emoji": "🎶",
    "soloGrupo": true,
    "category": "accion",
    "alias": []
});
