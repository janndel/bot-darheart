const https=require('https');
function get(url){return new Promise((res,rej)=>https.get(url,{headers:{'User-Agent':'DARHEART'}},r=>{let d='';r.on('data',c=>d+=c);r.on('end',()=>res(d))}).on('error',rej));}
module.exports={name:'wiki',alias:['wikipedia'],category:'general',desc:'Buscar en Wikipedia',
async execute(sock,msg,args,{chatId}){
 const q=args.join(' ').trim(); if(!q) return sock.sendMessage(chatId,{text:'⚠️ Uso: ,wiki <consulta>'});
 try{
  const s=await get('https://es.wikipedia.org/api/rest_v1/page/summary/'+encodeURIComponent(q));
  const j=JSON.parse(s);
  if(j.type==='disambiguation' || j.extract==null) return sock.sendMessage(chatId,{text:'❌ No encontré un resultado claro.'});
  const txt=`📚 *${j.title}*\n\n${j.extract}\n\n🔗 ${j.content_urls?.desktop?.page||''}`;
  if(j.thumbnail?.source){ try{ return await sock.sendMessage(chatId,{image:{url:j.thumbnail.source},caption:txt}); }catch{} }
  await sock.sendMessage(chatId,{text:txt});
 }catch(e){ await sock.sendMessage(chatId,{text:'❌ '+e.message}); }
}};