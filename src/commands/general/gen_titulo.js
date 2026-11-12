'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "titulo",
    "desc": "Pone el texto en formato título.",
    "tipo": "utilidad",
    "utilidad": "titulo",
    "ejemplo": "texto",
    "soloGrupo": false,
    "category": "general",
    "alias": []
});
