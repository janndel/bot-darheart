const eco=require('../../lib/eco');
module.exports={name:'adventure',alias:['aventura'],category:'economia',desc:'Ir de aventura',
async execute(sock,msg,args,{chatId}){
 if(await eco.soloGrupo(sock,chatId))return;
 const senderJid=eco.limpiarJid(msg.key.participant||msg.key.remoteJid); const num=eco.numero(senderJid);
 const data=eco.cargar(); const u=eco.usuario(data,chatId,num); const r=eco.cooldownRestante(u,'lastAdventure',15000);
 if(r>0) return sock.sendMessage(chatId,{text:`⏳ Espera *${eco.espera(r)}*.`});
 eco.marcarCooldown(u,'lastAdventure');
 if(eco.prob(70)){ const g=eco.azar(120,450); u.coins+=g; eco.guardar(data); return sock.sendMessage(chatId,{text:`🗺️ @${num} fue de aventura y encontró *${eco.formatear(g)}* coins.\n💰 Total: *${eco.formatear(u.coins)}*`,mentions:[senderJid]}); }
 const p=Math.min(u.coins, eco.azar(20,150)); u.coins=Math.max(0,u.coins-p); eco.guardar(data);
 await sock.sendMessage(chatId,{text:`🗺️ @${num} tuvo una mala aventura y perdió *${eco.formatear(p)}* coins.\n💰 Total: *${eco.formatear(u.coins)}*`,mentions:[senderJid]});
}};