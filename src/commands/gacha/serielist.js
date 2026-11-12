const gs=require('../../lib/gacha-store'); const fs=require('fs');
module.exports={name:'serielist',alias:["slist","animelist"],category:'gacha',desc:'serielist',
async execute(sock,msg,args,{chatId}){await sock.sendMessage(chatId,{text:'📚 *Series:*\n- Naruto\n- One Piece\n- Dragon Ball\n- Demon Slayer\n- Jujutsu Kaisen'});}
};
