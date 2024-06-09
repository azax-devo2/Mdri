const dir = [
'https://telegra.ph/file/c15b1d8c39d3365d66407.jpg',
'https://telegra.ph/file/903c9c389aaae02034cab.jpg',
'https://telegra.ph/file/8538e8e4b5592bee7b088.jpg',
'https://telegra.ph/file/231defc049e999f88a87c.jpg',
'https://telegra.ph/file/d7706ef25a7d5abbd8ad4.jpg',
'https://telegra.ph/file/de360b26700cc79ade7e5.jpg',
'https://telegra.ph/file/b6249a2db8b86d2b91ce2.jpg',
'https://telegra.ph/file/99c6c23622bd9fab355e8.jpg',
'https://telegra.ph/file/3de8d4241348693fefe20.jpg',
'https://telegra.ph/file/bc447be7918647fc4b6c8.jpg',
'https://telegra.ph/file/af01e631e5e630566bbe7.jpg',
'https://telegra.ph/file/b63c8ee19e5d2a95e134b.jpg',
'https://telegra.ph/file/2dae22bc3a4ec8743e861.jpg',
'https://telegra.ph/file/c39362717b6e943605709.jpg',
'https://telegra.ph/file/8e6e32f8d1f3645742abc.jpg',
'https://telegra.ph/file/32b216262ee43fbc09970.jpg',
'https://telegra.ph/file/9246ba6e2f3d28d712b6d.jpg',
'https://telegra.ph/file/f7cc967a8d2db91852746.jpg'

];
let handler = async (m, { conn }) => {
  conn.sendFile(m.chat, dir[Math.floor(Math.random() * dir.length)], 'dado.webp', '', m)
}
handler.help = ['داني']
handler.tags = ['صور']
handler.command = ['الشبح', 'داني'] 

export default handler
