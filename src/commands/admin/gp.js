module.exports = {
  name:'gp', alias:['groupinfo'], category:'admin', desc:'Ver información del grupo',
  async execute(sock,msg,args,{chatId}){
    if(!chatId.endsWith('@g.us')) return sock.sendMessage(chatId,{text:'⚠️ Solo en grupos.'});
    try{
      const meta = await sock.groupMetadata(chatId);
      const admins = meta.participants.filter(p=>p.admin).length;
      const txt = `📋 *INFO DEL GRUPO*\n\n`+
        `🏷️ Nombre: *${meta.subject}*\n`+
        `🆔 ID: ${chatId}\n`+
        `👥 Miembros: *${meta.participants.length}*\n`+
        `🛡️ Admins: *${admins}*\n`+
        `📝 Desc: ${meta.desc?.toString()?.slice(0,300) || 'Sin descripción'}`;
      await sock.sendMessage(chatId,{text:txt});
    }catch(e){ await sock.sendMessage(chatId,{text:`❌ ${e.message}`}); }
  }
};
