const eco=require('../../lib/eco');
const qs=[{q:'Blanca por dentro, verde por fuera. Si quieres que te lo diga, espera.',a:'pera'},{q:'Oro parece, plata no es. ¿Qué es?',a:'platano'},{q:'Tiene agujas pero no cose.',a:'reloj'}];
module.exports={name:'acertijo',alias:['riddle','adivinanza'],category:'economia',desc:'Adivina un acertijo',
async execute(sock,msg,args,{chatId}){const x=qs[Math.floor(Math.random()*qs.length)]; await sock.sendMessage(chatId,{text:'🧩 *ACERTIJO*\n\n'+x.q+'\n\n(Responde con: ,say '+x.a+' para practicar / respuesta: _'+x.a+'_ )'});} };