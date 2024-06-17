

const { smd, Config,smdBuffer,  prefix } = require('../lib')


var surl = 'https://github.com/MrMasterOfc/MASTER-MD-V2' // Source URL
const number = '94720797915'
var name = ' MASTER MIND'
var body = '𝑇𝛩𝑈𝐶𝛨 𝛨𝛯𝑅𝛯'
var image = 'https://telegra.ph/file/2368f1b5d6ff724ae0c51.jpg'
let text = `╭═══ ━ ━ ━ ━ • ━ ━ ━ ━ ═══♡᭄
│       「 MASTER MIND INFO  」
│ Name      : Sahan 
│ Place       : Asia/Colombo
│ Gender    :  Male
│ Age          : 18
│ education : Central 
│ Phone     : wa.me/94720797915
│ Youtube   : youtube.com/@sahanmaduwantha2006
│ GitHub    : https://github.com/MrMasterOfc 

╰═══ ━ ━ ━ ━ • ━ ━ ━ ━ ═══♡᭄`





 //---------------------------------------------------------------------------
 smd({
             pattern: "intro",
             alias: ["sahan","badar"],
             desc: "Show intro of user",
             category: "fun",
             filename: __filename,
             use: '<group link.>',
         },
         async(message) => {
    try{
          let media ;try{ media = await smdBuffer(image) }catch{media = log0}
           const q =await message.bot.fakeMessage("contact",{},name) 
           let contextInfo = {...(await message.bot.contextInfo(name,body,media,1,surl, 2) )}
           await message.send(text, {contextInfo : contextInfo },"suhail",  q )
    }catch(e){ await message.error(`${e}\n\ncommand: intro`,e,false)}


 })
