const PastebinAPI = require('pastebin-js');
const pastebin = new PastebinAPI('EMWTMkQAVfJa9kM-MRUrxd5Oku1U7pgL');
const { makeid } = require('./id');
const express = require('express');
const fs = require('fs');
let router = express.Router();
const pino = require('pino');
const {
    default: Toxic_Tech,
    useMultiFileAuthState,
    delay,
    makeCacheableSignalKeyStore,
    Browsers
} = require('baileys-pro');

function removeFile(FilePath) {
    if (!fs.existsSync(FilePath)) return false;
    fs.rmSync(FilePath, { recursive: true, force: true });
}

router.get('/', async (req, res) => {
    const id = makeid();
    let num = req.query.number;
    
    async function Toxic_MD_PAIR_CODE() {
        const { state, saveCreds } = await useMultiFileAuthState('./temp/' + id);
        try {
            let Pair_Code_By_Toxic_Tech = Toxic_Tech({
                auth: {
                    creds: state.creds,
                    keys: makeCacheableSignalKeyStore(state.keys, pino({ level: 'fatal' }).child({ level: 'fatal' })),
                },
                printQRInTerminal: false,
                logger: pino({ level: 'fatal' }).child({ level: 'fatal' }),
                browser: Browsers.macOS('Chrome')
            });

            if (!Pair_Code_By_Toxic_Tech.authState.creds.registered) {
                await delay(1500);
                num = num.replace(/[^0-9]/g, '');
                const code = await Pair_Code_By_Toxic_Tech.requestPairingCode(num);
                if (!res.headersSent) {
                    await res.send({ code });
                }
            }

            Pair_Code_By_Toxic_Tech.ev.on('creds.update', saveCreds);
            Pair_Code_By_Toxic_Tech.ev.on('connection.update', async (s) => {
                const { connection, lastDisconnect } = s;
                if (connection === 'open') {
                   
                    await Pair_Code_By_Toxic_Tech.sendMessage(Pair_Code_By_Toxic_Tech.user.id, { text: `
╭┈┈┈┈┈┈┈┈┈┈┈┈•⁠•⁠•⁠
│๑⁠ Hello! 👋 Wakanda is connecting.

│๑⁠ Please wait a moment while we generate your session ID. It will be sent shortly... 
╰┈┈┈┈┈┈┈┈┈┈┈┈•⁠•⁠•⁠
` });
                    await delay(50000);
                    let data = fs.readFileSync(__dirname + `/temp/${id}/creds.json`);
                    await delay(8000);
                    let b64data = Buffer.from(data).toString('base64');
                    let session = await Pair_Code_By_Toxic_Tech.sendMessage(Pair_Code_By_Toxic_Tech.user.id, { text: 'Wakanda-Bot~' + b64data });

                    let Toxic_MD_TEXT = `
          
      WAKANDA DEVICE IS CONNECTED
╭┈┈┈┈┈┈┈┈┈┈┈┈┈┈•⁠•⁠•⁠
│๑⁠ The long code above is your **Session ID**. Please copy and store it safely, as you'll need it to deploy your Wakanda bot! 🔐
│๑⁠ If you're deployer to deploy Wakanda copy you session ID above then open Wakanda repo and paste it on session.json file then deploy on Vercel, Render, Host Panel, Koyeb, Replit, Railway. NOTE: this wakanda bot made by FrediEzra is allowed host on all panels you know.



│๑⁠ Need help? Reach out to us:

『••• Visit For Help •••』
> Owner:
 _https://wa.me/255752593977
 
> WaChannel:
 https://whatsapp.com/channel/0029VaihcQv84Om8LP59fO3f_

> Explore more in Website:
 _https://fredi-ai-site.vercel.app_
 
 > BotRepo: _https://github.com/mr-X-force/wakanda-bot_
 
│๑⁠ Don't forget to give a ⭐ to our repo and fork it to stay updated! :)
╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈•⁠•⁠•⁠`;

                    await Pair_Code_By_Toxic_Tech.sendMessage(Pair_Code_By_Toxic_Tech.user.id, { text: Toxic_MD_TEXT }, { quoted: session });

                    await delay(100);
                    await Pair_Code_By_Toxic_Tech.ws.close();
                    return await removeFile('./temp/' + id);
                } else if (connection === 'close' && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
                    await delay(10000);
                    Toxic_MD_PAIR_CODE();
                }
            });
        } catch (err) {
            console.log('Service restarted');
            await removeFile('./temp/' + id);
            if (!res.headersSent) {
                await res.send({ code: 'Service Currently Unavailable' });
            }
        }
    }
    
    return await Toxic_MD_PAIR_CODE();
});

module.exports = router;
