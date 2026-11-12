const eco=require('../../lib/eco');
module.exports={name:'heal',alias:['curar','pocion','potion'],category:'economia',desc:'Curar salud',
async execute(sock,msg,args,{chatId}){
 if(await eco.soloGrupo(sock,chatId))return;
 const senderJid=eco.limpiarJid(msg.key.participant||msg.key.remoteJid); const num=eco.numero(senderJid);
 const data=eco.cargar(); const u=eco.usuario(data,chatId,num);
 const costo=100; if((u.coins||0)<costo) return sock.sendMessage(chatId,{text:`❌ Necesitas *${costo}* coins para curarte.`});
 u.coins-=costo; u.hp=100; u.lastHeal=Date.now(); eco.guardar(data);
 await sock.sendMessage(chatId,{text:`❤️ @${num} se curó (HP 100). Coste: *${costo}* coins.\n💰 Total: *${eco.formatear(u.coins)}*`,mentions:[senderJid]});
}};