'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "multiplicar",
    "desc": "Multiplica números.",
    "tipo": "utilidad",
    "utilidad": "multiplicar",
    "ejemplo": "3 4",
    "soloGrupo": false,
    "category": "general",
    "alias": []
});
