'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "carrera2",
    "desc": "Acción: carrera con un usuario mencionado.",
    "tipo": "accion",
    "textos": [
        "{user} corrió una carrera contra {target}."
    ],
    "emoji": "🏁",
    "soloGrupo": true,
    "category": "accion",
    "alias": []
});
