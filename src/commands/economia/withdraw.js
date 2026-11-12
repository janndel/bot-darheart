const eco=require('../../lib/eco');
module.exports={name:'withdraw',alias:['with','retirar'],category:'economia',desc:'Retirar coins del banco',
async execute(sock,msg,args,{chatId}){
 if(await eco.soloGrupo(sock,chatId))return;
 const senderJid=eco.limpiarJid(msg.key.participant||msg.key.remoteJid); const num=eco.numero(senderJid);
 const data=eco.cargar(); const user=eco.usuario(data,chatId,num); if(user.banco===undefined) user.banco=0;
 const cantidad=eco.parsearCantidad(args[0], user.banco);
 if(!cantidad) return sock.sendMessage(chatId,{text:'⚠️ Uso: ,withdraw <cantidad|all>'});
 if(user.banco<cantidad) return sock.sendMessage(chatId,{text:'❌ No tienes suficiente en el banco.'});
 user.banco-=cantidad; user.coins+=cantidad; eco.guardar(data);
 await sock.sendMessage(chatId,{text:`🏦 Retiraste *${eco.formatear(cantidad)}* coins.\n💵 En mano: *${eco.formatear(user.coins)}*\n🏛️ Banco: *${eco.formatear(user.banco)}*`,mentions:[senderJid]});
}};