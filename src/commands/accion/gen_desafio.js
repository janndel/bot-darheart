'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "desafio",
    "desc": "Acción: desafio con un usuario mencionado.",
    "tipo": "accion",
    "textos": [
        "{user} desafió a {target} a un reto."
    ],
    "emoji": "⚔️",
    "soloGrupo": true,
    "category": "accion",
    "alias": []
});
