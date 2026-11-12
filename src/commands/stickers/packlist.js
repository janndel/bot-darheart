const s=require('../../lib/stickerpacks-store');
module.exports={name:'packlist',alias:['stickerpacks'],category:'stickers',desc:'Listar paquetes',
async execute(sock,msg,args,{chatId}){const d=s.load(); const names=Object.keys(d); await sock.sendMessage(chatId,{text:names.length?('📦 *Packs*\n\n'+names.map(n=>'• '+n+' ('+(d[n].stickers||[]).length+')').join('\n')):'📭 No hay packs.'});}};