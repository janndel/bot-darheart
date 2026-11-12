const { obtenerActivosDelGrupo } = require('../../lib/grupo');
module.exports={name:'lboard',alias:['lb','leaderboard'],category:'perfil',desc:'Top usuarios por experiencia',
async execute(sock,msg,args,{chatId}){
 if(!chatId.endsWith('@g.us')) return sock.sendMessage(chatId,{text:'⚠️ Solo en grupos.'});
 const activos=obtenerActivosDelGrupo(chatId)||{};
 const r=Object.entries(activos).map(([n,v])=>[n,typeof v==='number'?v:(v?.count||0)]).sort((a,b)=>b[1]-a[1]).slice(0,10);
 if(!r.length) return sock.sendMessage(chatId,{text:'📊 Sin datos aún.'});
 const t=r.map(([n,x],i)=>`${i+1}. @${n} — Lv ${Math.floor(x/50)+1} (${x} xp)`).join('\n');
 await sock.sendMessage(chatId,{text:`🏆 *LEADERBOARD*\n\n${t}`,mentions:r.map(([n])=>n+'@s.whatsapp.net')});
}};