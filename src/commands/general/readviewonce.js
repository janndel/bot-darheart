module.exports={name:'readviewonce',alias:['read','readvo'],category:'general',desc:'Reenviar media de ver una vez',
async execute(sock,msg,args,{chatId,downloadMediaMessage}){
 const ctx=msg.message?.extendedTextMessage?.contextInfo; const quoted=ctx?.quotedMessage; if(!quoted) return sock.sendMessage(chatId,{text:'⚠️ Responde a un mensaje de ver una vez.'});
 const vo = quoted.viewOnceMessageV2?.message || quoted.viewOnceMessage?.message || quoted;
 const media = vo.imageMessage || vo.videoMessage ? vo : quoted;
 const key={...msg.key,id:ctx.stanzaId}; if(ctx.participant) key.participant=ctx.participant;
 try{
  const buffer=await downloadMediaMessage({message:media,key},'buffer',{},{logger:sock.logger,reuploadRequest:sock.updateMediaMessage});
  if (buffer.length > 15 * 1024 * 1024) return sock.sendMessage(chatId,{text:`⚠️ El archivo supera el límite de 15 MB para ahorrar datos del servidor.`});
  if(media.imageMessage || vo.imageMessage) return sock.sendMessage(chatId,{image:buffer,caption:'👁️ view once'});
  if(media.videoMessage || vo.videoMessage) return sock.sendMessage(chatId,{video:buffer,caption:'👁️ view once'});
  await sock.sendMessage(chatId,{document:buffer,fileName:'viewonce',mimetype:'application/octet-stream'});
 }catch(e){ await sock.sendMessage(chatId,{text:'❌ No se pudo abrir: '+e.message}); }
}};