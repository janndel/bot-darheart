const eco=require('../../lib/eco');
module.exports={name:'ritual',alias:['invoke','invocar'],category:'economia',desc:'Ritual de invocación',
async execute(sock,msg,args,{chatId}){
 if(await eco.soloGrupo(sock,chatId))return;
 const senderJid=eco.limpiarJid(msg.key.participant||msg.key.remoteJid); const num=eco.numero(senderJid);
 const data=eco.cargar(); const u=eco.usuario(data,chatId,num); const r=eco.cooldownRestante(u,'lastRitual',30000);
 if(r>0) return sock.sendMessage(chatId,{text:`⏳ El ritual se está preparando. Espera *${eco.espera(r)}*.`});
 eco.marcarCooldown(u,'lastRitual');
 if(eco.prob(50)){ const g=eco.azar(150,600); u.coins+=g; eco.guardar(data); return sock.sendMessage(chatId,{text:`🔮 @${num} completó el ritual y recibió *${eco.formatear(g)}* coins.\n💰 Total: *${eco.formatear(u.coins)}*`,mentions:[senderJid]}); }
 const p=Math.min(u.coins, eco.azar(50,200)); u.coins=Math.max(0,u.coins-p); eco.guardar(data);
 await sock.sendMessage(chatId,{text:`🔮 El ritual falló. @${num} perdió *${eco.formatear(p)}* coins.\n💰 Total: *${eco.formatear(u.coins)}*`,mentions:[senderJid]});
}};