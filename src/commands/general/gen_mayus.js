'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "mayus",
    "desc": "Convierte texto a mayúsculas.",
    "tipo": "utilidad",
    "utilidad": "mayus",
    "ejemplo": "texto",
    "soloGrupo": false,
    "category": "general",
    "alias": []
});
