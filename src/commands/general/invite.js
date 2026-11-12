module.exports={name:'invite',alias:['invitar'],category:'general',desc:'Invitar el bot a un grupo',
async execute(sock,msg,args,{chatId,config}){
 const link=(args[0]||'').trim();
 if(!link) return sock.sendMessage(chatId,{text:'⚠️ Uso: ,invite <link de grupo>\nEl owner debe aceptar la unión según configuración.'});
 await sock.sendMessage(chatId,{text:'📩 Solicitud recibida. Si soy owner/subbot con permisos, usa ,join <link> desde el chat del bot.'});
}};