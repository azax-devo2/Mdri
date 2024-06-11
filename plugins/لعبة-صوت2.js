import similarity from 'similarity';
const threshold = 0.72;
const handler = {
  async before(m) {
    const id = m.chat;
    if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !/صوت.*من/i.test(m.quoted.text)) return !0;
    this.tebaklaguo = this.tebaklaguo ? this.tebaklaguo : {};
    if (!(id in this.tebaklaguo)) return m.reply('*خلصت*');
    if (m.quoted.id == this.tebaklaguo[id][0].id) {
      const json = JSON.parse(JSON.stringify(this.tebaklaguo[id][1]));
      if (m.text.toLowerCase() == json.jawaban.toLowerCase().trim()) {
        global.db.data.users[m.sender].exp += this.tebaklaguo[id][2];
        m.reply(`*~⊹‏⊱≼━━━⌬〔📜〕⌬━━━≽⊰⊹~*\n*الجواب صحيح✅*\n\n*الجائزة 💫:* *${this.tebaklaguo[id][2]}* *خبرة*\n*~⊹‏⊱≼━━━⌬〔📜〕⌬━━━≽⊰⊹~*`);
        clearTimeout(this.tebaklaguo[id][3]);
        delete this.tebaklaguo[id];
      } else if (similarity(m.text.toLowerCase(), json.jawaban.toLowerCase().trim()) >= threshold) m.reply(`*_اقتربت من الجواب الصحيح💭_*`);
      else m.reply(`*الجواب خاطئ❌*`);
    }
    return !0;
  },
  exp: 0,
};
export default handler;
