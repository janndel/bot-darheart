const fs=require('fs'), path=require('path');
const FILE=path.join(process.env.HOME,'perfiles.json');
function load(){try{return JSON.parse(fs.readFileSync(FILE,'utf8'))}catch{return{}}}
module.exports={name:'birthdays',alias:['births','cumpleaños'],category:'perfil',desc:'Ver cumpleaños cercanos',
async execute(sock,msg,args,{chatId}){
 const d=load(); const list=Object.entries(d).filter(([,v])=>v&&v.birth).map(([n,v])=>({n,b:v.birth}));
 if(!list.length) return sock.sendMessage(chatId,{text:'🎂 No hay cumpleaños registrados.'});
 await sock.sendMessage(chatId,{text:'🎂 *Cumpleaños*\n\n'+list.slice(0,20).map(x=>'• @'+x.n+' — '+x.b).join('\n'),mentions:list.slice(0,20).map(x=>x.n+'@s.whatsapp.net')});
}};