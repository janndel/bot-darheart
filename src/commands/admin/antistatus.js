const { writeJsonAtomic } = require('../../lib/json-store');
const fs = require('fs'); const path = require('path');
const FILE = path.join(process.env.HOME,'config_grupos.json');
function cargar(){try{return JSON.parse(fs.readFileSync(FILE,'utf8'))}catch{return{}}}
function guardar(d){writeJsonAtomic(FILE,d)}
module.exports = {
  name:'antistatus', alias:['antiestados'], category:'admin', desc:'Activar o desactivar anti-estados',
  async execute(sock,msg,args,{chatId}){
    if(!chatId.endsWith('@g.us')) return sock.sendMessage(chatId,{text:'⚠️ Solo en grupos.'});
    const d=cargar(); if(!d[chatId]) d[chatId]={};
    const op=(args[0]||'').toLowerCase();
    if(['on','activar','1'].includes(op)){ d[chatId].antistatus=true; guardar(d); return sock.sendMessage(chatId,{text:'🛡️ Anti-estados *activado*.'}); }
    if(['off','desactivar','0'].includes(op)){ d[chatId].antistatus=false; guardar(d); return sock.sendMessage(chatId,{text:'🔓 Anti-estados *desactivado*.'}); }
    return sock.sendMessage(chatId,{text:`🛡️ *Antistatus:* ${d[chatId].antistatus?'🟢 On':'🔴 Off'}\n\n,antistatus on\n,antistatus off`});
  }
};
