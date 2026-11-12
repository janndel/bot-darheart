const eco=require('../../lib/eco');
module.exports={name:'economyboard',alias:['eboard','baltop'],category:'economia',desc:'Ranking de coins',
async execute(sock,msg,args,{chatId}){
 if(await eco.soloGrupo(sock,chatId))return;
 const data=eco.cargar(); const grupo=data[chatId]||{};
 const ranking=Object.entries(grupo).map(([n,u])=>[n,(Number(u.coins)||0)+(Number(u.banco)||0)]).sort((a,b)=>b[1]-a[1]).slice(0,10);
 if(!ranking.length) return sock.sendMessage(chatId,{text:'📊 Sin datos aún.'});
 const med=['🥇','🥈','🥉']; const lines=ranking.map(([n,c],i)=>`${med[i]||('#'+(i+1))} @${n} — *${eco.formatear(c)}*`).join('\n');
 await sock.sendMessage(chatId,{text:`🏆 *ECONOMY TOP*\n\n${lines}`,mentions:ranking.map(([n])=>n+'@s.whatsapp.net')});
}};