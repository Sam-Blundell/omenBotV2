import { GatewayIntentBits } from 'discord.js';
import BotClient from './botClient';
import commandFiles from './commands';
import eventFiles from './events';

const client = new BotClient({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
    ],
});

Object.values(commandFiles).forEach((commandFile) => {
    client.commands.set(commandFile.data.name, commandFile);
});

Object.values(eventFiles).forEach((event) => {
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
});

client.login(process.env.BOT_TOKEN)
    .catch((err) => {
        console.error('[Login Error]', err);
        process.exit(1);
    });
