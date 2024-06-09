import fetch from 'node-fetch';
const handler = async (m, {conn, text}) => {
  try {
    const res = await fetch('https://api.thecatapi.com/v1/images/search');
    const img = await res.json();
    const caption = `*مياو مياو*`.trim();
    conn.sendFile(m.chat, img[0].url, 'cat.jpg', caption, m);
  } catch (e) {
    console.log(e);
    throw '*「❌」حدث خطأ*';
  }
};
handler.help = ['قطط'];
handler.tags = ['صور'];
handler.command = /^قطط|قط|قطه|قطة$/i;
handler.fail = null;
export default handler;
