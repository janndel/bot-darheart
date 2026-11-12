const fs=require('fs'), path=require('path'); const {writeJsonAtomic}=require('../../lib/json-store');
const FILE=path.join(process.env.HOME,'perfiles.json');
function load(){try{return JSON.parse(fs.readFileSync(FILE,'utf8'))}catch{return{}}}
function save(d){writeJsonAtomic(FILE,d)}
module.exports={name:'marry',alias:['casarse'],category:'perfil',desc:'Casarte con alguien',
async execute(sock,msg,args,{chatId}){
 const m=msg.message.extendedTextMessage?.contextInfo?.mentionedJid; if(!m||!m.length) return sock.sendMessage(chatId,{text:'⚠️ Uso: ,marry @usuario'});
 const a=msg.key.participant||msg.key.remoteJid; const b=m[0];
 const na=String(a).split('@')[0].split(':')[0], nb=String(b).split('@')[0].split(':')[0];
 const d=load(); if(!d[na])d[na]={}; if(!d[nb])d[nb]={}; d[na].partner=nb; d[nb].partner=na; save(d);
 await sock.sendMessage(chatId,{text:`💍 @${na} y @${nb} ahora están casados.`,mentions:[a,b]});
}};