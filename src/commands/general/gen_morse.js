'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "morse",
    "desc": "Convierte a código morse.",
    "tipo": "utilidad",
    "utilidad": "morse",
    "ejemplo": "texto",
    "soloGrupo": false,
    "category": "general",
    "alias": []
});
