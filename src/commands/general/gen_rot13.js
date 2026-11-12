'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "rot13",
    "desc": "Aplica ROT13.",
    "tipo": "utilidad",
    "utilidad": "rot13",
    "ejemplo": "texto",
    "soloGrupo": false,
    "category": "general",
    "alias": []
});
