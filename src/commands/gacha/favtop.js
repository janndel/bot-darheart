const gs=require('../../lib/gacha-store'); const fs=require('fs');
module.exports={name:'favtop',alias:["favoritetop","favboard"],category:'gacha',desc:'favtop',
async execute(sock,msg,args,{chatId}){const d=gs.load(); const favs={}; for(const u of Object.values(d.users||{})){ if(u.fav) favs[u.fav]=(favs[u.fav]||0)+1; } const e=Object.entries(favs).sort((a,b)=>b[1]-a[1]).slice(0,10); if(!e.length) return sock.sendMessage(chatId,{text:'📊 Sin favoritos aún.'}); await sock.sendMessage(chatId,{text:'⭐ *FAV TOP*\n\n'+e.map((x,i)=>`${i+1}. ${x[0]} — ${x[1]}`).join('\n')});}
};
