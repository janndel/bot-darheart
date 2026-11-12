'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "sha256",
    "desc": "Genera hash SHA256.",
    "tipo": "utilidad",
    "utilidad": "sha256",
    "ejemplo": "texto",
    "soloGrupo": false,
    "category": "general",
    "alias": []
});
