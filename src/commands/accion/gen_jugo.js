'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "jugo",
    "desc": "Acción: jugo con un usuario mencionado.",
    "tipo": "accion",
    "textos": [
        "{user} le invitó un jugo a {target}."
    ],
    "emoji": "🧃",
    "soloGrupo": true,
    "category": "accion",
    "alias": []
});
