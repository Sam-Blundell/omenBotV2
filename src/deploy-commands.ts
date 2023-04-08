import { REST, Routes, ApplicationCommandData } from 'discord.js';
import commandFiles from './commands';

if (!process.env.BOT_TOKEN) {
    throw new Error('BOT_TOKEN is not defined in the environment variables');
}

const commands: object[] = [];

Object.values(commandFiles).forEach((commandFile) => {
    commands.push(commandFile.data.toJSON());
});

const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN);

const updateCommands = async () => {
    if (!process.env.CLIENT_ID) {
        throw new Error('CLIENT_ID is not defined in the environment variables');
    }

    if (!process.env.GUILD_ID) {
        throw new Error('GUILD_ID is not defined in the environment variables');
    }

    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);

        const data = await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: commands },
        );

        console.log(`Successfully reloaded ${(data as ApplicationCommandData[]).length} application (/) commands.`);
    } catch (error) {
        console.error(error);
    }
};

updateCommands().catch((error) => {
    console.error('An error occurred while updating commands:', error);
});
