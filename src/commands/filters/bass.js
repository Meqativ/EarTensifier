const Discord = require('discord.js');
const premium = require('../../utils/premium/premium.js');

module.exports = {
	name: 'bass',
	description: 'Turns on bass filter',
	cooldown: '10',
	inVoiceChannel: true,
	sameVoiceChannel: true,
	playing: true,
	async execute(client, message, args) {
		if(await premium(message.author.id, 'Premium') == false) return client.responses('noPremium', message);

		const player = client.music.players.get(message.guild.id);
		const delay = ms => new Promise(res => setTimeout(res, ms));

		if (args[0] && (args[0].toLowerCase() == 'reset' || args[0].toLowerCase() == 'off')) {
			player.setEQ(Array(13).fill(0).map((n, i) => ({ band: i, gain: 0.15 })));
			const msg = await message.channel.send(`${client.emojiList.loading} Turning off **bass**. This may take a few seconds...`);
			const embed = new Discord.MessageEmbed()
				.setAuthor(message.guild.name, message.guild.iconURL())
				.setDescription('Bass off')
				.setColor(client.colors.main);
			await delay(5000);
			return msg.edit('', embed);
		}

		player.setEQ(client.filters.bass);

		const msg = await message.channel.send(`${client.emojiList.loading} Turning on **bass**. This may take a few seconds...`);
		const embed = new Discord.MessageEmbed()
			.setAuthor(message.guild.name, message.guild.iconURL())
			.setDescription('Bass filter on')
			.setFooter('Reset filter: ear reset')
			.setColor(client.colors.main);
		await delay(5000);
		return msg.edit('', embed);
	},
};