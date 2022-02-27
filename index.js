import {Telegraf} from 'telegraf';
import axios from 'axios';
//import  { Readable } from 'stream';
//use fs readstream

const bot = new Telegraf('APIKEY')

bot.start((x)=>x.reply('welcome'));
bot.on('message', (x)=>{
    axios.get(x.update.message.text, { responseType: 'arraybuffer'})
    .then(res=>{
        const buffer = Buffer.from(res.data, "utf-8")
        //const stream = Readable.from(buffer);
        x.replyWithVideo({source:buffer})
        .catch((e)=>{
            console.log(e)
            console.log("\nerror with sending")
            x.reply("error in sending")
        })     

    })
    .catch((e)=>{
        console.log(e)
        console.log("\nerror with fetching\n")
        x.reply("error in downloading")
    })
})

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))