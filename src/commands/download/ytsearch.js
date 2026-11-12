const { spawn } = require('child_process');
function getYtdlp(){ const p=require('path').join(process.cwd(),'yt-dlp'); return require('fs').existsSync(p)?'./yt-dlp':'yt-dlp'; }
module.exports={name:'ytsearch',alias:['search','yts'],category:'descargas',desc:'Buscar videos en YouTube',
async execute(sock,msg,args,{chatId}){
 const q=args.join(' ').trim(); if(!q) return sock.sendMessage(chatId,{text:'⚠️ Uso: ,ytsearch <búsqueda>'});
 await sock.sendMessage(chatId,{text:'🔎 Buscando en YouTube...'});
 const proc=spawn(getYtdlp(),['ytsearch10:'+q,'--print','%(title)s||%(webpage_url)s||%(duration_string)s','--skip-download'],{stdio:['ignore','pipe','pipe']});
 let out=''; proc.stdout.on('data',d=>out+=d.toString());
 proc.on('close', async ()=>{
  const lines=out.split('\n').map(l=>l.trim()).filter(Boolean).slice(0,10);
  if(!lines.length) return sock.sendMessage(chatId,{text:'❌ Sin resultados.'});
  const txt=lines.map((l,i)=>{const [t,u,d]=l.split('||'); return `${i+1}. *${t||'Video'}*\n⏱️ ${d||'?'}\n🔗 ${u||''}`;}).join('\n\n');
  await sock.sendMessage(chatId,{text:`🎬 *Resultados YouTube*\n\n${txt}`});
 });
}};
