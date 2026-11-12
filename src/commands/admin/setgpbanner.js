const { writeJsonAtomic } = require('../../lib/json-store');
const fs=require('fs'), path=require('path');
const FILE=path.join(process.env.HOME,'config_grupos.json');
function cargar(){try{return JSON.parse(fs.readFileSync(FILE,'utf8'))}catch{return{}}}
function guardar(d){writeJsonAtomic(FILE,d)}
module.exports={name:'setgpbanner',alias:[],category:'admin',desc:'Cambiar imagen del grupo',
async execute(sock,msg,args,{chatId,downloadMediaMessage}){
 if(!chatId.endsWith('@g.us')) return sock.sendMessage(chatId,{text:'⚠️ Solo en grupos.'});
 try{
  const ctx=msg.message?.extendedTextMessage?.contextInfo; const quoted=ctx?.quotedMessage; const propio=msg.message?.imageMessage; const media=quoted|| (propio?msg.message:null);
  if(!media?.imageMessage && !propio) return sock.sendMessage(chatId,{text:'⚠️ Responde/cita una imagen con ,setgpbanner'});
  const key=ctx?.stanzaId?{...msg.key,id:ctx.stanzaId}:msg.key; if(ctx?.participant) key.participant=ctx.participant;
  const buffer=await downloadMediaMessage({message:media,key},'buffer',{},{logger:sock.logger,reuploadRequest:sock.updateMediaMessage});
  await sock.updateProfilePicture(chatId, buffer);
  await sock.sendMessage(chatId,{text:'✅ Imagen del grupo actualizada.'});
 }catch(e){ await sock.sendMessage(chatId,{text:`❌ ${e.message}`}); }
}};