const { writeJsonAtomic } = require('../../lib/json-store');
const fs = require('fs'); const path = require('path');
const FILE = path.join(process.env.HOME,'config_grupos.json');
function cargar(){try{return JSON.parse(fs.readFileSync(FILE,'utf8'))}catch{return{}}}
function guardar(d){writeJsonAtomic(FILE,d)}
module.exports = {
  name:'economy', alias:['economia'], category:'admin', desc:'Activar o desactivar comandos de economía',
  async execute(sock,msg,args,{chatId}){
    if(!chatId.endsWith('@g.us')) return sock.sendMessage(chatId,{text:'⚠️ Solo en grupos.'});
    const d=cargar(); if(!d[chatId]) d[chatId]={};
    const op=(args[0]||'').toLowerCase();
    if(['on','activar','1'].includes(op)){ d[chatId].economy=true; guardar(d); return sock.sendMessage(chatId,{text:'💰 Economía *activada*.'}); }
    if(['off','desactivar','0'].includes(op)){ d[chatId].economy=false; guardar(d); return sock.sendMessage(chatId,{text:'💰 Economía *desactivada*.'}); }
    return sock.sendMessage(chatId,{text:`💰 *Economy:* ${d[chatId].economy===false?'🔴 Off':'🟢 On'}\n\n,economy on\n,economy off`});
  }
};
