'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "imc",
    "desc": "Calcula IMC.",
    "tipo": "utilidad",
    "utilidad": "imc",
    "ejemplo": "70 1.75",
    "soloGrupo": false,
    "category": "general",
    "alias": []
});
