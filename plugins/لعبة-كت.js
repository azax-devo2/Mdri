import axios from 'axios';

let timeout = 60000;
let poin = 500;

let handler = async (m, { conn, usedPrefix }) => {
    conn.tekateki = conn.tekateki ? conn.tekateki : {};
    let id = m.chat;
    if (id in conn.tekateki) {
        conn.reply(m.chat, '❐┃لم يتم الاجابة علي السؤال بعد┃❌ ❯', conn.tekateki[id][0]);
        throw false;
    }

    // URL لملف Gist الذي يحتوي على الأسئلة
    let gistUrl = 'https://gist.githubusercontent.com/SHIKA7777/0ab0125c236e5ae76a481621a037d00a/raw/d78fee483ef2f4b23e26d23af8b444c072f383a8/gistfile1.txt';

    try {
        let response = await axios.get(gistUrl);
        let tekateki = response.data;
        let json = tekateki[Math.floor(Math.random() * tekateki.length)];
        let _clue = json.response;
        let clue = _clue.replace(/[A-Za-z]/g, '_');
        let caption = `
ⷮ *${json.question}*

*الـوقـت⏳↞ ${(timeout / 1000).toFixed(2)}*
*الـجـائـزة💰↞ ${poin} نقاط*
*KANEKI BOT*
`.trim();
        let image = 'https://telegra.ph/file/f5c021416da60ccd37f00.jpg'; // رابط الصورة الجديدة
        conn.tekateki[id] = [
            await conn.sendFile(m.chat, image, 'image.jpg', caption, m),
            json, poin,
            setTimeout(async () => {
                if (conn.tekateki[id]) await conn.reply(m.chat, `*⌛انتهي الوقت⌛*\n *الاجـابـة✅ ${json.response}*`, conn.tekateki[id][0]);
                delete conn.tekateki[id];
            }, timeout)
        ];
    } catch (error) {
        console.error('Error fetching Gist data:', error);
        conn.reply(m.chat, '❐┃حدث خطأ أثناء جلب الأسئلة من الملف┃❌', m);
    }
};

handler.help = ['acertijo'];
handler.tags = ['game'];
handler.command = /^(كت)$/i;

export default handler;
