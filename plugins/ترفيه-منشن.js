let handler = async (m, { conn, command, text, usedPrefix }) => {
  if (!text) throw `*[❗ركـز❗] اعمل منشن لي الشخص عشان الامر يشتغل*`;

  const getRandomPercentage = () => Math.floor(Math.random() * 100) + 1;

  const responses = {
    'ورع': `_*${text.toUpperCase()}* *نسبة ورعنته* *${getRandomPercentage()}%* *الله يشفيك و تكبر كذا و تكون عاقل*_`,
    'اهبل': `_*${text.toUpperCase()}* *نسبة هبله* *${getRandomPercentage()}%* *اخخ بس متى ناوي تعقل يا ${command.replace('how', '').toUpperCase()}*_`,
    'خروف': `_*${text.toUpperCase()}* *نسبة خرفنته* *${getRandomPercentage()}%* *ياخوي اعقل شوية يعني يا ${command.replace('how', '').toUpperCase()}*_`,
    'جميل': `_*${text.toUpperCase()}* *نسبة جماله* *${getRandomPercentage()}%* *يا زينك بس فديت الـ ${command.replace('how', '').toUpperCase()}*_`,
    'فخم': `_*${text.toUpperCase()}* *🧛نسبة فخامته* *${getRandomPercentage()}%* *${command.replace('how', '').toUpperCase()}, طلعت فخم يا حمار🙂😂*_`,
    'انوثه': `_*${text.toUpperCase()}* *نسبة أنوثته🧛‍♀️* *${getRandomPercentage()}%* *${command.replace('how', '').toUpperCase()}, يزين باربي🧝🏻‍♂️*_`,
    'رجوله': `_*${text.toUpperCase()}* *نسبة رجولته🌚* *${getRandomPercentage()}%* *${command.replace('how', '').toUpperCase()}, الرجولة أفعال ومواقف🐺*_`,
    'ذكاء': `_*${text.toUpperCase()}* *نسبة ذكائه🧠* *${getRandomPercentage()}%* *${command.replace('how', '').toUpperCase()}, أنت عبقري!*_`,
    'شجاعة': `_*${text.toUpperCase()}* *نسبة شجاعته🦁* *${getRandomPercentage()}%* *${command.replace('how', '').toUpperCase()}, أنت بطل!*_`,
    'حظ': `_*${text.toUpperCase()}* *نسبة حظه🍀* *${getRandomPercentage()}%* *${command.replace('how', '').toUpperCase()}, لديك حظ رائع!*_`,
    'مرح': `_*${text.toUpperCase()}* *نسبة مرحه😄* *${getRandomPercentage()}%* *${command.replace('how', '').toUpperCase()}, أنت شخص ممتع!*_`,
    'عبقرية': `_*${text.toUpperCase()}* *نسبة عبقريته🧠* *${getRandomPercentage()}%* *${command.replace('how', '').toUpperCase()}, عبقري حقيقي!*_`,
    'قوة': `_*${text.toUpperCase()}* *نسبة قوته💪* *${getRandomPercentage()}%* *${command.replace('how', '').toUpperCase()}, قوي جداً!*_`,
    'ذكاء_عاطفي': `_*${text.toUpperCase()}* *نسبة ذكائه العاطفي❤️* *${getRandomPercentage()}%* *${command.replace('how', '').toUpperCase()}, حس مرهف!*_`,
    'ابداع': `_*${text.toUpperCase()}* *نسبة ابداعه🎨* *${getRandomPercentage()}%* *${command.replace('how', '').toUpperCase()}, مبدع!*_`
  };

  const mentions = m.mentionedJid || [];

  if (responses[command]) {
    conn.reply(m.chat, responses[command].trim(), m, {
      contextInfo: {
        mentionedJid: mentions,
        externalAdReply: {
          showAdAttribution: true,
          title: '@By Azax',
          thumbnailUrl: 'https://telegra.ph/file/9bd0ea9801e961dbbfcdd.jpg', // URL للصورة
          sourceUrl: 'https://whatsapp.com/channel/0029Vag9bvrLSmbRE2I5Oj2h', // URL للرابط الداخلي
          mediaType: 1,
          renderLargerThumbnail: true
        }
      }
    });
  }
}

handler.help = ['ورع', 'اهبل', 'خروف', 'جميل', 'فخم', 'أنوثه', 'رجوله', 'ذكاء', 'شجاعة', 'حظ', 'مرح', 'عبقرية', 'قوة', 'ذكاء_عاطفي', 'ابداع'].map(v => v + ' @tag | nombre');
handler.tags = ['calculator'];
handler.command = /^ورع|اهبل|خروف|جميل|فخم|انوثه|رجوله|ذكاء|شجاعة|حظ|مرح|عبقرية|قوة|ذكاء_عاطفي|ابداع/i;

export default handler;
