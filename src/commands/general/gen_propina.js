'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "propina",
    "desc": "Calcula propina.",
    "tipo": "utilidad",
    "utilidad": "propina",
    "ejemplo": "100 10",
    "soloGrupo": false,
    "category": "general",
    "alias": []
});
