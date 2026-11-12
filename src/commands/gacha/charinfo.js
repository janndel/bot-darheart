const gs=require('../../lib/gacha-store'); const fs=require('fs');
module.exports={name:'charinfo',alias:["winfo","waifuinfo"],category:'gacha',desc:'charinfo',
async execute(sock,msg,args,{chatId}){const name=args.join(' ').trim()||'personaje'; await sock.sendMessage(chatId,{text:'ℹ️ *'+name+'*\nTipo: Gacha\nEstado: disponible en tu colección si lo reclamaste.'});}
};
