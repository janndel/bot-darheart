module.exports={name:'gifs',alias:['gif'],category:'general',desc:'Buscar GIFs',
async execute(sock,msg,args,{chatId}){
 const q=args.join(' ').trim()||'funny'; const url='https://tenor.googleapis.com/v2/search?q='+encodeURIComponent(q)+'&key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&limit=1';
 try{const r=await fetch(url); const j=await r.json(); const u=j?.results?.[0]?.media_formats?.gif?.url; if(u) return sock.sendMessage(chatId,{video:{url:u},gifPlayback:true,caption:'GIF: '+q});}catch(e){}
 await sock.sendMessage(chatId,{text:'❌ No encontré GIFs.'});
}};