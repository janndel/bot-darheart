const { writeJsonAtomic } = require('../../lib/json-store');
const fs=require('fs'), path=require('path');
const FILE=path.join(process.env.HOME,'warns.json');
function cargar(){try{return JSON.parse(fs.readFileSync(FILE,'utf8'))}catch{return{}}}
function guardar(d){writeJsonAtomic(FILE,d)}
module.exports={name:'delwarn',alias:[],category:'admin',desc:'Eliminar advertencia(s) de un miembro',
async execute(sock,msg,args,{chatId}){
 if(!chatId.endsWith('@g.us')) return sock.sendMessage(chatId,{text:'⚠️ Solo en grupos.'});
 const m=msg.message.extendedTextMessage?.contextInfo?.mentionedJid;
 if(!m||!m.length) return sock.sendMessage(chatId,{text:'⚠️ Uso: ,delwarn @usuario <número|all>'});
 const num=m[0].split('@')[0].split(':')[0]; const opt=(args.find(a=>!/^d+$/.test(a)&&!a.startsWith('@'))||args[1]||'1').toLowerCase();
 const data=cargar(); if(!data[chatId]) data[chatId]={};
 const cur=data[chatId][num]||0;
 if(opt==='all'||opt==='todo'){ delete data[chatId][num]; }
 else { const n=parseInt(args.find(a=>/^d+$/.test(a))||'1',10)||1; data[chatId][num]=Math.max(0,cur-n); if(data[chatId][num]===0) delete data[chatId][num]; }
 guardar(data);
 await sock.sendMessage(chatId,{text:`✅ Warns actualizados para @${num}: *${data[chatId][num]||0}*`,mentions:[m[0]]});
}};