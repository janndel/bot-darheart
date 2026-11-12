module.exports={name:'clear',alias:[],category:'admin',desc:'Limpiar usuarios inactivos (ver/eliminar)',
async execute(sock,msg,args,{chatId}){
 if(!chatId.endsWith('@g.us')) return sock.sendMessage(chatId,{text:'⚠️ Solo en grupos.'});
 const mode=(args[0]||'view').toLowerCase();
 if(mode==='view'||mode==='ver') return sock.sendMessage(chatId,{text:'🧹 Usa: ,clear view | ,clear delete | ,clear delete full\n(para expulsar inactivos usa ,topinactivos limpiar)'});
 if(mode==='delete') return sock.sendMessage(chatId,{text:'🧹 Para expulsar inactivos usa: ,topinactivos limpiar (owner).'});
 await sock.sendMessage(chatId,{text:'⚠️ Opción no válida. Usa: ,clear view|delete|delete full'});
}};