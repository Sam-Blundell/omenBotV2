import {
    Events,
    GuildMember,
    NewsChannel,
    TextChannel,
} from 'discord.js';
import Event from './eventInterface';
import buildRegisterButton from '../messageComponents/buttons/registerButton';

const guildMemberAdd: Event = {
    name: Events.GuildMemberAdd,
    async execute(member: GuildMember) {
        if (!process.env.NEWBIE_ROLE || !process.env.WELCOME_CHANNEL) {
            throw new Error('Missing Environment Variables');
        }

        const newbieRole = member.guild.roles.cache.get(process.env.NEWBIE_ROLE);
        const welcomeChannel = member.guild.channels.cache.get(process.env.WELCOME_CHANNEL);

        if (newbieRole) {
            await member.roles.add(newbieRole);
        } else {
            throw new Error(`Role with ID ${process.env.NEWBIE_ROLE} not found.`);
        }

        if (welcomeChannel instanceof TextChannel || welcomeChannel instanceof NewsChannel) {
            await welcomeChannel.send({ content: `Welcome ${member.user.username}! Click here to get started:`, components: [buildRegisterButton(member.id)] });
        } else {
            throw new Error('Welcome channel is not configured as a text or news channel.');
        }
    },
};

export default guildMemberAdd;
