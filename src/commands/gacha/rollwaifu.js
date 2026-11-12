const gs=require('../../lib/gacha-store');
module.exports={name:'rollwaifu',alias:['rw','roll'],category:'gacha',desc:'Waifu/husbando aleatorio',
async execute(sock,msg,args,{chatId}){
 const d=gs.load(); const w=gs.rand(gs.pool); const id=Date.now().toString(36);
 d.market[id]={name:w,by:null,at:Date.now()}; gs.save(d);
 await sock.sendMessage(chatId,{text:`🎲 *ROLL*\n\nPersonaje: *${w}*\nID: ${id}\n\nUsa ,claim ${id} o ,claim ${w} para reclamarlo.`});
}};