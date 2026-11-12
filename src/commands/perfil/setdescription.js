const fs=require('fs'), path=require('path'); const {writeJsonAtomic}=require('../../lib/json-store');
const FILE=path.join(process.env.HOME,'perfiles.json');
function load(){try{return JSON.parse(fs.readFileSync(FILE,'utf8'))}catch{return{}}}
function save(d){writeJsonAtomic(FILE,d)}
module.exports={name:'setdescription',alias:["setdesc"],category:'perfil',desc:'Descripción de perfil',
async execute(sock,msg,args,{chatId}){
 const sender=msg.key.participant||msg.key.remoteJid; const num=String(sender).split('@')[0].split(':')[0];
 const d=load(); if(!d[num]) d[num]={};
 const v=args.join(' ').trim(); if(!v) return sock.sendMessage(chatId,{text:'⚠️ Uso: ,setdescription <texto>'});
 d[num].desc=v; save(d);
 await sock.sendMessage(chatId,{text:'✅ Descripción de perfil actualizado: '+v,mentions:[sender]});
}};