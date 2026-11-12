module.exports={name:'inspect',alias:['inspeccionar'],category:'general',desc:'Inspeccionar enlace de grupo/canal',
async execute(sock,msg,args,{chatId}){
 const link=(args[0]||'').trim(); const code=link.match(/chat\.whatsapp\.com\/([0-9A-Za-z]+)/)?.[1];
 if(!code) return sock.sendMessage(chatId,{text:'⚠️ Uso: ,inspect <link de grupo>'});
 try{const info=await sock.groupGetInviteInfo(code); await sock.sendMessage(chatId,{text:'🔎 *Grupo*\nNombre: '+(info.subject||'-')+'\nID: '+(info.id||'-')+'\nMiembros: '+(info.size||info.participants?.length||'?')+'\nCreador: '+(info.owner||'-')});}
 catch(e){await sock.sendMessage(chatId,{text:'❌ '+e.message});}
}};