const { writeJsonAtomic } = require('../../lib/json-store');
const fs=require('fs'), path=require('path');
const FILE=path.join(process.env.HOME,'config_grupos.json');
function cargar(){try{return JSON.parse(fs.readFileSync(FILE,'utf8'))}catch{return{}}}
function guardar(d){writeJsonAtomic(FILE,d)}
module.exports={name:'setwarnlimit',alias:[],category:'admin',desc:'Establecer límite de advertencias',
async execute(sock,msg,args,{chatId}){
 if(!chatId.endsWith('@g.us')) return sock.sendMessage(chatId,{text:'⚠️ Solo en grupos.'});
 const n=parseInt(args[0],10);
 if(!n||n<1) return sock.sendMessage(chatId,{text:'⚠️ Uso: ,setwarnlimit <número>'});
 const d=cargar(); if(!d[chatId]) d[chatId]={}; d[chatId].warnLimit=n; guardar(d);
 await sock.sendMessage(chatId,{text:`✅ Límite de advertencias: *${n}*`});
}};