'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "ruletajuego",
    "desc": "Acción: ruletajuego con un usuario mencionado.",
    "tipo": "accion",
    "textos": [
        "{user} giró la ruleta contra {target}."
    ],
    "emoji": "🎡",
    "soloGrupo": true,
    "category": "accion",
    "alias": []
});
