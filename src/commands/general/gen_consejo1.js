'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "consejo1",
    "desc": "Consejo número 1.",
    "tipo": "texto",
    "pool": "consejos",
    "titulo": "CONSEJO #1",
    "emoji": "💡",
    "soloGrupo": false,
    "category": "general",
    "alias": []
});
