module.exports = async(client, member) => {
	const newInvites = await member.guild.fetchInvites();
	newInvites.forEach(newInvite => {
		let invite = client.invites.get(newInvite.code)
		if(newInvite.uses > invite.uses) {
			const channel = member.guild.channels.cache.get('721203266892988489');
			const user = member.guild.members.cache.get(newInvite.inviter.id);
			const text = `Chào mừng ${member} đã đến với **Động Noobs**. Được mời bởi **${user.user.tag}**!`;
			return channel.send(text);
		}
	})
}