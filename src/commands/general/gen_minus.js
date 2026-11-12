'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "minus",
    "desc": "Convierte texto a minúsculas.",
    "tipo": "utilidad",
    "utilidad": "minus",
    "ejemplo": "texto",
    "soloGrupo": false,
    "category": "general",
    "alias": []
});
