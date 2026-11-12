'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "porcentaje",
    "desc": "Calcula porcentaje.",
    "tipo": "utilidad",
    "utilidad": "porcentaje",
    "ejemplo": "20 150",
    "soloGrupo": false,
    "category": "general",
    "alias": []
});
