const chistes = [
    '¿Qué le dijo un jardinero a otro? — Nos vemos cuando podamos.',
    '¿Cómo se despiden los químicos? — Ácido un placer.',
    '¿Qué hace una abeja en el gimnasio? — Zumba.',
    '¿Qué le dice un jaguar a otro? — Jaguar you?',
    '— Doctor, me duele aquí. — Pues no se toque ahí.',
    '¿Cuál es el café más peligroso? — El ex-preso.',
    '¿Qué le dijo el mar a la arena? — Nada, solo se acercó.',
    '¿Por qué los pájaros vuelan hacia el sur? — Porque caminando tardan mucho.',
    '¿Qué le dice un semáforo a otro? — No me mires, me estoy cambiando.',
    '¿Cómo se llama el campeón de buceo japonés? — Tokofondo.',
    '¿Y el subcampeón? — Kasitoko.',
    '¿Qué le dijo una iguana a otra? — Iguanita que verte.',
    '— ¿Cuál es tu libro favorito? — El de matemáticas, porque tiene muchos problemas.',
    '¿Cómo se llama el primo vegetariano de Bruce Lee? — Broco Lee.',
    '¿Qué hace un perro con un taladro? — Ta-ladrando.',
    '— Mamá, en la escuela me dicen distraído. — Niño, la casa de tu abuela queda al otro lado.',
    '¿Qué le dijo una pared a la otra? — Nos vemos en la esquina.',
    '¿Por qué los esqueletos no pelean entre ellos? — Porque no tienen agallas.',
    '— ¿Cómo se llama el hermano de la luna? — Sol.',
    '¿Qué le dijo un pez a otro? — Nada, se fueron.'
];

module.exports = {
    name: 'chiste',
    alias: ['chistosito'],
    async execute(sock, msg, args, { chatId }) {
        const chiste = chistes[Math.floor(Math.random() * chistes.length)];
        await sock.sendMessage(chatId, { text: `😂 *Chiste*\n\n${chiste}` });
    }
};
