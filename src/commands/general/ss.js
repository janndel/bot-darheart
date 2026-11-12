module.exports={name:'ss',alias:['screenshot','web'],category:'general',desc:'Captura de página web',
async execute(sock,msg,args,{chatId}){
 let url=(args[0]||'').trim(); if(!url) return sock.sendMessage(chatId,{text:'⚠️ Uso: ,ss <url>'});
 if(!/^https?:\/\//i.test(url)) url='https://'+url;
 const img='https://image.thum.io/get/width/1280/crop/720/noanimate/'+url;
 try{ await sock.sendMessage(chatId,{image:{url:img},caption:'🖼️ '+url}); }
 catch(e){ await sock.sendMessage(chatId,{text:'❌ No se pudo capturar: '+e.message}); }
}};