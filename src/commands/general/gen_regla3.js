'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "regla3",
    "desc": "Calcula regla de tres.",
    "tipo": "utilidad",
    "utilidad": "regla3",
    "ejemplo": "10 20 30",
    "soloGrupo": false,
    "category": "general",
    "alias": []
});
