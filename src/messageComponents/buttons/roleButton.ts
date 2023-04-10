import { ActionRowBuilder, ButtonBuilder } from '@discordjs/builders';
import { ButtonStyle } from 'discord.js';

const buildRoleButton = (userId: string) => new ActionRowBuilder<ButtonBuilder>()
    .addComponents(
        new ButtonBuilder()
            .setCustomId(`MemberButton%${userId}`)
            .setLabel('Member')
            .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
            .setCustomId(`FriendButton%${userId}`)
            .setLabel('Friend')
            .setStyle(ButtonStyle.Success),
    );

export default buildRoleButton;
