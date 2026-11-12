'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "potencia",
    "desc": "Calcula potencia.",
    "tipo": "utilidad",
    "utilidad": "potencia",
    "ejemplo": "2 8",
    "soloGrupo": false,
    "category": "general",
    "alias": []
});
