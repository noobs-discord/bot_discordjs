const { Permissions } = require('discord.js');

module.exports = async (client, old, n) => {
    try {
        if (old.member.bot || n.member.bot) return;
        if (!old.channel && n.channel) {
            client.voiceStats.set(n.member.id, (new Date()).getTime());
            if (n.channel.id == "816625926401163284") {
                const channel = await n.guild.channels.create("chuồng lợn #" + require('../../tools/string/numberConverter_2')(parseInt(client.voices.size) + 1), { type: 'GUILD_VOICE', parent: n.channel.parent.id, permissionsOverwrites: [{ id: "721203266452586507", allow: [Permissions.FLAGS.VIEW_CHANNEL] }] });
                n.setChannel(channel, "Người dùng đã vào channel tạo voice!");
                let voiceCache = client.voices.get(channel.id);
                if (!voiceCache) {
                    client.voices.set(channel.id, {
                        owner: n.member.id,
                        allow: [],
                        deny: [],
                        lock: false,
                        sleep: false,
                        defend: [],
                        mute: [],
                    })
                    voiceCache = client.voices.get(channel.id)
                }
                if (voiceCache.deny.includes(n.member.id)) return n.member.disconnect('user has been blocked from the room')
            } else {
                let voiceCache = client.voices.get(n.channel.id);
                if (!voiceCache) return;
                if (voiceCache.deny.includes(n.member.id)) return n.member.disconnect('user has been blocked from the room')
            }
        } else if (old.channel) {
            const userData = client.voiceStats.get(old.member.id);
            if(userData){
                const data = await require('../../tools/database/getLevel')(old.member.id);
                if(data) {
                    data.voice.push({
                        total: (new Date()).getTime() - userData,
                        date: (new Date()).getTime()
                    })
                }
                if((new Date(data.updates[-1])).getDate() != new Date().getDate()) data.updates.push(new Date().getTime());
                data.save();
            }
            
            let voiceCache = client.voices.get(old.channel.id);
            if (voiceCache) {
                if (old.member.id == voiceCache.owner) voiceCache.owner = null;
                if (old.channel.members.size == 0) {
                    client.voices.delete(old.channel.id);
                    old.channel.delete();
                    let i = 1;
                    for(let [key, name] of client.voices) {
                        const channel = old.guild.channels.cache.get(key);
                        if(channel.name.startsWith('chuồng lợn #')){
                            channel ? channel.setName("chuồng lợn #" + require('../../tools/string/numberConverter_2')(i)) : null;
                            i++;
                        }
                    }
                }
            }
            if (n.channel && n.channel.id == "816625926401163284") {
                const channel = await n.guild.channels.create("chuồng lợn #" + require('../../tools/string/numberConverter_2')(parseInt(client.voices.size) + 1), { type: 'GUILD_VOICE', parent: n.channel.parent.id, permissionsOverwrites: [{ id: "721203266452586507", allow: [Permissions.FLAGS.VIEW_CHANNEL] }] });
                n.setChannel(channel, "Người dùng đã vào channel tạo voice!");
                let voiceCache1 = client.voices.get(channel.id);
                if (!voiceCache1) {
                    client.voices.set(channel.id, {
                        owner: n.member.id,
                        allow: [],
                        deny: [],
                        lock: false,
                        sleep: false,
                        defend: [],
                        mute: [],
                    })
                    voiceCache1 = client.voices.get(channel.id)
                }
                if (voiceCache1.deny.includes(n.member.id)) return n.member.disconnect('user has been blocked from the room')
            }
        }
    } catch (e) {
        return require('../../tools/functions/error')(e);
    }
}