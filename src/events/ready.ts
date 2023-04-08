import { Events } from 'discord.js';
import BotClient from '../botClient';
import Event from './eventInterface';

const clientReady: Event = {
    name: Events.ClientReady,
    once: true,
    execute(client: BotClient) {
        console.log(`Ready! Logged in as ${client?.user?.tag}`);
    },
};

export default clientReady;
