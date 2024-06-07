//import db from '../lib/database.js'

let handler = async (m, { conn, participants, groupMetadata }) => {
    const pp = await conn.profilePictureUrl(m.chat, 'image').catch(_ => null) || './src/avatar_contact.png'
    const { isBanned, welcome, detect, sWelcome, sBye, sPromote, sDemote, antiLink, delete: del } = global.db.data.chats[m.chat]
    const groupAdmins = participants.filter(p => p.admin)
    const listAdmin = groupAdmins.map((v, i) => `${i + 1}. @${v.id.split('@')[0]}`).join('\n')
    const owner = groupMetadata.owner || groupAdmins.find(p => p.admin === 'superadmin')?.id || m.chat.split`-`[0] + '@s.whatsapp.net'
    let text = `
┌── *『 معلومات المجموعة 』*
☬↫ *♦الاسم* : ${groupMetadata.subject}
☬↫ *👥الأعضاء* : ${participants.length}
☬↫ *👨🏻‍🔧المــؤسس:* @${owner.split('@')[0]}

⌬ *الادمـن👨🏻‍✈️👩🏻‍✈️:*
${listAdmin}

*⌬  💬إعدادات التفـاعل:*
☬↫ 👋🏻الترحيب: ${sWelcome}
☬↫ 👐🏻المغادره: ${sBye}
☬↫ ⏫ترقية: ${sPromote}
☬↫ ⏬الاعفاء: ${sDemote}

⌬ *🪢إعدادات المجموعة:*
☬↫ ${isBanned ? '✅' : '❎'} محظور
☬↫ ${welcome ? '✅' : '❎'} الترحيب
☬↫ ${detect ? '✅' : '❎'} الكشف
☬↫ ${del ? '❎' : '✅'} منع الحذف
☬↫ ${antiLink ? '✅' : '❎'} منع روابط واتساب

⌬ *📜الوصف* :
   ☬↫ ${groupMetadata.desc?.toString() || 'غير معروف'}
`.trim()
    conn.sendFile(m.chat, pp, 'pp.jpg', text, m, false, { mentions: [...groupAdmins.map(v => v.id), owner] })
}

handler.help = ['infogp']
handler.tags = ['group']
handler.command = ['infogroup', 'groupinfo', 'infogp','الجروب'] 
handler.group = true
handler.admin = true

export default handler
