'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "confesion2",
    "desc": "Acción: confesion con un usuario mencionado.",
    "tipo": "accion",
    "textos": [
        "{user} le pidió una confesión a {target}."
    ],
    "emoji": "🤫",
    "soloGrupo": true,
    "category": "accion",
    "alias": []
});
