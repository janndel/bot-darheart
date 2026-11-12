const fs=require('fs'), path=require('path'); const {writeJsonAtomic}=require('./json-store');
const FILE=path.join(process.env.HOME,'gacha.json');
function load(){try{const d=JSON.parse(fs.readFileSync(FILE,'utf8')); return Object.assign({users:{},claims:{},market:{}}, d);}catch{return{users:{},claims:{},market:{}}}}
function save(d){writeJsonAtomic(FILE,d)}
const pool=['Aqua','Rem','Megumin','Zero Two','Asuna','Mikasa','Hinata','Nezuko','Power','Makima','Marin','Yor','Frieren','Rias','Albedo','Nami','Robin','Emilia','Kurumi','Mai'];
function rand(arr){return arr[Math.floor(Math.random()*arr.length)]}
module.exports={FILE,load,save,pool,rand};
