const eco=require('../../lib/eco');
module.exports={name:'givecoins',alias:['pay','coinsgive'],category:'economia',desc:'Dar coins a un usuario',
async execute(sock,msg,args,{chatId}){
 if(await eco.soloGrupo(sock,chatId))return;
 const menc=eco.mencionados(msg); if(!menc.length) return sock.sendMessage(chatId,{text:'⚠️ Uso: ,givecoins <cantidad|all> @usuario'});
 const senderJid=eco.limpiarJid(msg.key.participant||msg.key.remoteJid); const targetJid=eco.limpiarJid(menc[0]);
 const numS=eco.numero(senderJid), numT=eco.numero(targetJid);
 if(numS===numT) return sock.sendMessage(chatId,{text:'⚠️ No puedes enviarte a ti mismo.'});
 const data=eco.cargar(); const o=eco.usuario(data,chatId,numS), d=eco.usuario(data,chatId,numT);
 const cant=eco.parsearCantidad(args[0], o.coins); if(!cant) return sock.sendMessage(chatId,{text:'⚠️ Cantidad inválida.'});
 if(o.coins<cant) return sock.sendMessage(chatId,{text:`❌ Solo tienes *${eco.formatear(o.coins)}* coins.`});
 o.coins-=cant; d.coins+=cant; eco.guardar(data);
 await sock.sendMessage(chatId,{text:`💸 @${numS} dio *${eco.formatear(cant)}* coins a @${numT}.\n\n💰 @${numS}: *${eco.formatear(o.coins)}*\n💰 @${numT}: *${eco.formatear(d.coins)}*`,mentions:[senderJid,targetJid]});
}};