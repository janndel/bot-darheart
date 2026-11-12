module.exports={name:'hd',alias:['enhance','remini'],category:'general',desc:'Mejorar imagen (básico)',
async execute(sock,msg,args,{chatId,downloadMediaMessage}){
 const ctx=msg.message?.extendedTextMessage?.contextInfo; const quoted=ctx?.quotedMessage; if(!quoted?.imageMessage) return sock.sendMessage(chatId,{text:'⚠️ Responde a una imagen con ,hd'});
 const key={...msg.key,id:ctx.stanzaId}; if(ctx.participant) key.participant=ctx.participant;
 const buffer=await downloadMediaMessage({message:quoted,key},'buffer',{},{logger:sock.logger,reuploadRequest:sock.updateMediaMessage});
 if (buffer.length > 15 * 1024 * 1024) return sock.sendMessage(chatId,{text:`⚠️ El archivo supera el límite de 15 MB para ahorrar datos del servidor.`});
 await sock.sendMessage(chatId,{image:buffer,caption:'✨ Imagen procesada (HD básico).'});
}};