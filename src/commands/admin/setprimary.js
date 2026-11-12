const { writeJsonAtomic } = require('../../lib/json-store');
const fs=require('fs'), path=require('path');
const FILE=path.join(process.env.HOME,'config_grupos.json');
function cargar(){try{return JSON.parse(fs.readFileSync(FILE,'utf8'))}catch{return{}}}
function guardar(d){writeJsonAtomic(FILE,d)}
module.exports={name:'setprimary',alias:[],category:'admin',desc:'Establecer bot primario del grupo',
async execute(sock,msg,args,{chatId}){
 if(!chatId.endsWith('@g.us')) return sock.sendMessage(chatId,{text:'⚠️ Solo en grupos.'});
 const m=msg.message.extendedTextMessage?.contextInfo?.mentionedJid;
 if(!m||!m.length) return sock.sendMessage(chatId,{text:'⚠️ Uso: ,setprimary @bot'});
 const d=cargar(); if(!d[chatId]) d[chatId]={}; d[chatId].primaryBot=m[0]; guardar(d);
 await sock.sendMessage(chatId,{text:`✅ Bot primario establecido: @${m[0].split('@')[0]}`,mentions:[m[0]]});
}};