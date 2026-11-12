'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "dados2",
    "desc": "Acción: dados con un usuario mencionado.",
    "tipo": "accion",
    "textos": [
        "{user} jugó a los dados con {target}."
    ],
    "emoji": "🎲",
    "soloGrupo": true,
    "category": "accion",
    "alias": []
});
