import fetch from 'node-fetch';
import axios from 'axios';
const timeout = 60000;
const poin = 1000;
const handler = async (m, {conn, usedPrefix}) => {
  conn.tebaklaguo = conn.tebaklaguo ? conn.tebaklaguo : {};
  const id = m.chat;
  if (id in conn.tebaklaguo) {
    conn.reply(m.chat, '*هناك سؤال قائم💫*', conn.tebaklaguo[id][0]);
    throw false;
  } // 5LTV57azwaid7dXfz5fzJu
  const res = await fetchJson(`https://gist.githubusercontent.com/Stark197/e6eb5b13b875f2178cc6b6a5c18ee9ac/raw/7e4d026b19799908d3aaf1d728b1d23634999d48/gistfile1.txt`);
  const json = res[Math.floor(Math.random() * res.length)];
  const caption = `*~⊹‏⊱≼━━━⌬〔📜〕⌬━━━≽⊰⊹~*\n*صوت من ؟؟*\n
  *☬↫╎السـؤال ✍🏻⇜『اعرف الشخصية من صوتها』*
  *ا☬↫╎الـوقـت⏱️↫*${(timeout / 1000).toFixed(2)}* *ثانية*
   *☬↫╎الـجـائزة🪙↫* *${poin}* *خبرة*
   *☬↫╎مـلاحظة⚠️قم برد على هذه الرسالة عند الاجابة』*
*~⊹‏⊱≼━━━⌬〔📜〕⌬━━━≽⊰⊹~*`.trim();
  conn.tebaklaguo[id] = [
    await m.reply(caption),
    json, poin,
    setTimeout(() => {
      if (conn.tebaklaguo[id]) conn.reply(m.chat, `*~⊹‏⊱≼━━━⌬〔📜〕⌬━━━≽⊰⊹~*\n*انتهى الوقت🧭*\n*الجواب الصحيح هو :* *( ${json.jawaban} )*\n*~⊹‏⊱≼━━━⌬〔📜〕⌬━━━≽⊰⊹~*`, conn.tebaklaguo[id][0]);
      delete conn.tebaklaguo[id];
    }, timeout),
  ];
  const isAudioReply = m.quoted && m.quoted.isVoice;
  const isTextReply = m.quoted && m.quoted.text;
  const isDirectAnswer = m.text && !m.isGroup;
  if (isAudioReply || isTextReply || isDirectAnswer) {
    const answer = isAudioReply ? m.quoted : m;
    const text = isTextReply ? answer.quoted.text : isDirectAnswer ? m.text : '';
    if (text.trim().toLowerCase() == json.jawaban.trim().toLowerCase()) {
      clearTimeout(conn.tebaklaguo[id][3]);
      conn.reply(m.chat, `*~⊹‏⊱≼━━━⌬〔📜〕⌬━━━≽⊰⊹~*\n*لإجابة صحيحة!✅*\n*🧛الفائز:* *@${m.sender.split`@`[0]}*\n*✨الجائزة: ${poin} خبرة*\n**~⊹‏⊱≼━━━⌬〔📜〕⌬━━━≽⊰⊹~*`, conn.tebaklaguo[id][0]);
      delete  conn.tebaklaguo[id];
    }
  }
  const aa = await conn.sendMessage(m.chat, {audio: {url: json.link_song}, fileName: `error.mp3`, mimetype: 'audio/mpeg'}, {quoted: m});
  if (!aa) return conn.sendFile(m.chat, json.jawaban, 'coba-lagi.mp3', '', m);
};
handler.help = ['tebaklaguo'];
handler.tags = ['game'];
handler.command = /^اوست|canción$/i;
export default handler;
async function fetchJson(url, options) {
  try {
options ? options : {};
const res = await axios({method: 'GET', url: url, headers: {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'}, ...options});
return res.data;
  } catch (err) {
    return err;
  }
}
