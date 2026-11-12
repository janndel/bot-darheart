const eco=require('../../lib/eco');
const qs=[{q:'¿Capital de Francia?',a:'paris'},{q:'¿2+2*2?',a:'6'},{q:'¿Planeta rojo?',a:'marte'}];
module.exports={name:'trivia',alias:[],category:'economia',desc:'Pregunta de trivia',
async execute(sock,msg,args,{chatId}){const x=qs[Math.floor(Math.random()*qs.length)]; await sock.sendMessage(chatId,{text:'❓ *TRIVIA*\n\n'+x.q+'\n\nRespuesta: _'+x.a+'_'});} };