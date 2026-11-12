module.exports={name:'fakereply',alias:['fake','fitnah'],category:'general',desc:'Mensaje con respuesta falsa',
async execute(sock,msg,args,{chatId}){
 const m=msg.message.extendedTextMessage?.contextInfo?.mentionedJid;
 const target=(m&&m[0])||(msg.key.participant||msg.key.remoteJid);
 const text=args.filter(a=>!a.startsWith('@')).join(' ').trim()||'Mensaje falso';
 await sock.sendMessage(chatId,{text}, {quoted:{key:{remoteJid:chatId,fromMe:false,id:'FAKE'+Date.now(),participant:target},message:{conversation:text}}});
}};