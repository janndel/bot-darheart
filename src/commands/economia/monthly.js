const eco=require('../../lib/eco');
module.exports={name:'monthly',alias:['mensual'],category:'economia',desc:'Recompensa mensual',
async execute(sock,msg,args,{chatId}){
 if(await eco.soloGrupo(sock,chatId))return;
 const senderJid=eco.limpiarJid(msg.key.participant||msg.key.remoteJid); const num=eco.numero(senderJid);
 const data=eco.cargar(); const user=eco.usuario(data,chatId,num); const ahora=Date.now(); const cd=30*24*60*60*1000;
 if(user.lastMonthly && ahora-user.lastMonthly<cd) return sock.sendMessage(chatId,{text:`⏳ Ya reclamaste. Vuelve en *${eco.espera(cd-(ahora-user.lastMonthly))}*.`});
 const g=eco.azar(6000,15000); user.coins+=g; user.lastMonthly=ahora; eco.guardar(data);
 await sock.sendMessage(chatId,{text:`🎁 *RECOMPENSA MENSUAL*\n\n@${num} recibió *${eco.formatear(g)}* coins.\n💰 Total: *${eco.formatear(user.coins)}*`,mentions:[senderJid]});
}};