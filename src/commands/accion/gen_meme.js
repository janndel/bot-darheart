'use strict';

const { crear } = require('../../lib/pack');

module.exports = crear({
    "name": "meme",
    "desc": "Acción: meme con un usuario mencionado.",
    "tipo": "accion",
    "textos": [
        "{user} le mandó un meme a {target}."
    ],
    "emoji": "😂",
    "soloGrupo": true,
    "category": "accion",
    "alias": []
});
