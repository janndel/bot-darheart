const gs=require('../../lib/gacha-store'); const fs=require('fs');
module.exports={name:'serieinfo',alias:["ainfo","animeinfo"],category:'gacha',desc:'serieinfo',
async execute(sock,msg,args,{chatId}){const name=args.join(' ').trim()||'serie'; await sock.sendMessage(chatId,{text:'📺 *Serie:* '+name+'\nInfo: serie registrada en el sistema de gacha.'});}
};
