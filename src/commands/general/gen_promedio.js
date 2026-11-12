'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "promedio",
    "desc": "Calcula promedio.",
    "tipo": "utilidad",
    "utilidad": "promedio",
    "ejemplo": "10 20 30",
    "soloGrupo": false,
    "category": "general",
    "alias": []
});
