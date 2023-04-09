import { ActionRowBuilder, ButtonBuilder } from '@discordjs/builders';
import { ButtonStyle } from 'discord.js';

const buildRegisterButton = (userId: string) => new ActionRowBuilder<ButtonBuilder>()
    .addComponents(
        new ButtonBuilder()
            .setCustomId(`RegisterButton%${userId}`)
            .setLabel('Register')
            .setStyle(ButtonStyle.Primary),
    );

export default buildRegisterButton;
