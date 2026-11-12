const { obtenerActivosDelGrupo } = require('../../lib/grupo');
module.exports={name:'level',alias:['lvl'],category:'perfil',desc:'Ver nivel y experiencia',
async execute(sock,msg,args,{chatId}){
 if(!chatId.endsWith('@g.us')) return sock.sendMessage(chatId,{text:'⚠️ Solo en grupos.'});
 const m=msg.message.extendedTextMessage?.contextInfo?.mentionedJid;
 const target=(m&&m[0])||(msg.key.participant||msg.key.remoteJid);
 const num=String(target).split('@')[0].split(':')[0];
 const activos=obtenerActivosDelGrupo(chatId)||{}; const v=activos[num]; const xp=(typeof v==='number'?v:(v?.count||0));
 const level=Math.floor(xp/50)+1; const next=level*50;
 await sock.sendMessage(chatId,{text:`⭐ *NIVEL*\n\n👤 @${num}\nNivel: *${level}*\nXP: *${xp}* / ${next}`,mentions:[target]});
}};