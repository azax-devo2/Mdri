import axios from 'axios';
import { prepareWAMessageMedia, generateWAMessageFromContent } from '@whiskeysockets/baileys';

const handler = async (m, { command, conn, usedPrefix }) => {
  if (command === 'صور') {
    // قائمة الأوامر
    const commands = ['akira', 'akiyama', 'anna', 'asuna', 'ayuzawa', 'boruto', 'chiho', 'chitoge', 'deidara', 'erza', 'elaina', 'eba', 'emilia', 'hestia', 'hinata', 'inori', 'isuzu', 'itachi', 'itori', 'kaga', 'kagura', 'kaori', 'keneki', 'kotori', 'kurumi', 'madara', 'mikasa', 'miku', 'minato', 'naruto', 'nezuko', 'sagiri', 'sasuke', 'sakura', 'cosplay'];

    // جلب صورة عشوائية من ملف JSON خاص بالأوامر (اختياري)
    const res = (await axios.get(`https://raw.githubusercontent.com/BrunoSobrino/TheMystic-Bot-MD/master/src/JSON/anime-akira.json`)).data;
    const imageUrl = 'https://telegra.ph/file/805fadfce8e59b62ae7e6.jpg';

    // إعداد الوسائط
    const media = await prepareWAMessageMedia({ image: { url: imageUrl } }, { upload: conn.waUploadToServer });

    // إنشاء الزر باستخدام single_select
    const buttons = [{
      "name": "single_select",
      "buttonParamsJson": JSON.stringify({
        title: 'اختر الشخصية',
        sections: [
          {
            title: 'قائمة الشخصيات',
            highlight_label: 'ON',
            rows: commands.map(command => ({
              title: command,
              id: `${usedPrefix + command}`
            }))
          }
        ]
      })
    }, {
      name: 'cta_url',
      buttonParamsJson: JSON.stringify({
          display_text: 'url',
          url: 'https://www.google.com',
          merchant_url: ''
      })
    }];

    const interactiveMessage = {
      body: { text: `اختر أحد الأوامر للحصول على صورة:`.trim() },
      footer: { text: `©By Azax`.trim() },
      header: {
        title: `*قائمة الأوامر*`,
        subtitle: ``,
        hasMediaAttachment: true,
        imageMessage: media.imageMessage,
      },
      nativeFlowMessage: {
        buttons,
        messageParamsJson: ''
      }
    };

    let msg = generateWAMessageFromContent(m.chat, {
      viewOnceMessage: {
        message: {
          interactiveMessage,
        },
      },
    }, { userJid: conn.user.jid, quoted: m });

    conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });
  } else {
    const res = (await axios.get(`https://raw.githubusercontent.com/BrunoSobrino/TheMystic-Bot-MD/master/src/JSON/anime-${command}.json`)).data;
    const imageUrl = await res[Math.floor(res.length * Math.random())];

    const media = await prepareWAMessageMedia({ image: { url: imageUrl } }, { upload: conn.waUploadToServer });

    const buttons = [{
      "name": "single_select",
      "buttonParamsJson": JSON.stringify({
        title: 'Click Me',
        sections: [
          {
            title: 'List',
            highlight_label: 'ON',
            rows: [
              {
                header: 'By Azax',
                title: 'المزيد من الصور',
                description: 'مزيد من الصور من نفس الشخصية',
                id: `${usedPrefix + command}`
              }
            ]
          }
        ]
      })
    }, {
      name: 'cta_url',
      buttonParamsJson: JSON.stringify({
          display_text: 'url',
          url: 'https://whatsapp.com/channel/0029Vag9bvrLSmbRE2I5Oj2h',
          merchant_url: ''
      })
    }];

    const interactiveMessage = {
      body: { text: `_${command}_`.trim() },
      footer: { text: `©By Azax`.trim() },
      header: {
        title: `*_${command}_*`,
        subtitle: ``,
        hasMediaAttachment: true,
        imageMessage: media.imageMessage,
      },
      nativeFlowMessage: {
        buttons,
        messageParamsJson: ''
      }
    };

    let msg = generateWAMessageFromContent(m.chat, {
      viewOnceMessage: {
        message: {
          interactiveMessage,
        },
      },
    }, { userJid: conn.user.jid, quoted: m });

    conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });
  }
};

handler.command = handler.help = ['akira', 'akiyama', 'anna', 'asuna', 'ayuzawa', 'boruto', 'chiho', 'chitoge', 'deidara', 'erza', 'elaina', 'eba', 'emilia', 'hestia', 'hinata', 'inori', 'isuzu', 'itachi', 'itori', 'kaga', 'kagura', 'kaori', 'keneki', 'kotori', 'kurumi', 'madara', 'mikasa', 'miku', 'minato', 'naruto', 'nezuko', 'sagiri', 'sasuke', 'sakura', 'cosplay', 'صور'];
handler.tags = ['anime'];
export default handler;
