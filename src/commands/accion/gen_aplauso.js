'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "aplauso",
    "desc": "Acción: aplauso con un usuario mencionado.",
    "tipo": "accion",
    "textos": [
        "{user} le aplaudió a {target}."
    ],
    "emoji": "👏",
    "soloGrupo": true,
    "category": "accion",
    "alias": []
});
