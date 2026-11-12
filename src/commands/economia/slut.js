const eco=require('../../lib/eco');
const acts=['hiciste un trabajo riesgoso','aceptaste un encargo peligroso','te metiste en un lío por dinero','tomaste un trabajo turbio'];
module.exports={name:'slut',alias:['prostituirse'],category:'economia',desc:'Ganar coins con riesgo',
async execute(sock,msg,args,{chatId}){
 if(await eco.soloGrupo(sock,chatId))return;
 const senderJid=eco.limpiarJid(msg.key.participant||msg.key.remoteJid); const num=eco.numero(senderJid);
 const data=eco.cargar(); const u=eco.usuario(data,chatId,num); const r=eco.cooldownRestante(u,'lastSlut',5000);
 if(r>0) return sock.sendMessage(chatId,{text:`⏳ Espera *${eco.espera(r)}*.`});
 eco.marcarCooldown(u,'lastSlut');
 if(eco.prob(45)){ const g=eco.azar(80,350); u.coins+=g; eco.guardar(data); return sock.sendMessage(chatId,{text:`😈 @${num} ${eco.elegir(acts)} y ganó *${eco.formatear(g)}* coins.\n💰 Total: *${eco.formatear(u.coins)}*`,mentions:[senderJid]}); }
 const p=Math.min(u.coins, eco.azar(30,200)); u.coins=Math.max(0,u.coins-p); eco.guardar(data);
 await sock.sendMessage(chatId,{text:`🚔 @${num} ${eco.elegir(acts)} y salió mal. Perdió *${eco.formatear(p)}* coins.\n💰 Total: *${eco.formatear(u.coins)}*`,mentions:[senderJid]});
}};