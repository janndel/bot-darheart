const gs=require('../../lib/gacha-store'); const fs=require('fs');
module.exports={name:'trade',alias:["intercambiar"],category:'gacha',desc:'trade',
async execute(sock,msg,args,{chatId}){await sock.sendMessage(chatId,{text:'🔁 Intercambio registrado. Usa formato: ,trade <tu personaje> / <personaje 2> (requiere acuerdo de ambas partes).'});}
};
