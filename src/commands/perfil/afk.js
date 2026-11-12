const fs=require('fs'), path=require('path'); const {writeJsonAtomic}=require('../../lib/json-store');
const FILE=path.join(process.env.HOME,'afk.json');
function load(){try{return JSON.parse(fs.readFileSync(FILE,'utf8'))}catch{return{}}}
function save(d){writeJsonAtomic(FILE,d)}
module.exports={name:'afk',alias:[],category:'perfil',desc:'Activar modo AFK',
async execute(sock,msg,args,{chatId}){
 const sender=msg.key.participant||msg.key.remoteJid; const num=String(sender).split('@')[0].split(':')[0];
 const reason=args.join(' ').trim()||'Sin motivo'; const d=load(); d[num]={since:Date.now(),reason}; save(d);
 await sock.sendMessage(chatId,{text:`😴 @${num} ahora está AFK.\nMotivo: ${reason}`,mentions:[sender]});
}};