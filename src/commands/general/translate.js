const https=require('https');
function get(url){return new Promise((res,rej)=>https.get(url,{headers:{'User-Agent':'DARHEART'}},r=>{let d='';r.on('data',c=>d+=c);r.on('end',()=>res(d))}).on('error',rej));}
module.exports={name:'translate',alias:['trad','traducir'],category:'general',desc:'Traducir texto',
async execute(sock,msg,args,{chatId}){
 if(args.length<2) return sock.sendMessage(chatId,{text:'⚠️ Uso: ,translate <idioma> <texto>\nEj: ,translate en hola mundo'});
 const lang=args.shift(); const text=args.join(' ');
 try{
  const url='https://api.mymemory.translated.net/get?q='+encodeURIComponent(text)+'&langpair=auto|'+encodeURIComponent(lang);
  const j=JSON.parse(await get(url));
  const t=j?.responseData?.translatedText || 'Sin resultado';
  await sock.sendMessage(chatId,{text:`🌐 *Traducción (${lang})*\n\n${t}`});
 }catch(e){ await sock.sendMessage(chatId,{text:'❌ '+e.message}); }
}};