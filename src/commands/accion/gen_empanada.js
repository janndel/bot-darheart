'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "empanada",
    "desc": "Acción: empanada con un usuario mencionado.",
    "tipo": "accion",
    "textos": [
        "{user} le invitó una empanada a {target}."
    ],
    "emoji": "🥟",
    "soloGrupo": true,
    "category": "accion",
    "alias": []
});
