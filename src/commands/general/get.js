const http=require('http'); const https=require('https');
function fetchText(url){return new Promise((res,rej)=>{const lib=url.startsWith('https')?https:http; lib.get(url,{headers:{'User-Agent':'DARHEART'}},r=>{let d=''; r.on('data',c=>{d+=c; if(d.length>20000) r.destroy();}); r.on('end',()=>res({status:r.statusCode,headers:r.headers,body:d}));}).on('error',rej);});}
module.exports={name:'get',alias:['fetch'],category:'general',desc:'Hacer petición GET a una URL',
async execute(sock,msg,args,{chatId}){
 const url=(args[0]||'').trim(); if(!/^https?:\/\//i.test(url)) return sock.sendMessage(chatId,{text:'⚠️ Uso: ,get <url>'});
 try{ const r=await fetchText(url); const body=String(r.body||'').slice(0,3500); await sock.sendMessage(chatId,{text:`🌐 *GET ${r.status}*\n\n${body}`}); }
 catch(e){ await sock.sendMessage(chatId,{text:'❌ '+e.message}); }
}};