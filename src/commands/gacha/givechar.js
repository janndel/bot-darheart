const gs=require('../../lib/gacha-store');
module.exports={name:'givechar',alias:['givewaifu'],category:'gacha',desc:'Regalar personaje',
async execute(sock,msg,args,{chatId}){
 const m=msg.message.extendedTextMessage?.contextInfo?.mentionedJid; if(!m||!m.length) return sock.sendMessage(chatId,{text:'⚠️ Uso: ,givechar <nombre> @usuario'});
 const name=args.filter(a=>!a.startsWith('@')).join(' ').trim(); if(!name) return sock.sendMessage(chatId,{text:'⚠️ Indica el nombre del personaje.'});
 const sender=msg.key.participant||msg.key.remoteJid; const ns=String(sender).split('@')[0].split(':')[0]; const nt=String(m[0]).split('@')[0].split(':')[0];
 const d=gs.load(); if(!d.users[ns]) d.users[ns]={chars:[]}; if(!d.users[nt]) d.users[nt]={chars:[]};
 const i=d.users[ns].chars.findIndex(c=>c.name.toLowerCase()===name.toLowerCase());
 if(i<0) return sock.sendMessage(chatId,{text:'❌ No tienes ese personaje.'});
 const [ch]=d.users[ns].chars.splice(i,1); d.users[nt].chars.push(ch); d.claims[ch.name]=nt; gs.save(d);
 await sock.sendMessage(chatId,{text:`🎁 @${ns} regaló *${ch.name}* a @${nt}.`,mentions:[sender,m[0]]});
}};