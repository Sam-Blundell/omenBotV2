import {
    ModalBuilder,
    ActionRowBuilder,
    TextInputBuilder,
    ModalActionRowComponentBuilder,
} from '@discordjs/builders';
import { TextInputStyle } from 'discord.js';

const buildRegisterModal = (userId: string) => {
    const registerModal = new ModalBuilder()
        .setCustomId(`registerModal@${userId}`)
        .setTitle('New Arrival Form');

    const characterInput = new TextInputBuilder()
        .setCustomId('characterInput')
        .setLabel('What is your characters name?')
        .setStyle(TextInputStyle.Short)
        .setRequired(true);

    const serverInput = new TextInputBuilder()
        .setCustomId('serverInput')
        .setLabel('What server are you from?')
        .setStyle(TextInputStyle.Short)
        .setValue('Ravana');

    const firstActionRow = new ActionRowBuilder<ModalActionRowComponentBuilder>()
        .addComponents(characterInput);
    const secondActionRow = new ActionRowBuilder<ModalActionRowComponentBuilder>()
        .addComponents(serverInput);

    registerModal.addComponents(firstActionRow, secondActionRow);

    return registerModal;
};

export default buildRegisterModal;
