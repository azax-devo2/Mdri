import axios from 'axios';
const handler = async (m, {conn, usedPrefix, command}) => {
  const cristiano = (await axios.get(`https://raw.githubusercontent.com/BrunoSobrino/TheMystic-Bot-MD/master/src/JSON/CristianoRonaldo.json`)).data;
  const ronaldo = await cristiano[Math.floor(cristiano.length * Math.random())];
  conn.sendFile(m.chat, url, 'error.jpg', `*سووووووووووو*`, m);
};
//conn.sendButton([['⚽ SIGUIENTE ⚽', `${usedPrefix + command}`]], m)}


handler.help = ['كرستيانو', 'الدون'];
handler.tags = ['صور'];
handler.command = /^(كرستيانو|رونالدو|الدون|cr7)$/i;
export default handler;
