const { writeJsonAtomic } = require('../../lib/json-store');
const fs=require('fs'), path=require('path');
const FILE=path.join(process.env.HOME,'config_grupos.json');
function cargar(){try{return JSON.parse(fs.readFileSync(FILE,'utf8'))}catch{return{}}}
function guardar(d){writeJsonAtomic(FILE,d)}
module.exports={name:'setgpname',alias:[],category:'admin',desc:'Cambiar nombre del grupo',
async execute(sock,msg,args,{chatId}){
 if(!chatId.endsWith('@g.us')) return sock.sendMessage(chatId,{text:'⚠️ Solo en grupos.'});
 const nombre=args.join(' ').trim(); if(!nombre) return sock.sendMessage(chatId,{text:'⚠️ Uso: ,setgpname <nombre>'});
 try{ await sock.groupUpdateSubject(chatId,nombre); const d=cargar(); if(!d[chatId]) d[chatId]={}; d[chatId].nombre=nombre; guardar(d); await sock.sendMessage(chatId,{text:'✅ Nombre del grupo actualizado.'}); }
 catch(e){ await sock.sendMessage(chatId,{text:`❌ ${e.message}`}); }
}};