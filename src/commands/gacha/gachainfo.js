const gs=require('../../lib/gacha-store');
module.exports={name:'gachainfo',alias:['infogacha'],category:'gacha',desc:'Información de gacha',
async execute(sock,msg,args,{chatId}){
 const sender=msg.key.participant||msg.key.remoteJid; const n=String(sender).split('@')[0].split(':')[0];
 const d=gs.load(); const u=d.users[n]||{chars:[]};
 await sock.sendMessage(chatId,{text:`🎴 *GACHA INFO*\n\n👤 @${n}\nPersonajes: *${(u.chars||[]).length}*\nDisponibles en roll: *${Object.keys(d.market||{}).length}*`,mentions:[sender]});
}};