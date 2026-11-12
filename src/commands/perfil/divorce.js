const fs=require('fs'), path=require('path'); const {writeJsonAtomic}=require('../../lib/json-store');
const FILE=path.join(process.env.HOME,'perfiles.json');
function load(){try{return JSON.parse(fs.readFileSync(FILE,'utf8'))}catch{return{}}}
function save(d){writeJsonAtomic(FILE,d)}
module.exports={name:'divorce',alias:[],category:'perfil',desc:'Divorciarte',
async execute(sock,msg,args,{chatId}){
 const a=msg.key.participant||msg.key.remoteJid; const na=String(a).split('@')[0].split(':')[0];
 const d=load(); const nb=d[na]?.partner; if(nb && d[nb]) delete d[nb].partner; if(d[na]) delete d[na].partner; save(d);
 await sock.sendMessage(chatId,{text:`💔 @${na} ahora está soltero/a.`,mentions:[a]});
}};