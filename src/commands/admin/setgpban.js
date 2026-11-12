const { writeJsonAtomic } = require('../../lib/json-store');
const fs=require('fs'), path=require('path');
const FILE=path.join(process.env.HOME,'config_grupos.json');
function cargar(){try{return JSON.parse(fs.readFileSync(FILE,'utf8'))}catch{return{}}}
function guardar(d){writeJsonAtomic(FILE,d)}
module.exports={name:'setgpban',alias:['setban'],category:'admin',desc:'Banear/desbanear/listar usuarios del bot en grupo',
async execute(sock,msg,args,{chatId}){
 if(!chatId.endsWith('@g.us')) return sock.sendMessage(chatId,{text:'⚠️ Solo en grupos.'});
 const d=cargar(); if(!d[chatId]) d[chatId]={}; if(!d[chatId].bans) d[chatId].bans=[];
 const sub=(args[0]||'list').toLowerCase();
 if(sub==='list'){ const list=d[chatId].bans; return sock.sendMessage(chatId,{text:list.length?('🚫 *Baneados:*\n'+list.map(x=>'• '+x).join('\n')):'✅ No hay usuarios baneados.'}); }
 if(sub==='del'||sub==='remove'||sub==='unban'){ const m=msg.message.extendedTextMessage?.contextInfo?.mentionedJid; if(!m||!m.length) return sock.sendMessage(chatId,{text:'⚠️ Menciona al usuario.'}); const n=m[0].split('@')[0]; d[chatId].bans=d[chatId].bans.filter(x=>x!==n); guardar(d); return sock.sendMessage(chatId,{text:`✅ @${n} desbaneado.`,mentions:[m[0]]}); }
 const m=msg.message.extendedTextMessage?.contextInfo?.mentionedJid; if(!m||!m.length) return sock.sendMessage(chatId,{text:'⚠️ Uso: ,setgpban @user | list | del @user'});
 const n=m[0].split('@')[0]; if(!d[chatId].bans.includes(n)) d[chatId].bans.push(n); guardar(d);
 await sock.sendMessage(chatId,{text:`🚫 @${n} baneado del bot en este grupo.`,mentions:[m[0]]});
}};