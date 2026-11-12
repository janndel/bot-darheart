const gs=require('../../lib/gacha-store'); const fs=require('fs');
module.exports={name:'removesale',alias:["removerventa"],category:'gacha',desc:'removesale',
async execute(sock,msg,args,{chatId}){const name=args.join(' ').trim(); if(!name) return sock.sendMessage(chatId,{text:'⚠️ Uso: ,removesale <waifu>'}); const d=gs.load(); const e=Object.entries(d.market||{}).find(([k,v])=>v.name&&v.name.toLowerCase()===name.toLowerCase()); if(!e) return sock.sendMessage(chatId,{text:'❌ No está en venta.'}); delete d.market[e[0]]; gs.save(d); await sock.sendMessage(chatId,{text:'✅ Removido de venta: '+name});}
};
