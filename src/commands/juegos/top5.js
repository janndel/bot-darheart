const TEMAS = {
    'comida': ['Pizza', 'Sushi', 'Hamburguesa', 'Tacos', 'Pasta', 'Pollo frito', 'Arepas', 'Empanadas', 'Helado', 'Chocolate'],
    'musica': ['Reggaeton', 'Pop', 'Rock', 'Salsa', 'Bachata', 'Cumbia', 'Rap', 'Electrónica', 'Vallenato', 'Jazz'],
    'peliculas': ['Titanic', 'Avatar', 'El Padrino', 'Matrix', 'Inception', 'Interestelar', 'Joker', 'Gladiador', 'Forrest Gump', 'Pulp Fiction'],
    'paises': ['Japón', 'Italia', 'Francia', 'Brasil', 'España', 'México', 'Canadá', 'Australia', 'Suiza', 'Argentina'],
    'animales': ['Perro', 'Gato', 'León', 'Tigre', 'Elefante', 'Delfín', 'Águila', 'Lobo', 'Caballo', 'Panda'],
    'deportes': ['Fútbol', 'Baloncesto', 'Béisbol', 'Tenis', 'Boxeo', 'Natación', 'Atletismo', 'Voleibol', 'Ciclismo', 'Golf'],
    'colores': ['Azul', 'Rojo', 'Verde', 'Negro', 'Blanco', 'Morado', 'Rosa', 'Amarillo', 'Naranja', 'Turquesa']
};

module.exports = {
    name: 'top5',
    alias: ['top', 'ranking5'],
    category: 'juegos',
    desc: 'Top 5 aleatorio de cualquier tema',
    async execute(sock, msg, args, { chatId }) {
        const tema = args[0]?.toLowerCase();
        if (!tema) {
            return await sock.sendMessage(chatId, {
                text: `⚠️ *Temas disponibles:*\n${Object.keys(TEMAS).join(', ')}\n\nEjemplo: ,top5 comida`
            });
        }
        const opciones = TEMAS[tema];
        if (!opciones) return await sock.sendMessage(chatId, { text: `⚠️ Tema no encontrado.` });

        const mezcladas = [...opciones].sort(() => Math.random() - 0.5).slice(0, 5);
        const medallas = ['🥇', '🥈', '🥉', '4️⃣', '5️⃣'];
        const lista = mezcladas.map((item, i) => `${medallas[i]} ${item}`).join('\n');

        await sock.sendMessage(chatId, {
            text: `📊 *TOP 5 - ${tema.toUpperCase()}*\n\n${lista}`
        });
    }
};
