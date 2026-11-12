const { writeJsonAtomic } = require('../../lib/json-store');
const fs=require('fs'), path=require('path');
const FILE=path.join(process.env.HOME,'config_grupos.json');
function cargar(){try{return JSON.parse(fs.readFileSync(FILE,'utf8'))}catch{return{}}}
function guardar(d){writeJsonAtomic(FILE,d)}
module.exports={name:'setgpdesc',alias:[],category:'admin',desc:'Cambiar descripción del grupo',
async execute(sock,msg,args,{chatId}){
 if(!chatId.endsWith('@g.us')) return sock.sendMessage(chatId,{text:'⚠️ Solo en grupos.'});
 const desc=args.join(' ').trim(); if(!desc) return sock.sendMessage(chatId,{text:'⚠️ Uso: ,setgpdesc <texto>'});
 try{ await sock.groupUpdateDescription(chatId,desc); const d=cargar(); if(!d[chatId]) d[chatId]={}; d[chatId].descripcion=desc; guardar(d); await sock.sendMessage(chatId,{text:'✅ Descripción actualizada.'}); }
 catch(e){ await sock.sendMessage(chatId,{text:`❌ ${e.message}`}); }
}};