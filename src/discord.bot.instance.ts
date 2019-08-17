import { BotInstance } from '@nest-bots/bot-platform';
import {Client, ClientOptions, Message} from 'discord.js';
import {BotCommandHandler} from "@nest-bots/bot-platform/dist";
import {ClientNotInitializedException} from "./discord.bot.exception";

export class DiscordBot extends BotInstance {

    public readonly name: string = 'discord';

    public readonly events: DiscordBot.Events;
    public config: DiscordBot.Config;

    client: Client;

    createClient(config: DiscordBot.Config): void {
        this.client = new Client(config);

        this.config = config;
    }

    async initClient(): Promise<void> {
        await this.client.login(this.config.token);
    }

    async registerEvent(name: DiscordBot.Events, handler: Function) {
        if(!this.client)
            throw new ClientNotInitializedException();

        this.client.on(name, (...args: any[]) => handler(this.client, ...args));
    }

}

export namespace DiscordBot {

    export type Config = ClientOptions & { token?: string };
    export enum Events {
        ChannelCreate = 'channelCreate',
        ChannelDelete = 'channelDelete',
        ChannelUpdatePins = 'channelPinsUpdate',
        ChannelUpdate = 'channelUpdate',
        ClientUserGuildSettingsUpdate = 'clientUserGuildSettingsUpdate',
        ClientUserSettingsUpdate = 'clientUserSettingsUpdate',
        Debug = 'debug',
        Disconnect = 'disconnect',
        EmojiCreate = 'emojiCreate',
        EmojiDelete = 'emojiDelete',
        EmojiUpdate = 'emojiUpdate',
        Error = 'error',
        GuildBanAdd = 'guildBanAdd',
        GuildBanRemove = 'guildBanRemove',
        GuildCreate = 'guildCreate',
        GuildDelete = 'guildDelete',
        GuildMemberAdd = 'guildMemberAdd',
        GuildMemberAvailable = 'guildMemberAvailable',
        GuildMemberRemove = 'guildMemberRemove',
        GuildMembersChunk = 'guildMembersChunk',
        GuildMemberSpeaking = 'guildMemberSpeaking',
        GuildMemberUpdate = 'guildMemberUpdate',
        GuildUnavailable = 'guildUnavailable',
        GuildUpdate = 'guildUpdate',
        GuildIntegrationsUpdate = 'guildIntegrationsUpdate',
        Message = 'message',
        MessageDelete = 'messageDelete',
        MessageDeleteBulk = 'messageDeleteBulk',
        MessageReactionAdd = 'messageReactionAdd',
        MessageReactionRemove = 'messageReactionRemove',
        MessageReactionRemoveAll = 'messageReactionRemoveAll',
        MessageUpdate = 'messageUpdate',
        PresenceUpdate = 'presenceUpdate',
        RateLimit = 'rateLimit',
        Ready = 'ready',
        Reconnecting = 'reconnecting',
        Resume = 'resume',
        RoleCreate = 'roleCreate',
        RoleDelete = 'roleDelete',
        RoleUpdate = 'roleUpdate',
        TypingStart = 'typingStart',
        TypingStop = 'typingStop',
        UserNoteUpdate = 'userNoteUpdate',
        UserUpdate = 'userUpdate',
        VoiceStateUpdate = 'voiceStateUpdate',
        Warn = 'warn',
        WebhookUpdate = 'webhookUpdate',
    }

}

export abstract class DiscordCommandHandler extends BotCommandHandler<DiscordBot> {

    abstract handle(client: Client, args: string[], msg: Message): void | Promise<void>;

}
