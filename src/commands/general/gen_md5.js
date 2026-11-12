'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "md5",
    "desc": "Genera hash MD5.",
    "tipo": "utilidad",
    "utilidad": "md5",
    "ejemplo": "texto",
    "soloGrupo": false,
    "category": "general",
    "alias": []
});
