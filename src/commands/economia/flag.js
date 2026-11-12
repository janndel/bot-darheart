const flags=[{e:'🇻🇪',n:'venezuela'},{e:'🇲🇽',n:'mexico'},{e:'🇦🇷',n:'argentina'},{e:'🇨🇴',n:'colombia'},{e:'🇪🇸',n:'españa'}];
module.exports={name:'flag',alias:['country'],category:'economia',desc:'Adivina el país',
async execute(sock,msg,args,{chatId}){const x=flags[Math.floor(Math.random()*flags.length)]; await sock.sendMessage(chatId,{text:'🏳️ *FLAG*\n\n'+x.e+'\n\nPaís: _'+x.n+'_'});} };