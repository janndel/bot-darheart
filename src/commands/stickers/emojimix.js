module.exports={name:'emojimix',alias:[],category:'stickers',desc:'Mezclar dos emojis en sticker',
async execute(sock,msg,args,{chatId}){
 if(args.length<2) return sock.sendMessage(chatId,{text:'⚠️ Uso: ,emojimix 😂 😎'});
 const [a,b]=args; const url=`https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(a+'_'+b)}`;
 try{
  const r=await fetch(url); const j=await r.json(); const u=j?.results?.[0]?.media_formats?.png_transparent?.url;
  if(!u) return sock.sendMessage(chatId,{text:'❌ No se pudo mezclar esos emojis.'});
  const img=Buffer.from(await (await fetch(u)).arrayBuffer());
  await sock.sendMessage(chatId,{sticker:img});
 }catch(e){ await sock.sendMessage(chatId,{text:'❌ '+e.message}); }
}};