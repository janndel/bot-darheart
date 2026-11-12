const fs=require('fs'), os=require('os'), path=require('path'), {exec}=require('child_process');
module.exports={name:'toimg',alias:['toimage'],category:'stickers',desc:'Convertir sticker a imagen/GIF',
async execute(sock,msg,args,{chatId,downloadMediaMessage}){
 const ctx=msg.message?.extendedTextMessage?.contextInfo; const quoted=ctx?.quotedMessage;
 if(!quoted?.stickerMessage) return sock.sendMessage(chatId,{text:'⚠️ Responde a un sticker con ,toimg'});
 const key={...msg.key,id:ctx.stanzaId}; if(ctx.participant) key.participant=ctx.participant;
 const buffer=await downloadMediaMessage({message:quoted,key},'buffer',{},{logger:sock.logger,reuploadRequest:sock.updateMediaMessage});
 const inP=path.join(os.tmpdir(),'st_'+Date.now()+'.webp');
 const outP=path.join(os.tmpdir(),'st_'+Date.now()+'.png');
 fs.writeFileSync(inP,buffer);
 exec(`ffmpeg -y -i "${inP}" "${outP}"`, async (err)=>{
  try{fs.unlinkSync(inP)}catch{}
  if(err||!fs.existsSync(outP)) return sock.sendMessage(chatId,{text:'❌ No se pudo convertir.'});
  const img=fs.readFileSync(outP); try{fs.unlinkSync(outP)}catch{}
  await sock.sendMessage(chatId,{image:img,caption:'🖼️ Sticker convertido'});
 });
}};