const fs=require('fs'),path=require('path');
module.exports={name:'testwelcome',alias:['testgoodbye'],category:'general',desc:'Probar bienvenida/despedida',
async execute(sock,msg,args,{chatId}){
 let cfg={}; try{cfg=JSON.parse(fs.readFileSync(path.join(process.env.HOME,'config_grupos.json'),'utf8'))}catch{}
 const gc=cfg[chatId]||{}; const sender=msg.key.participant||msg.key.remoteJid; const num=String(sender).split('@')[0].split(':')[0];
 const meta=chatId.endsWith('@g.us')?await sock.groupMetadata(chatId).catch(()=>({subject:'Grupo'})):{subject:'Chat'};
 const w=(gc.bienvenida||'¡Hola {user}! Bienvenido a {grupo}').replace('{user}','@'+num).replace('{grupo}',meta.subject);
 const g=(gc.despedida||'Adiós {user}').replace('{user}','@'+num).replace('{grupo}',meta.subject);
 await sock.sendMessage(chatId,{text:'👋 *Welcome:*\n'+w+'\n\n👋 *Goodbye:*\n'+g,mentions:[sender]});
}};