const gs=require('../../lib/gacha-store'); const fs=require('fs');
module.exports={name:'charimage',alias:["waifuimage","cimage","wimage"],category:'gacha',desc:'charimage',
async execute(sock,msg,args,{chatId}){const name=args.join(' ').trim()||'waifu'; const url='https://api.waifu.pics/sfw/waifu'; try{const r=await fetch(url);const j=await r.json(); if(j.url) return sock.sendMessage(chatId,{image:{url:j.url},caption:'🖼️ '+name});}catch(e){} await sock.sendMessage(chatId,{text:'❌ No se pudo obtener imagen.'});}
};
