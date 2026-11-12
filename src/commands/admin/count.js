const { obtenerActivosDelGrupo } = require('../../lib/grupo');
module.exports={name:'count',alias:['mensajes','messages','msgcount'],category:'admin',desc:'Conteo de mensajes de un usuario',
async execute(sock,msg,args,{chatId}){
 if(!chatId.endsWith('@g.us')) return sock.sendMessage(chatId,{text:'⚠️ Solo en grupos.'});
 const m=msg.message.extendedTextMessage?.contextInfo?.mentionedJid;
 const target=(m&&m[0])||(msg.key.participant||msg.key.remoteJid);
 const num=String(target).split('@')[0].split(':')[0];
 const activos=obtenerActivosDelGrupo(chatId)||{};
 const v=activos[num]; const count=typeof v==='number'?v:(v?.count||0);
 await sock.sendMessage(chatId,{text:`📊 @${num} tiene *${count}* mensajes registrados.`,mentions:[target]});
}};