const https=require('https');
function get(url){return new Promise((res,rej)=>https.get(url,{headers:{'User-Agent':'DARHEART'}},r=>{let d='';r.on('data',c=>d+=c);r.on('end',()=>res({status:r.statusCode,data:d}))}).on('error',rej));}
module.exports={name:'apk',alias:['aptoide','apkdl'],category:'descargas',desc:'Buscar APK en Aptoide',
async execute(sock,msg,args,{chatId}){
 const q=args.join(' ').trim(); if(!q) return sock.sendMessage(chatId,{text:'⚠️ Uso: ,apk <nombre app>'});
 try{
  const r=await get('https://ws75.aptoide.com/api/7/apps/search?query='+encodeURIComponent(q)+'&limit=5');
  const j=JSON.parse(r.data); const list=j?.datalist?.list||[];
  if(!list.length) return sock.sendMessage(chatId,{text:'❌ No encontré resultados.'});
  const txt=list.map((a,i)=>`${i+1}. *${a.name}* (${a.package||''})\n⭐ ${a.stats?.rating?.avg||'N/A'} | ⬇️ ${a.stats?.downloads||0}\n🔗 ${a.file?.path||a.store?.name||''}`).join('\n\n');
  await sock.sendMessage(chatId,{text:`📦 *Resultados Aptoide*\n\n${txt}`});
 }catch(e){ await sock.sendMessage(chatId,{text:'❌ No se pudo buscar: '+e.message}); }
}};