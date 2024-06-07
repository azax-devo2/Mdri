import { prepareWAMessageMedia, generateWAMessageFromContent, getDevice } from '@whiskeysockets/baileys'

const handler = async (m, { conn, text, usedPrefix: prefijo }) => {
    const device = await getDevice(m.key.id);

    if (device !== 'desktop' || device !== 'web') {      
        var joanimiimg = await prepareWAMessageMedia({ image: {url: 'https://telegra.ph/file/bd913368f407fd197997f.jpg'}}, { upload: conn.waUploadToServer })
        const interactiveMessage = {
            body: { text: ``.trim() },
            footer: { text: `©JoAnimi for test`.trim() },  
            header: {
                title: `* تــجــربـة الــقــايـمـه الــجـديـده *`,
                hasMediaAttachment: true,
                imageMessage: joanimiimg.imageMessage,
            },
            nativeFlowMessage: {
  						buttons: [
                       {
                "name": "single_select",
                "buttonParamsJson": "{\"title\":\"القائمه📃\",\"sections\":[{\"title\":\"قسم التخصيصات\",\"highlight_label\":\"للمطور فقط\",\"rows\":[{\"title\":\"قسم #التحكم\",\"description\":\"اســتـدعاء قـسـم #للمطور
\",\"id\":\".التحكم\"},{\"title\":\"قـسـم #الـجـروب\",\"description\":\"اسـتـدعـاء قـسم #للمشرف\",\"id\":\".مشرف\"}]}]}"
                       },
                       {
                "name": "quick_reply",
                "buttonParamsJson": "{\"display_text\":\"الــمـطـور🧑🏻‍💻\",\"id\":\".المطور\"}"
                        },
                        {
                 "name": "cta_url",
                 "buttonParamsJson": "{\"display_text\":\"قـناة البوت🎊\",\"url\":\"https://whatsapp.com/channel/0029Vab5oDNElagpHtJjmT0B\",\"merchant_url\":\"\"}"
                        }
  			  		],
                messageParamsJson: ''
            }
        };        

        let msg = generateWAMessageFromContent(m.chat, {
            viewOnceMessage: {
                message: {
                    interactiveMessage,
                },
            },
        }, { userJid: conn.user.jid, quoted: m })
        conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id});

    } else {
        conn.sendFile(m.chat, 'error.jpg', m);      
    }    
};
handler.help = ['اوامر'];
handler.tags = ['ازرار'];
handler.command = /^(اوامر)$/i;
export default handler;
