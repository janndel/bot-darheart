const gs=require('../../lib/gacha-store'); const fs=require('fs');
module.exports={name:'delclaimmsg',alias:["resetclaimmsg"],category:'gacha',desc:'delclaimmsg',
async execute(sock,msg,args,{chatId}){const sender=msg.key.participant||msg.key.remoteJid; const n=String(sender).split('@')[0].split(':')[0]; const d=gs.load(); if(!d.users[n]) d.users[n]={chars:[]}; delete d.users[n].claimMsg; gs.save(d); await sock.sendMessage(chatId,{text:'✅ Mensaje de claim restablecido.',mentions:[sender]});}
};
