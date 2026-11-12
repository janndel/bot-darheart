const gs=require('../../lib/gacha-store');
module.exports={name:'claim',alias:['c','reclamar'],category:'gacha',desc:'Reclamar personaje',
async execute(sock,msg,args,{chatId}){
 const q=args.join(' ').trim(); if(!q) return sock.sendMessage(chatId,{text:'⚠️ Uso: ,claim <id|nombre>'});
 const sender=msg.key.participant||msg.key.remoteJid; const num=String(sender).split('@')[0].split(':')[0];
 const d=gs.load(); if(!d.users[num]) d.users[num]={chars:[]};
 let id=q, item=d.market[q];
 if(!item){ const e=Object.entries(d.market).find(([k,v])=>v && v.name.toLowerCase()===q.toLowerCase()); if(e){id=e[0]; item=e[1];} }
 if(!item) return sock.sendMessage(chatId,{text:'❌ No encontré ese personaje disponible. Usa ,roll.'});
 if(item.claimedBy) return sock.sendMessage(chatId,{text:'❌ Ese personaje ya fue reclamado.'});
 item.claimedBy=num; item.claimedAt=Date.now(); d.users[num].chars.push({id,name:item.name,at:Date.now()}); d.claims[item.name]=num; delete d.market[id];
 gs.save(d);
 await sock.sendMessage(chatId,{text:`✅ @${num} reclamó a *${item.name}*.`,mentions:[sender]});
}};