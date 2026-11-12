const { obtenerActivosDelGrupo } = require('../../lib/grupo');
module.exports={name:'topcount',alias:['topmensajes','topmsgcount','topmessages'],category:'admin',desc:'Top usuarios con más mensajes',
async execute(sock,msg,args,{chatId}){
 if(!chatId.endsWith('@g.us')) return sock.sendMessage(chatId,{text:'⚠️ Solo en grupos.'});
 const activos=obtenerActivosDelGrupo(chatId)||{};
 const ranking=Object.entries(activos).map(([n,v])=>[n, typeof v==='number'?v:(v?.count||0)]).sort((a,b)=>b[1]-a[1]).slice(0,10);
 if(!ranking.length) return sock.sendMessage(chatId,{text:'📊 Sin datos de mensajes aún.'});
 const lines=ranking.map(([n,c],i)=>`${i+1}. @${n} — *${c}* msj`).join('\n');
 await sock.sendMessage(chatId,{text:`🏆 *TOP MENSAJES*\n\n${lines}`,mentions:ranking.map(([n])=>n+'@s.whatsapp.net')});
}};