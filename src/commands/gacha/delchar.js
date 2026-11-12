const gs=require('../../lib/gacha-store'); const fs=require('fs');
module.exports={name:'delchar',alias:["deletewaifu","delwaifu"],category:'gacha',desc:'delchar',
async execute(sock,msg,args,{chatId}){const name=args.join(' ').trim(); if(!name) return sock.sendMessage(chatId,{text:'⚠️ Uso: ,delchar <nombre>'}); const sender=msg.key.participant||msg.key.remoteJid; const n=String(sender).split('@')[0].split(':')[0]; const d=gs.load(); if(!d.users[n]) d.users[n]={chars:[]}; const i=d.users[n].chars.findIndex(c=>c.name.toLowerCase()===name.toLowerCase()); if(i<0) return sock.sendMessage(chatId,{text:'❌ No lo tienes.'}); const [c]=d.users[n].chars.splice(i,1); delete d.claims[c.name]; gs.save(d); await sock.sendMessage(chatId,{text:'🗑️ Eliminado *'+c.name+'*',mentions:[sender]});}
};
