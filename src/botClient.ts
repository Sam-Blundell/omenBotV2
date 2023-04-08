import { Client, Collection } from 'discord.js';

export default class BotClient extends Client {
    commands: Collection<string, any>;

    constructor(options: ConstructorParameters<typeof Client>[0]) {
        super(options);
        this.commands = new Collection();
    }
}
