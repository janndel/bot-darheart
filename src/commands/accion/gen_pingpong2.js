'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "pingpong2",
    "desc": "Acción: pingpong con un usuario mencionado.",
    "tipo": "accion",
    "textos": [
        "{user} jugó ping pong con {target}."
    ],
    "emoji": "🏓",
    "soloGrupo": true,
    "category": "accion",
    "alias": []
});
