'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "suma",
    "desc": "Suma números.",
    "tipo": "utilidad",
    "utilidad": "suma",
    "ejemplo": "2 3",
    "soloGrupo": false,
    "category": "general",
    "alias": []
});
