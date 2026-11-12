const { writeJsonAtomic } = require('../../lib/json-store');
const fs = require('fs'); const path = require('path');
const FILE = path.join(process.env.HOME,'config_grupos.json');
function cargar(){try{return JSON.parse(fs.readFileSync(FILE,'utf8'))}catch{return{}}}
function guardar(d){writeJsonAtomic(FILE,d)}
module.exports = {
  name:'bot', alias:[], category:'admin', desc:'Activar o desactivar el bot en el grupo',
  async execute(sock,msg,args,{chatId,config}){
    if(!chatId.endsWith('@g.us')) return sock.sendMessage(chatId,{text:'⚠️ Solo en grupos.'});
    const d=cargar(); if(!d[chatId]) d[chatId]={};
    const op=(args[0]||'').toLowerCase();
    if(['on','activar','1'].includes(op)){ d[chatId].botActivo=true; guardar(d); return sock.sendMessage(chatId,{text:'🤖 Bot *activado* en este grupo.'}); }
    if(['off','desactivar','0'].includes(op)){ d[chatId].botActivo=false; guardar(d); return sock.sendMessage(chatId,{text:'😴 Bot *desactivado* en este grupo. Usa '+(config?.prefijo||',')+'activarbot para encenderlo.'}); }
    return sock.sendMessage(chatId,{text:`🤖 *Bot:* ${d[chatId].botActivo===false?'🔴 Off':'🟢 On'}\n\n,bot on\n,bot off`});
  }
};
