const eco=require('../../lib/eco');
module.exports={name:'weekly',alias:['semanal'],category:'economia',desc:'Recompensa semanal',
async execute(sock,msg,args,{chatId}){
 if(await eco.soloGrupo(sock,chatId))return;
 const senderJid=eco.limpiarJid(msg.key.participant||msg.key.remoteJid); const num=eco.numero(senderJid);
 const data=eco.cargar(); const user=eco.usuario(data,chatId,num); const ahora=Date.now(); const cd=7*24*60*60*1000;
 if(user.lastWeekly && ahora-user.lastWeekly<cd) return sock.sendMessage(chatId,{text:`⏳ Ya reclamaste. Vuelve en *${eco.espera(cd-(ahora-user.lastWeekly))}*.`});
 const g=eco.azar(1500,4000); user.coins+=g; user.lastWeekly=ahora; eco.guardar(data);
 await sock.sendMessage(chatId,{text:`🎁 *RECOMPENSA SEMANAL*\n\n@${num} recibió *${eco.formatear(g)}* coins.\n💰 Total: *${eco.formatear(user.coins)}*`,mentions:[senderJid]});
}};