const gs=require('../../lib/gacha-store'); const fs=require('fs');
module.exports={name:'waifusboard',alias:["waifustop","topwaifus","wtop"],category:'gacha',desc:'waifusboard',
async execute(sock,msg,args,{chatId}){const d=gs.load(); const v=Object.entries(d.votes||{}).sort((a,b)=>b[1]-a[1]).slice(0,10); if(!v.length) return sock.sendMessage(chatId,{text:'📊 Sin votos aún.'}); await sock.sendMessage(chatId,{text:'🏆 *WAIFUS TOP*\n\n'+v.map((x,i)=>`${i+1}. ${x[0]} — ${x[1]} votos`).join('\n')});}
};
