'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "descuento",
    "desc": "Calcula descuento.",
    "tipo": "utilidad",
    "utilidad": "descuento",
    "ejemplo": "100 20",
    "soloGrupo": false,
    "category": "general",
    "alias": []
});
