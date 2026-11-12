'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "sha1",
    "desc": "Genera hash SHA1.",
    "tipo": "utilidad",
    "utilidad": "sha1",
    "ejemplo": "texto",
    "soloGrupo": false,
    "category": "general",
    "alias": []
});
