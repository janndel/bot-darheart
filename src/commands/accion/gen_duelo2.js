'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "duelo2",
    "desc": "Acción: duelo con un usuario mencionado.",
    "tipo": "accion",
    "textos": [
        "{user} retó a un duelo amistoso a {target}."
    ],
    "emoji": "🤺",
    "soloGrupo": true,
    "category": "accion",
    "alias": []
});
