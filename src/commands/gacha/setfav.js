const gs=require('../../lib/gacha-store'); const fs=require('fs');
module.exports={name:'setfav',alias:["setfavourite"],category:'gacha',desc:'setfav',
async execute(sock,msg,args,{chatId}){const name=args.join(' ').trim(); if(!name) return sock.sendMessage(chatId,{text:'⚠️ Uso: ,setfav <waifu>'}); const sender=msg.key.participant||msg.key.remoteJid; const n=String(sender).split('@')[0].split(':')[0]; const d=gs.load(); if(!d.users[n]) d.users[n]={chars:[]}; d.users[n].fav=name; gs.save(d); await sock.sendMessage(chatId,{text:'⭐ Favorito establecido: '+name,mentions:[sender]});}
};
