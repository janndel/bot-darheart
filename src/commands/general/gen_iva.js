'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "iva",
    "desc": "Calcula IVA 16%.",
    "tipo": "utilidad",
    "utilidad": "iva",
    "ejemplo": "100",
    "soloGrupo": false,
    "category": "general",
    "alias": []
});
