const gs=require('../../lib/gacha-store');
module.exports={name:'harem',alias:['waifus','claims'],category:'gacha',desc:'Ver personajes reclamados',
async execute(sock,msg,args,{chatId}){
 const m=msg.message.extendedTextMessage?.contextInfo?.mentionedJid; const target=(m&&m[0])||(msg.key.participant||msg.key.remoteJid);
 const num=String(target).split('@')[0].split(':')[0]; const d=gs.load(); const chars=(d.users[num]?.chars)||[];
 if(!chars.length) return sock.sendMessage(chatId,{text:`📭 @${num} no tiene personajes.`,mentions:[target]});
 const list=chars.slice(0,30).map((c,i)=>`${i+1}. ${c.name}`).join('\n');
 await sock.sendMessage(chatId,{text:`🎴 *HAREM de @${num}* (${chars.length})\n\n${list}`,mentions:[target]});
}};