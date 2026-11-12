const { exec } = require('child_process');
const fs=require('fs'), os=require('os'), path=require('path');
module.exports={name:'bratv',alias:[],category:'stickers',desc:'Sticker/video estilo brat',
async execute(sock,msg,args,{chatId}){
 const text=args.join(' ').trim() || 'brat';
 await sock.sendMessage(chatId,{text:'🎨 Generando bratv (puede tardar)...'});
 try{
  const imgUrl='https://api.popcat.xyz/brat?text='+encodeURIComponent(text);
  const res=await fetch(imgUrl); if(!res.ok) throw new Error('API');
  const buf=Buffer.from(await res.arrayBuffer());
  const inP=path.join(os.tmpdir(),'brat_'+Date.now()+'.png');
  const outP=path.join(os.tmpdir(),'brat_'+Date.now()+'.webp');
  fs.writeFileSync(inP,buf);
  await new Promise((resolve,reject)=>exec(`ffmpeg -y -loop 1 -t 2 -i "${inP}" -vf "scale=512:512:force_original_aspect_ratio=decrease,pad=512:512:(ow-iw)/2:(oh-ih)/2:color=white,fps=10,format=yuva420p" -c:v libwebp -lossless 0 -q:v 70 -loop 0 -an "${outP}"`,(e)=>e?reject(e):resolve()));
  const st=fs.readFileSync(outP); try{fs.unlinkSync(inP);fs.unlinkSync(outP);}catch{}
  await sock.sendMessage(chatId,{sticker:st});
 }catch(e){ await sock.sendMessage(chatId,{text:'❌ No se pudo generar bratv: '+e.message}); }
}};