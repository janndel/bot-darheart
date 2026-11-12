const gs=require('../../lib/gacha-store'); const fs=require('fs');
module.exports={name:'wshop',alias:["haremshop","tiendawaifus"],category:'gacha',desc:'wshop',
async execute(sock,msg,args,{chatId}){const d=gs.load(); const items=Object.entries(d.market||{}).slice(0,20); if(!items.length) return sock.sendMessage(chatId,{text:'🛒 Tienda vacía. Usa ,roll y ,sell.'}); await sock.sendMessage(chatId,{text:'🛒 *WSHOP*\n\n'+items.map(([id,it])=>`• ${it.name} (ID: ${id}) ${it.price?'- '+it.price+'':''}`).join('\n')});}
};
