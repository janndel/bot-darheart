'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "globo",
    "desc": "Acción: globo con un usuario mencionado.",
    "tipo": "accion",
    "textos": [
        "{user} le dio un globo a {target}."
    ],
    "emoji": "🎈",
    "soloGrupo": true,
    "category": "accion",
    "alias": []
});
