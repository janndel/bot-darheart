const { exec } = require('child_process');
const fs=require('fs'); const os=require('os'); const path=require('path');
module.exports={name:'tourl',alias:[],category:'general',desc:'Subir media y obtener enlace',
async execute(sock,msg,args,{chatId,downloadMediaMessage}){
 try{
  const ctx=msg.message?.extendedTextMessage?.contextInfo; const quoted=ctx?.quotedMessage; const propio=msg.message?.imageMessage||msg.message?.videoMessage||msg.message?.audioMessage||msg.message?.documentMessage||msg.message?.stickerMessage;
  const media=quoted||(propio?msg.message:null);
  if(!media) return sock.sendMessage(chatId,{text:'⚠️ Responde a una imagen/video/audio con ,tourl'});
  const key=ctx?.stanzaId?{...msg.key,id:ctx.stanzaId}:msg.key; if(ctx?.participant) key.participant=ctx.participant;
  const buffer=await downloadMediaMessage({message:media,key},'buffer',{},{logger:sock.logger,reuploadRequest:sock.updateMediaMessage});
  if (buffer.length > 15 * 1024 * 1024) return sock.sendMessage(chatId,{text:`⚠️ El archivo supera el límite de 15 MB para ahorrar datos del servidor.`});
  const tmp=path.join(os.tmpdir(),'up_'+Date.now()+'.bin'); fs.writeFileSync(tmp,buffer);
  await sock.sendMessage(chatId,{text:'⏳ Subiendo...'});
  exec(`curl -s -F "file=@${tmp}" https://0x0.st`, {timeout:120000}, async (err,stdout)=>{
    try{fs.unlinkSync(tmp)}catch{}
    if(err||!stdout.trim()) return sock.sendMessage(chatId,{text:'❌ No se pudo subir el archivo.'});
    await sock.sendMessage(chatId,{text:'🔗 '+stdout.trim()});
  });
 }catch(e){ await sock.sendMessage(chatId,{text:'❌ '+e.message}); }
}};