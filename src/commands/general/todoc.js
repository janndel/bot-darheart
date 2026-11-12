module.exports={name:'todoc',alias:['tofile'],category:'general',desc:'Convertir media a documento',
async execute(sock,msg,args,{chatId,downloadMediaMessage}){
 const ctx=msg.message?.extendedTextMessage?.contextInfo; const quoted=ctx?.quotedMessage; const propio=msg.message?.imageMessage||msg.message?.videoMessage||msg.message?.audioMessage||msg.message?.stickerMessage;
 const media=quoted||(propio?msg.message:null); if(!media) return sock.sendMessage(chatId,{text:'⚠️ Responde a un archivo/media con ,todoc'});
 const key=ctx?.stanzaId?{...msg.key,id:ctx.stanzaId}:msg.key; if(ctx?.participant) key.participant=ctx.participant;
 const buffer=await downloadMediaMessage({message:media,key},'buffer',{},{logger:sock.logger,reuploadRequest:sock.updateMediaMessage});
 if (buffer.length > 15 * 1024 * 1024) return sock.sendMessage(chatId,{text:`⚠️ El archivo supera el límite de 15 MB para ahorrar datos del servidor.`});
 const mime = media.documentMessage?.mimetype || media.videoMessage?.mimetype || media.audioMessage?.mimetype || media.imageMessage?.mimetype || 'application/octet-stream';
 await sock.sendMessage(chatId,{document:buffer,mimetype:mime,fileName:'archivo'});
}};