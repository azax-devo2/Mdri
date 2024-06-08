import fetch from 'node-fetch';
const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    throw "> *مرحبًا، أنا خدمة `Math-Ai` تساعدك في حل المسائل الرياضية وإجراء العمليات المستعصية*";
  }
  try {
    conn.sendPresenceUpdate('composing', m.chat);
    const BK9api = `https://api.bk9.site/ai/mathssolve?q=${encodeURIComponent(text)}`;
    const BK99 = await fetch(BK9api);
    const BK8 = await BK99.json();
    if (BK8.status && BK8.BK9) {
      const respuestaAPI = BK8.BK9;
      conn.reply(m.chat, respuestaAPI, m);
       } else {
      throw "> *خطأ ⚠️.*";
    }
  } catch (error) {
    throw "> *خطأ ⚠️.*";
  }
};

handler.command = /^(حل-الحساب)$/i;
handler.tags = ['ai'];
export default handler;

// By Saad - @nm9h
// Thanks for BK9 API
