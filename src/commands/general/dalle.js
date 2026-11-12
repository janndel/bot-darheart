module.exports={name:'dalle',alias:['bard'],category:'general',desc:'Generar imagen (API pública)',
async execute(sock,msg,args,{chatId}){
 const prompt=args.join(' ').trim(); if(!prompt) return sock.sendMessage(chatId,{text:'⚠️ Uso: ,dalle <texto>'});
 const url='https://image.pollinations.ai/prompt/'+encodeURIComponent(prompt);
 try{await sock.sendMessage(chatId,{image:{url},caption:'🖼️ '+prompt});}catch(e){await sock.sendMessage(chatId,{text:'❌ '+e.message});}
}};