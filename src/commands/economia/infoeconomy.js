const eco=require('../../lib/eco');
module.exports={name:'infoeconomy',alias:['cooldowns','economyinfo','einfo'],category:'economia',desc:'Info de economía y cooldowns',
async execute(sock,msg,args,{chatId}){
 if(await eco.soloGrupo(sock,chatId))return;
 const senderJid=eco.limpiarJid(msg.key.participant||msg.key.remoteJid); const num=eco.numero(senderJid);
 const data=eco.cargar(); const u=eco.usuario(data,chatId,num); const ahora=Date.now();
 function cd(field,ms){const v=Number(u[field]||0); if(!v) return '✅ listo'; const r=ms-(ahora-v); return r>0?('⏳ '+eco.espera(r)):'✅ listo';}
 const txt=['💼 *INFO ECONOMÍA*','',`👤 @${num}`,'',`work: ${cd('lastWork',5000)}`,`daily: ${cd('lastDaily',5000)}`,`weekly: ${cd('lastWeekly',7*24*60*60*1000)}`,`monthly: ${cd('lastMonthly',30*24*60*60*1000)}`,`crime: ${cd('lastCrime',5000)}`,`slut: ${cd('lastSlut',5000)}`,`rob: ${cd('lastRob',5000)}`,'',`💵 Mano: *${eco.formatear(u.coins||0)}*`,`🏦 Banco: *${eco.formatear(u.banco||0)}*`].join('\n');
 await sock.sendMessage(chatId,{text:txt,mentions:[senderJid]});
}};