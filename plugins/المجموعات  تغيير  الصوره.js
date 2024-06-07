import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const jimp_1 = require('jimp')

let handler = async (m, { conn, command, usedPrefix }) => {
	let q = m.quoted ? m.quoted : m
	let mime = (q.msg || q).mimetype || q.mediaType || ''
	if (/image/g.test(mime) && !/webp/g.test(mime)) {
		try {
			let media = await q.download()
			let { img } = await pepe(media)
			await conn.query({
				tag: 'iq',
				attrs: {
					to: m.chat,
					type:'set',
					xmlns: 'w:profile:picture'
				},
				content: [
					{
						tag: 'picture',
						attrs: { type: 'image' },
						content: img
					}
				]
			})
			m.reply(`المشـرف @${(m.sender || '').replace(/@s\.whatsapp\.net/g, '')} قـام بتغييـر بروفـايل الجـروب!`, null, { mentions: [m.sender] })
		} catch (e) {
			console.log(e)
			m.reply(`حدث خطأ، حاول مرة أخرى لاحقًا`)
		}
	} else {
		m.reply(`ارسل الصـوره التـي تريد جعلهـا صوره للجـروب وارفق معها الامـر *تغيير-الصوره* او قم بالـرد عل الصـوره\n*لاتنسـا متـابعة قنـاة المطــور https://whatsapp.com/channel/0029Vag9bvrLSmbRE2I5Oj2h*`)
	}
}

handler.help = ['setppgc', 'setppgcpanjang']
handler.tags = ['المجموعات']
handler.command = /^(تغيير-الصوره)$/i

handler.admin = true
handler.botAdmin = true
handler.group = true

export default handler

async function pepe(media) {
	const jimp = await jimp_1.read(media)
	const min = jimp.getWidth()
	const max = jimp.getHeight()
	const cropped = jimp.crop(0, 0, min, max)
	return {
		img: await cropped.scaleToFit(720, 720).getBufferAsync(jimp_1.MIME_JPEG),
		preview: await cropped.normalize().getBufferAsync(jimp_1.MIME_JPEG)
	}
}
