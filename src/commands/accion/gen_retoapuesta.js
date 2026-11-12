'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "retoapuesta",
    "desc": "Acción: retoapuesta con un usuario mencionado.",
    "tipo": "accion",
    "textos": [
        "{user} apostó contra {target}."
    ],
    "emoji": "🎰",
    "soloGrupo": true,
    "category": "accion",
    "alias": []
});
