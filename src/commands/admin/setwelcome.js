const { writeJsonAtomic } = require('../../lib/json-store');
const fs = require('fs'); const path = require('path');
const FILE = path.join(process.env.HOME,'config_grupos.json');
function cargar(){try{return JSON.parse(fs.readFileSync(FILE,'utf8'))}catch{return{}}}
function guardar(d){writeJsonAtomic(FILE,d)}
module.exports = {
  name:'setwelcome', alias:[], category:'admin', desc:'Establecer mensaje de bienvenida personalizado',
  async execute(sock,msg,args,{chatId}){
    if(!chatId.endsWith('@g.us')) return sock.sendMessage(chatId,{text:'⚠️ Solo en grupos.'});
    const d=cargar(); if(!d[chatId]) d[chatId]={};
    if(!args.length){ const a=d[chatId].bienvenida||'_No configurada_'; return sock.sendMessage(chatId,{text:`👋 *Bienvenida actual:*\n\n${a}\n\nUso: ,setwelcome ¡Hola {user}! Bienvenido a {grupo}\n,setwelcome off`}); }
    const t=args.join(' ');
    if(t.toLowerCase()==='off'){ delete d[chatId].bienvenida; guardar(d); return sock.sendMessage(chatId,{text:'🔕 Bienvenida desactivada.'}); }
    d[chatId].bienvenida=t; guardar(d);
    await sock.sendMessage(chatId,{text:`✅ Bienvenida configurada:\n\n${t}`});
  }
};
