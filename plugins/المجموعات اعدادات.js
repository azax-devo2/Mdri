let handler = async (m, { conn, args, usedPrefix, command }) => {
    let isClose = { // Switch Case Like :v
        'فتح': 'not_announcement',
        'غلق': 'announcement',
        'الغاء-القفل': 'unlocked',
        'قفل': 'locked',
    }[(args[0] || '')]
    if (isClose === undefined)
        throw `
*تنسيق غير صحيح! مثال :*
  *○ ${usedPrefix + command} غلق*
  *○ ${usedPrefix + command} فتح*
  *○ ${usedPrefix + command} الغاء-القفل*
  *○ ${usedPrefix + command} قفل*
`.trim()
    await conn.groupSettingUpdate(m.chat, isClose)
}
handler.help = ['group *open / close*']
handler.tags = ['المجموعات']
handler.command = /^(جروب)$/i

handler.admin = true
handler.botAdmin = true

export default handler
