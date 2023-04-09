import { Events, CommandInteraction, InteractionType } from 'discord.js';
import BotClient from '../botClient';
import Event from './eventInterface';

const interactionCreate: Event = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        switch (interaction.type) {
            case InteractionType.ApplicationCommand: {
                const command = (interaction.client as BotClient)
                    .commands.get(interaction.commandName);

                if (!command) {
                    console.error(`No command matching ${interaction.commandName} was found.`);
                    return;
                }

                try {
                    await command.execute(interaction as CommandInteraction);
                } catch (error) {
                    console.error(error);
                    if (interaction.replied || interaction.deferred) {
                        await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
                    } else {
                        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
                    }
                }
                break;
            }
            case InteractionType.MessageComponent: {
                console.log('Message reply Recieved.');
                break;
            }
            case InteractionType.ModalSubmit: {
                console.log('modal reply Recieved.');
                break;
            }
            default: {
                console.error(`Unknown interaction type: ${interaction.type}`);
                break;
            }
        }
    },
};

export default interactionCreate;
