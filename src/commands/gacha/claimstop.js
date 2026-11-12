const gs=require('../../lib/gacha-store'); const fs=require('fs');
module.exports={name:'claimstop',alias:["topclaims"],category:'gacha',desc:'claimstop',
async execute(sock,msg,args,{chatId}){const d=gs.load(); const counts={}; for(const u of Object.values(d.users||{})){ for(const c of (u.chars||[])){} } const entries=Object.entries(d.users||{}).map(([n,u])=>[n,(u.chars||[]).length]).sort((a,b)=>b[1]-a[1]).slice(0,10); if(!entries.length) return sock.sendMessage(chatId,{text:'📊 Sin claims aún.'}); await sock.sendMessage(chatId,{text:'🏆 *TOP CLAIMS*\n\n'+entries.map((e,i)=>`${i+1}. @${e[0]} — ${e[1]}`).join('\n'),mentions:entries.map(e=>e[0]+'@s.whatsapp.net')});}
};
