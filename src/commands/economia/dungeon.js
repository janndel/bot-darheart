const eco=require('../../lib/eco');
module.exports={name:'dungeon',alias:['mazmorra'],category:'economia',desc:'Explorar mazmorras',
async execute(sock,msg,args,{chatId}){
 if(await eco.soloGrupo(sock,chatId))return;
 const senderJid=eco.limpiarJid(msg.key.participant||msg.key.remoteJid); const num=eco.numero(senderJid);
 const data=eco.cargar(); const u=eco.usuario(data,chatId,num); const r=eco.cooldownRestante(u,'lastDungeon',20000);
 if(r>0) return sock.sendMessage(chatId,{text:`⏳ Espera *${eco.espera(r)}*.`});
 eco.marcarCooldown(u,'lastDungeon');
 if(eco.prob(60)){ const g=eco.azar(200,700); u.coins+=g; eco.guardar(data); return sock.sendMessage(chatId,{text:`🏰 @${num} exploró una mazmorra y ganó *${eco.formatear(g)}* coins.\n💰 Total: *${eco.formatear(u.coins)}*`,mentions:[senderJid]}); }
 const p=Math.min(u.coins, eco.azar(50,250)); u.coins=Math.max(0,u.coins-p); eco.guardar(data);
 await sock.sendMessage(chatId,{text:`🏰 @${num} fue derrotado en la mazmorra y perdió *${eco.formatear(p)}* coins.\n💰 Total: *${eco.formatear(u.coins)}*`,mentions:[senderJid]});
}};