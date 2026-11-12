'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "tarotdecisiones",
    "desc": "Consulta de tarot sobre decisiones.",
    "tipo": "texto",
    "pool": "tarot",
    "titulo": "TAROT · DECISIONES",
    "emoji": "🔮",
    "soloGrupo": false,
    "category": "juegos",
    "alias": []
});
