'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "capitalizar",
    "desc": "Capitaliza el texto.",
    "tipo": "utilidad",
    "utilidad": "capitalizar",
    "ejemplo": "texto",
    "soloGrupo": false,
    "category": "general",
    "alias": []
});
