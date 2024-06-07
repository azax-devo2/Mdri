import { prepareWAMessageMedia, generateWAMessageFromContent, getDevice } from '@whiskeysockets/baileys'

const handler = async (m, { conn, text, usedPrefix: prefijo }) => {
    const device = await getDevice(m.key.id);
    const mentionId = m.key.participant || m.key.remoteJid;

    if (device !== 'desktop' || device !== 'web') {      
        var joanimiimg = await prepareWAMessageMedia({ image: {url: 'https://telegra.ph/file/6f891a7d95ebda85c819b.jpg'}}, { upload: conn.waUploadToServer })
        const interactiveMessage = {
            body: { text: `@${mentionId.split('@')[0]} طلب القائمة`.trim() },
            footer: { text: `©deadpool by Azax`.trim() },  
            header: {
                title: `* تــجــربـة الــقــايـمـه الــجـديـده *`,
                hasMediaAttachment: true,
                imageMessage: joanimiimg.imageMessage,
            },
            nativeFlowMessage: {
                buttons: [
                    {
                        name: 'single_select',
                        buttonParamsJson: JSON.stringify({
                            title: 'القائمه📃',
                            sections: [
                                {
                                    title: 'قسم التخصيصات',
                                    highlight_label: '',
                                    rows: [
                                        {
                                            header: '',
                                            title: 'قسم #التحكم',
                                            description: 'اســتـدعاء قـسـم #للمطور',
                                            id: 'التحكم'
                                        }
                                    ]
                                },
                                {
                                    highlight_label: 'للمشرف فقط',
                                    rows: [
                                        {
                                            header: '',
                                            title: 'قـسـم #الـجـروب',
                                            description: 'اسـتـدعـاء قـسم #للمشرف',
                                            id: '.مشرف'
                                        }
                                    ]
                                },
                                {
                                    highlight_label: 'ON',
                                    rows: [
                                        {
                                            header: 'Test',
                                            title: 'Click Me',
                                            description: 'Click Me',
                                            id: 'te'
                                        }
                                    ]
                                }
                            ]
                        })
                    },
                    {
                        "name": "cta_reminder",
                        "buttonParamsJson": "{\"display_text\":\"ضبط التذكير\",\"id\":\"ذكرني في الوقت :\"}"
                    },
                    {
                        "name": "cta_call",
                        "buttonParamsJson": "{\"display_text\":\"اتصل بالمطور🙂‍↕\",\"id\":\"+212والرقم\"}"
                    },
                    {
                        "name": "cta_url",
                        "buttonParamsJson": "{\"display_text\":\"قـناة البوت\",\"url\":\"الرابط\",\"merchant_url\":\"\"}"
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
        msg.message.viewOnceMessage.message.interactiveMessage.contextInfo = { mentionedJid: [mentionId] };
        conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });

    } else {
        conn.sendFile(m.chat, 'JoAnimi•Error.jpg', m);      
    }    
};
handler.help = ['اوامر'];
handler.tags = ['ازرار'];
handler.command = ['اوامر'];
export default handler;
