const gs=require('../../lib/gacha-store'); const fs=require('fs');
module.exports={name:'setclaim',alias:["setclaimmsg"],category:'gacha',desc:'setclaim',
async execute(sock,msg,args,{chatId}){const txt=args.join(' ').trim(); if(!txt) return sock.sendMessage(chatId,{text:'⚠️ Uso: ,setclaim <texto>'}); const sender=msg.key.participant||msg.key.remoteJid; const n=String(sender).split('@')[0].split(':')[0]; const d=gs.load(); if(!d.users[n]) d.users[n]={chars:[]}; d.users[n].claimMsg=txt; gs.save(d); await sock.sendMessage(chatId,{text:'✅ Mensaje de claim guardado.'});}
};
