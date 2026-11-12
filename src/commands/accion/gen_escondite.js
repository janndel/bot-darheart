'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "escondite",
    "desc": "Acción: escondite con un usuario mencionado.",
    "tipo": "accion",
    "textos": [
        "{user} jugó al escondite con {target}."
    ],
    "emoji": "🙈",
    "soloGrupo": true,
    "category": "accion",
    "alias": []
});
