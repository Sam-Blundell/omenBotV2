import { Events, CommandInteraction, InteractionType } from 'discord.js';
import BotClient from '../botClient';
import Event from './eventInterface';
import buildRegisterModal from '../messageComponents/modals/registerModal';
import buildRoleButton from '../messageComponents/buttons/roleButton';

const interactionCreate: Event = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        const { customId } = interaction;
        const { id: userId } = interaction.user;
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
                if (customId.endsWith(userId)) {
                    if (customId.startsWith('RegisterButton')) {
                        await interaction.showModal(buildRegisterModal(userId));
                    } else if (customId.startsWith('FriendButton')) {
                        const friendRole = interaction.guild.roles.cache
                            .get(process.env.FRIEND_ROLE);
                        await interaction.member.roles.add(friendRole);
                        await interaction.update({ content: 'done', components: [] });
                    } else if (customId.startsWith('MemberButton')) {
                        const memberRole = interaction.guild.roles.cache
                            .get(process.env.MEMBER_ROLE);
                        await interaction.member.roles.add(memberRole);
                        await interaction.update({ content: 'done', components: [] });
                    }
                } else {
                    await interaction.reply({ content: 'That isn\'t for you.', ephemeral: true });
                }
                break;
            }
            case InteractionType.ModalSubmit: {
                if (customId.endsWith(userId)) {
                    const newName: string = interaction.fields.getTextInputValue('CharacterInput');
                    await interaction.member.setNickname(newName);
                    await interaction.update({
                        content: `Thanks ${newName}, are you a member of Omen or just a friend?`,
                        components: [buildRoleButton(userId)],
                    });
                } else {
                    await interaction.reply({ content: 'That isn\'t for you.', ephemeral: true });
                }
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
