module.exports={name:'gitclone',alias:['git'],category:'general',desc:'Info/descarga de repo GitHub',
async execute(sock,msg,args,{chatId}){
 const q=(args[0]||'').trim(); if(!q) return sock.sendMessage(chatId,{text:'⚠️ Uso: ,gitclone <url|usuario/repo>'});
 let repo=q; const m=q.match(/github\.com\/([^\/]+\/[^\/]+)/i); if(m) repo=m[1].replace(/\.git$/,'');
 if(!repo.includes('/')) return sock.sendMessage(chatId,{text:'⚠️ Formato: usuario/repo o URL'});
 const zip='https://github.com/'+repo+'/archive/refs/heads/main.zip';
 await sock.sendMessage(chatId,{text:'📦 *Repo:* '+repo+'\nZIP (main): '+zip+'\n(Usa ,get o navegador para descargar si es necesario)'});
}};