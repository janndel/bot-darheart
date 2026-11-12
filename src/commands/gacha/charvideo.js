const gs=require('../../lib/gacha-store'); const fs=require('fs');
module.exports={name:'charvideo',alias:["waifuvideo","cvideo","wvideo"],category:'gacha',desc:'charvideo',
async execute(sock,msg,args,{chatId}){try{const r=await fetch('https://api.waifu.pics/sfw/dance');const j=await r.json(); if(j.url) return sock.sendMessage(chatId,{video:{url:j.url},gifPlayback:true,caption:'🎬 '+(args.join(' ')||'personaje')});}catch(e){} await sock.sendMessage(chatId,{text:'❌ No se pudo obtener video.'});}
};
