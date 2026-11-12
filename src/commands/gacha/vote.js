const gs=require('../../lib/gacha-store'); const fs=require('fs');
module.exports={name:'vote',alias:["votar"],category:'gacha',desc:'vote',
async execute(sock,msg,args,{chatId}){const name=args.join(' ').trim(); if(!name) return sock.sendMessage(chatId,{text:'⚠️ Uso: ,vote <waifu>'}); const d=gs.load(); d.votes=d.votes||{}; d.votes[name]=(d.votes[name]||0)+1; gs.save(d); await sock.sendMessage(chatId,{text:'🗳️ Voto registrado para *'+name+'* ('+d.votes[name]+')'});}
};
