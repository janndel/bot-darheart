'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "pulgararriba",
    "desc": "Acción: pulgararriba con un usuario mencionado.",
    "tipo": "accion",
    "textos": [
        "{user} le dio pulgar arriba a {target}."
    ],
    "emoji": "👍",
    "soloGrupo": true,
    "category": "accion",
    "alias": []
});
