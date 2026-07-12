"use client";

import { useState } from "react";

interface Command {
  name: string;
  description: string;
  category: string;
  permissions: string;
  aliases: string;
  syntax: string;
  example: string;
}

const categoryColors: Record<string, string> = {
  Utility: "bg-blue-500/15 text-blue-400",
  Security: "bg-red-500/15 text-red-400",
  Economy: "bg-green-500/15 text-green-400",
  Moderation: "bg-yellow-500/15 text-yellow-400",
  Music: "bg-purple-500/15 text-purple-400",
  Birthday: "bg-pink-500/15 text-pink-400",
  Boosterrole: "bg-fuchsia-500/15 text-fuchsia-400",
  Invites: "bg-cyan-500/15 text-cyan-400",
  Lastfm: "bg-red-500/15 text-red-400",
  Leveling: "bg-emerald-500/15 text-emerald-400",
  Other: "bg-gray-500/15 text-gray-400",
  Serverlist: "bg-indigo-500/15 text-indigo-400",
  Settings: "bg-slate-500/15 text-slate-400",
  Tickets: "bg-sky-500/15 text-sky-400",
  Voice: "bg-teal-500/15 text-teal-400",
};

const categories = [
  "Utility",
  "Security",
  "Economy",
  "Moderation",
  "Music",
  "Birthday",
  "Boosterrole",
  "Invites",
  "Lastfm",
  "Leveling",
  "Other",
  "Serverlist",
  "Settings",
  "Tickets",
  "Voice",
];

const commands: Command[] = [
  { name: "activity", description: "View server activity stats and leaderboards", category: "Utility", permissions: "N/A", aliases: "act", syntax: "activity", example: "N/A" },
  { name: "activity channel", description: "View activity stats for a channel", category: "Utility", permissions: "N/A", aliases: "ch", syntax: "activity channel (channel) (range)", example: "activity channel #general 7d" },
  { name: "activity ignore add", description: "Add a channel to the ignore list", category: "Utility", permissions: "N/A", aliases: "N/A", syntax: "activity ignore add [channel]", example: "activity ignore add #general" },
  { name: "activity ignore list", description: "List all ignored channels", category: "Utility", permissions: "N/A", aliases: "N/A", syntax: "activity ignore list", example: "N/A" },
  { name: "activity ignore remove", description: "Remove a channel from the ignore list", category: "Utility", permissions: "N/A", aliases: "rm, delete", syntax: "activity ignore remove [channel]", example: "activity ignore remove #general" },
  { name: "activity messages", description: "View server-wide message statistics", category: "Utility", permissions: "N/A", aliases: "msg, text", syntax: "activity messages (range)", example: "activity messages 7d" },
  { name: "activity server", description: "View server-wide activity stats", category: "Utility", permissions: "N/A", aliases: "s, guild", syntax: "activity server (range)", example: "activity server 7d" },
  { name: "activity user", description: "View activity stats for a user", category: "Utility", permissions: "N/A", aliases: "u, member", syntax: "activity user (member) (range)", example: "activity user @curet 7d" },
  { name: "activity voice", description: "View server-wide voice statistics", category: "Utility", permissions: "N/A", aliases: "vc", syntax: "activity voice (range)", example: "activity voice 7d" },
  { name: "antiraid", description: "Antiraid configuration", category: "Security", permissions: "Manage Guild", aliases: "N/A", syntax: "antiraid", example: "N/A" },
  { name: "antiraid resolve", description: "Resolve raid state and unlock server", category: "Security", permissions: "Manage Guild", aliases: "N/A", syntax: "antiraid resolve", example: "N/A" },
  { name: "antiraid unwhitelist", description: "Remove a user from the antiraid whitelist", category: "Security", permissions: "Manage Guild", aliases: "N/A", syntax: "antiraid unwhitelist [user]", example: "antiraid unwhitelist @curet" },
  { name: "antiraid whitelist", description: "Whitelist a user to bypass avatar/age checks", category: "Security", permissions: "Manage Guild", aliases: "N/A", syntax: "antiraid whitelist [user]", example: "antiraid whitelist @curet" },
  { name: "antiraid whitelisted", description: "Show all whitelisted users", category: "Security", permissions: "Manage Guild", aliases: "N/A", syntax: "antiraid whitelisted", example: "N/A" },
  { name: "avatar", description: "Shows the avatar of a user", category: "Utility", permissions: "N/A", aliases: "av, pfp", syntax: "avatar (user)", example: "avatar @curet" },
  { name: "avatarhistory", description: "View or manage avatar history tracking", category: "Utility", permissions: "N/A", aliases: "avh", syntax: "avatarhistory (user)", example: "avatarhistory @curet" },
  { name: "avatarhistory disable", description: "Disable avatar history tracking", category: "Utility", permissions: "N/A", aliases: "N/A", syntax: "avatarhistory disable", example: "N/A" },
  { name: "avatarhistory enable", description: "Enable avatar history tracking", category: "Utility", permissions: "N/A", aliases: "N/A", syntax: "avatarhistory enable", example: "N/A" },
  { name: "banner", description: "Shows the banner of a user", category: "Utility", permissions: "N/A", aliases: "bn", syntax: "banner (user)", example: "banner @curet" },
  { name: "birthday", description: "Birthday commands", category: "Birthday", permissions: "N/A", aliases: "bd, bday", syntax: "birthday (member)", example: "birthday @curet" },
  { name: "birthday list", description: "List upcoming birthdays", category: "Birthday", permissions: "N/A", aliases: "N/A", syntax: "birthday list", example: "N/A" },
  { name: "birthday set", description: "Set your birthday", category: "Birthday", permissions: "N/A", aliases: "N/A", syntax: "birthday set [day] [month] (year)", example: "birthday set 15 6 2000" },
  { name: "boosterrole", description: "Manage your booster role", category: "Boosterrole", permissions: "N/A", aliases: "br", syntax: "boosterrole", example: "N/A" },
  { name: "boosterrole color", description: "Set your booster role color or gradient", category: "Boosterrole", permissions: "N/A", aliases: "colour", syntax: "boosterrole color [colour1] (colour2)", example: "boosterrole color #ff0000 #0000ff" },
  { name: "boosterrole delete", description: "Delete your booster role", category: "Boosterrole", permissions: "N/A", aliases: "remove", syntax: "boosterrole delete", example: "N/A" },
  { name: "boosterrole dominant", description: "Set your booster role color to dominant color of avatar", category: "Boosterrole", permissions: "N/A", aliases: "N/A", syntax: "boosterrole dominant", example: "N/A" },
  { name: "boosterrole icon", description: "Set an icon for your booster role", category: "Boosterrole", permissions: "N/A", aliases: "N/A", syntax: "boosterrole icon (input)", example: "boosterrole icon 🎉" },
  { name: "boosterrole name", description: "Set the name of your booster role", category: "Boosterrole", permissions: "N/A", aliases: "rename", syntax: "boosterrole name [name]", example: "boosterrole name My Cool Role" },
  { name: "boosterrole random", description: "Set your booster role to a random color", category: "Boosterrole", permissions: "N/A", aliases: "N/A", syntax: "boosterrole random", example: "N/A" },
  { name: "boosterrole share", description: "Share your booster role with another user", category: "Boosterrole", permissions: "N/A", aliases: "N/A", syntax: "boosterrole share [user]", example: "boosterrole share @curet" },
  { name: "boosterrole unshare", description: "Remove a user from your role, or leave a shared role", category: "Boosterrole", permissions: "N/A", aliases: "N/A", syntax: "boosterrole unshare [target]", example: "boosterrole unshare @curet | @booster" },
  { name: "blackjack", description: "Play Blackjack against the dealer", category: "Economy", permissions: "N/A", aliases: "bj", syntax: "blackjack [bet]", example: "blackjack 100" },
  { name: "blackjack end", description: "End your active Blackjack game", category: "Economy", permissions: "N/A", aliases: "N/A", syntax: "blackjack end", example: "N/A" },
  { name: "business", description: "Business commands", category: "Economy", permissions: "N/A", aliases: "biz", syntax: "business", example: "N/A" },
  { name: "business buy", description: "Buy a business", category: "Economy", permissions: "N/A", aliases: "b, purchase", syntax: "business buy [business]", example: "business buy Coffee Shop" },
  { name: "business card equip", description: "Equip a card to your business", category: "Economy", permissions: "N/A", aliases: "set", syntax: "business card equip [card_id]", example: "business card equip 1234567" },
  { name: "business card remove", description: "Remove the equipped card from your business", category: "Economy", permissions: "N/A", aliases: "unequip", syntax: "business card remove", example: "N/A" },
  { name: "business collect", description: "Collect your business earnings", category: "Economy", permissions: "N/A", aliases: "c, claim", syntax: "business collect", example: "N/A" },
  { name: "business info", description: "Shows your current business", category: "Economy", permissions: "N/A", aliases: "i, status", syntax: "business info", example: "N/A" },
  { name: "business list", description: "Shows all businesses in the catalog", category: "Economy", permissions: "N/A", aliases: "l, catalog", syntax: "business list", example: "N/A" },
  { name: "business sell", description: "Sell your current business", category: "Economy", permissions: "N/A", aliases: "N/A", syntax: "business sell", example: "N/A" },
  { name: "dice", description: "Roll the dice and bet on the outcome", category: "Economy", permissions: "N/A", aliases: "roll", syntax: "dice [bet] [target] [condition]", example: "dice 100 50 over" },
  { name: "dice end", description: "End your active Dice session", category: "Economy", permissions: "N/A", aliases: "N/A", syntax: "dice end", example: "N/A" },
  { name: "lab", description: "Lab commands", category: "Economy", permissions: "N/A", aliases: "N/A", syntax: "lab", example: "N/A" },
  { name: "lab buy", description: "Buy a lab", category: "Economy", permissions: "N/A", aliases: "b, purchase", syntax: "lab buy", example: "N/A" },
  { name: "lab card equip", description: "Equip a card to your lab", category: "Economy", permissions: "N/A", aliases: "set", syntax: "lab card equip [card_id]", example: "lab card equip 1234567" },
  { name: "lab card remove", description: "Remove the equipped card from your lab", category: "Economy", permissions: "N/A", aliases: "unequip", syntax: "lab card remove", example: "N/A" },
  { name: "lab collect", description: "Collect your lab earnings", category: "Economy", permissions: "N/A", aliases: "c, claim", syntax: "lab collect", example: "N/A" },
  { name: "lab info", description: "Shows your current lab", category: "Economy", permissions: "N/A", aliases: "i, status", syntax: "lab info", example: "N/A" },
  { name: "lab sell", description: "Sell your lab", category: "Economy", permissions: "N/A", aliases: "N/A", syntax: "lab sell", example: "N/A" },
  { name: "lab upgrade", description: "Upgrade your lab", category: "Economy", permissions: "N/A", aliases: "N/A", syntax: "lab upgrade (level)", example: "lab upgrade 5" },
  { name: "mines", description: "Play the Mines game", category: "Economy", permissions: "N/A", aliases: "mine", syntax: "mines [bet] (mines)", example: "mines 100 5" },
  { name: "mines end", description: "End your active Mines game", category: "Economy", permissions: "N/A", aliases: "N/A", syntax: "mines end", example: "N/A" },
  { name: "profile", description: "View your economy profile", category: "Economy", permissions: "N/A", aliases: "p, prof", syntax: "profile (member)", example: "profile @curet" },
  { name: "embed", description: "Create, manage, and send custom embeds", category: "Utility", permissions: "N/A", aliases: "em", syntax: "embed", example: "N/A" },
  { name: "embed copy", description: "Copy an existing embed as a template", category: "Utility", permissions: "Manage Guild", aliases: "N/A", syntax: "embed copy [message] [name]", example: "embed copy https://discord.com/channels/.../123 template_name" },
  { name: "embed create", description: "Preview an embed from DSL code", category: "Utility", permissions: "N/A", aliases: "N/A", syntax: "embed create [code]", example: "embed create {embed}$v{title: Hello}" },
  { name: "embed delete", description: "Delete a saved template", category: "Utility", permissions: "Manage Guild", aliases: "del, remove", syntax: "embed delete [name]", example: "embed delete template_name" },
  { name: "embed edit", description: "Edit a bot message with a saved template", category: "Utility", permissions: "Manage Guild", aliases: "N/A", syntax: "embed edit [message] [name]", example: "embed edit https://discord.com/.../123 template_name" },
  { name: "embed list", description: "List all saved templates", category: "Utility", permissions: "N/A", aliases: "N/A", syntax: "embed list", example: "N/A" },
  { name: "embed load", description: "View the DSL code of a saved template", category: "Utility", permissions: "N/A", aliases: "N/A", syntax: "embed load [name]", example: "embed load template_name" },
  { name: "embed save", description: "Save an embed template", category: "Utility", permissions: "Manage Guild", aliases: "N/A", syntax: "embed save [name] [code]", example: "embed save template_name {embed}$v{title: Hello}" },
  { name: "embed send", description: "Send a saved template to a channel", category: "Utility", permissions: "Manage Guild", aliases: "N/A", syntax: "embed send [channel] [name]", example: "embed send #general welcome" },
  { name: "embed syntax", description: "Show embed DSL syntax and examples", category: "Utility", permissions: "N/A", aliases: "N/A", syntax: "embed syntax", example: "N/A" },
  { name: "embed variables", description: "Show available variables for embeds", category: "Utility", permissions: "N/A", aliases: "vars", syntax: "embed variables", example: "N/A" },
  { name: "invites", description: "View invite statistics", category: "Invites", permissions: "N/A", aliases: "invitetracker, invt, it", syntax: "invites (member)", example: "invites @curet" },
  { name: "invites invited", description: "Show users invited by someone", category: "Invites", permissions: "N/A", aliases: "N/A", syntax: "invites invited [member]", example: "invites invited @curet" },
  { name: "invites inviter", description: "Show who invited a user", category: "Invites", permissions: "N/A", aliases: "invited-by", syntax: "invites inviter [member]", example: "invites inviter @curet" },
  { name: "invites leaderboard", description: "Show top inviters", category: "Invites", permissions: "N/A", aliases: "lb, top", syntax: "invites leaderboard", example: "N/A" },
  { name: "fm", description: "Shows your currently playing song", category: "Lastfm", permissions: "N/A", aliases: "N/A", syntax: "fm (user)", example: "fm @curet" },
  { name: "lastfm", description: "Last.fm integration commands", category: "Lastfm", permissions: "N/A", aliases: "lf, lfm", syntax: "lastfm", example: "N/A" },
  { name: "lastfm count", description: "View total scrobbles", category: "Lastfm", permissions: "N/A", aliases: "total", syntax: "lastfm count (user)", example: "lastfm count @curet" },
  { name: "lastfm crowns", description: "View your crowns", category: "Lastfm", permissions: "N/A", aliases: "N/A", syntax: "lastfm crowns (user)", example: "lastfm crowns @curet" },
  { name: "lastfm customreactions", description: "Set personal NP reaction emojis", category: "Lastfm", permissions: "N/A", aliases: "customreact, cr", syntax: "lastfm customreactions (upvote) (downvote)", example: "lastfm customreactions 👍 👎" },
  { name: "lastfm favorites", description: "View your loved tracks", category: "Lastfm", permissions: "N/A", aliases: "favs, likes, liked, loved", syntax: "lastfm favorites (user)", example: "lastfm favorites @curet" },
  { name: "lastfm globalboard", description: "Global reaction scoreboard", category: "Lastfm", permissions: "N/A", aliases: "gboard, gb", syntax: "lastfm globalboard", example: "N/A" },
  { name: "lastfm globalwhoknows", description: "Top listeners for an artist globally", category: "Lastfm", permissions: "N/A", aliases: "globalwk, gwk", syntax: "lastfm globalwhoknows (query)", example: "lastfm globalwhoknows Drake" },
  { name: "lastfm globalwkalbum", description: "Top listeners for an album globally", category: "Lastfm", permissions: "N/A", aliases: "globalwka, gwka", syntax: "lastfm globalwkalbum (query)", example: "lastfm globalwkalbum God's Plan" },
  { name: "lastfm globalwktrack", description: "Top listeners for a track globally", category: "Lastfm", permissions: "N/A", aliases: "globalwkt, gwkt", syntax: "lastfm globalwktrack (query)", example: "lastfm globalwktrack God's Plan" },
  { name: "lastfm milestone", description: "See what track a scrobble milestone was", category: "Lastfm", permissions: "N/A", aliases: "N/A", syntax: "lastfm milestone (member) (milestone)", example: "lastfm milestone @curet 5000" },
  { name: "lastfm mostcrowns", description: "Members with the most crowns", category: "Lastfm", permissions: "N/A", aliases: "allcrowns, crownsall, crownslb", syntax: "lastfm mostcrowns", example: "N/A" },
  { name: "lastfm now", description: "Shows your currently playing song", category: "Lastfm", permissions: "N/A", aliases: "fm", syntax: "lastfm now (user)", example: "lastfm now @curet" },
  { name: "lastfm overview", description: "View your Last.fm overview", category: "Lastfm", permissions: "N/A", aliases: "ov", syntax: "lastfm overview (user)", example: "lastfm overview @curet" },
  { name: "lastfm playing", description: "See what everyone in the server is listening to", category: "Lastfm", permissions: "N/A", aliases: "N/A", syntax: "lastfm playing", example: "N/A" },
  { name: "lastfm plays", description: "Check plays for an artist", category: "Lastfm", permissions: "N/A", aliases: "N/A", syntax: "lastfm plays (query)", example: "lastfm plays Drake" },
  { name: "lastfm playsalbum", description: "Check plays for an album", category: "Lastfm", permissions: "N/A", aliases: "playsa, aplays", syntax: "lastfm playsalbum (query)", example: "lastfm playsalbum God's Plan" },
  { name: "lastfm playstrack", description: "Check plays for a track", category: "Lastfm", permissions: "N/A", aliases: "playst, tplays", syntax: "lastfm playstrack (query)", example: "lastfm playstrack God's Plan" },
  { name: "lastfm recent", description: "View your recent tracks", category: "Lastfm", permissions: "N/A", aliases: "recenttracks, last, lp", syntax: "lastfm recent (user)", example: "lastfm recent @curet" },
  { name: "lastfm recentfor", description: "View recent tracks for a mentioned user", category: "Lastfm", permissions: "N/A", aliases: "N/A", syntax: "lastfm recentfor [user]", example: "lastfm recentfor @curet" },
  { name: "lastfm score", description: "View your NP reaction score", category: "Lastfm", permissions: "N/A", aliases: "stats, statistics", syntax: "lastfm score (user)", example: "lastfm score @curet" },
  { name: "lastfm scoreboard", description: "Server reaction scoreboard", category: "Lastfm", permissions: "N/A", aliases: "leaderboard, sb, serverboard", syntax: "lastfm scoreboard", example: "N/A" },
  { name: "lastfm streak", description: "View your current listening streak", category: "Lastfm", permissions: "N/A", aliases: "N/A", syntax: "lastfm streak (user)", example: "lastfm streak @curet" },
  { name: "lastfm taste", description: "Compare music taste with another user", category: "Lastfm", permissions: "N/A", aliases: "N/A", syntax: "lastfm taste [user]", example: "lastfm taste @curet" },
  { name: "lastfm topalbums", description: "View your most listened to albums", category: "Lastfm", permissions: "N/A", aliases: "tab, album, topalbum, albums, tl", syntax: "lastfm topalbums (period) (user)", example: "lastfm topalbums 7d, 1m, 3m, 6m, 1y @curet" },
  { name: "lastfm topartists", description: "View your most listened to artists", category: "Lastfm", permissions: "N/A", aliases: "artists, artist, tar, topartist, ta", syntax: "lastfm topartists (period) (user)", example: "lastfm topartists 7d, 1m, 3m, 6m, 1y @curet" },
  { name: "lastfm toptenalbums", description: "View your most listened to albums", category: "Lastfm", permissions: "N/A", aliases: "tta", syntax: "lastfm toptenalbums (period) (user)", example: "lastfm toptenalbums 7d, 1m, 3m, 6m, 1y @curet" },
  { name: "lastfm toptenartists", description: "View your most listened to artists", category: "Lastfm", permissions: "N/A", aliases: "ttar", syntax: "lastfm toptenartists (period) (user)", example: "lastfm toptenartists 7d, 1m, 3m, 6m, 1y @curet" },
  { name: "lastfm toptentracks", description: "View your most listened to tracks", category: "Lastfm", permissions: "N/A", aliases: "ttt", syntax: "lastfm toptentracks (period) (user)", example: "lastfm toptentracks 7d, 1m, 3m, 6m, 1y @curet" },
  { name: "lastfm toptracks", description: "View your most listened to tracks", category: "Lastfm", permissions: "N/A", aliases: "track, tracks, ttr, toptrack, tt", syntax: "lastfm toptracks (period) (user)", example: "lastfm toptracks 7d, 1m, 3m, 6m, 1y @curet" },
  { name: "lastfm whois", description: "View a Last.fm profile", category: "Lastfm", permissions: "N/A", aliases: "profile", syntax: "lastfm whois (user)", example: "lastfm whois @curet" },
  { name: "lastfm whoknows", description: "Top listeners for an artist in this server", category: "Lastfm", permissions: "N/A", aliases: "wk", syntax: "lastfm whoknows (query)", example: "lastfm whoknows Drake" },
  { name: "lastfm wkalbum", description: "Top listeners for an album in this server", category: "Lastfm", permissions: "N/A", aliases: "wka, whoknowsalbum", syntax: "lastfm wkalbum (query)", example: "lastfm wkalbum God's Plan" },
  { name: "lastfm wktrack", description: "Top listeners for a track in this server", category: "Lastfm", permissions: "N/A", aliases: "wkt, whoknowstrack", syntax: "lastfm wktrack (query)", example: "lastfm wktrack God's Plan" },
  { name: "level", description: "Leveling commands", category: "Leveling", permissions: "N/A", aliases: "lv", syntax: "level", example: "N/A" },
  { name: "level leaderboard", description: "Shows the server Level leaderboard", category: "Leveling", permissions: "N/A", aliases: "lb, top", syntax: "level leaderboard", example: "N/A" },
  { name: "level rank", description: "Shows your level and XP", category: "Leveling", permissions: "N/A", aliases: "r", syntax: "level rank (member)", example: "level rank @curet" },
  { name: "rank", description: "Shows your level and XP", category: "Leveling", permissions: "N/A", aliases: "lvl", syntax: "rank (member)", example: "rank @curet" },
  { name: "ban", description: "Ban a member from the server", category: "Moderation", permissions: "Ban Members", aliases: "N/A", syntax: "ban [member] (reason)", example: "ban @curet insulting" },
  { name: "kick", description: "Kick a member from the server", category: "Moderation", permissions: "Kick Members", aliases: "N/A", syntax: "kick [member] (reason)", example: "kick @curet breaking rules" },
  { name: "tempban", description: "Temporarily ban a member from the server", category: "Moderation", permissions: "Ban Members", aliases: "N/A", syntax: "tempban [member] (duration) (reason)", example: "tempban @curet 7d insulting" },
  { name: "timeout", description: "Timeout a member", category: "Moderation", permissions: "Moderate Members", aliases: "mute", syntax: "timeout [member] (duration) (reason)", example: "timeout @curet 1h spamming" },
  { name: "unban", description: "Unban a user from the server", category: "Moderation", permissions: "Ban Members", aliases: "N/A", syntax: "unban [user] (reason)", example: "unban 335500798752456705 appealed" },
  { name: "untimeout", description: "Remove a member's timeout", category: "Moderation", permissions: "Moderate Members", aliases: "unmute", syntax: "untimeout [member] (reason)", example: "untimeout @curet resolved" },
  { name: "warn", description: "Warn a member", category: "Moderation", permissions: "Moderate Members", aliases: "N/A", syntax: "warn [member] (reason)", example: "warn @curet breaking rules" },
  { name: "purge", description: "Delete messages from a channel", category: "Moderation", permissions: "Manage Messages", aliases: "prune, c", syntax: "purge (count) (member)", example: "purge 100 @curet" },
  { name: "purge activity", description: "Delete system/activity messages", category: "Moderation", permissions: "Manage Messages", aliases: "activities", syntax: "purge activity (search)", example: "purge activity 100" },
  { name: "purge after", description: "Delete messages after a message", category: "Moderation", permissions: "Manage Messages", aliases: "N/A", syntax: "purge after [message]", example: "purge after https://discord.com/channels/.../123" },
  { name: "purge before", description: "Delete messages before a message", category: "Moderation", permissions: "Manage Messages", aliases: "N/A", syntax: "purge before [message]", example: "purge before https://discord.com/channels/.../123" },
  { name: "purge between", description: "Delete messages between two messages", category: "Moderation", permissions: "Manage Messages", aliases: "bt", syntax: "purge between [start] [finish]", example: "purge between https://discord.com/.../123 https://discord.com/.../456" },
  { name: "purge bots", description: "Delete messages from bots", category: "Moderation", permissions: "Manage Messages", aliases: "N/A", syntax: "purge bots (search)", example: "purge bots 100" },
  { name: "purge contains", description: "Delete messages containing a substring", category: "Moderation", permissions: "Manage Messages", aliases: "N/A", syntax: "purge contains [substring] (search)", example: "purge contains ! 100" },
  { name: "purge embeds", description: "Delete messages with embeds", category: "Moderation", permissions: "Manage Messages", aliases: "embed", syntax: "purge embeds (search)", example: "purge embeds 100" },
  { name: "purge emoji", description: "Delete messages with emojis", category: "Moderation", permissions: "Manage Messages", aliases: "emojis", syntax: "purge emoji (search)", example: "purge emoji 100" },
  { name: "purge emotes", description: "Delete messages with custom emotes", category: "Moderation", permissions: "Manage Messages", aliases: "emote", syntax: "purge emotes (search)", example: "purge emotes 100" },
  { name: "purge endswith", description: "Delete messages ending with a substring", category: "Moderation", permissions: "Manage Messages", aliases: "N/A", syntax: "purge endswith [substring] (search)", example: "purge endswith ! 100" },
  { name: "purge files", description: "Delete messages with attachments", category: "Moderation", permissions: "Manage Messages", aliases: "N/A", syntax: "purge files (search)", example: "purge files 100" },
  { name: "purge humans", description: "Delete messages from humans", category: "Moderation", permissions: "Manage Messages", aliases: "N/A", syntax: "purge humans (search)", example: "purge humans 100" },
  { name: "purge images", description: "Delete messages with images", category: "Moderation", permissions: "Manage Messages", aliases: "N/A", syntax: "purge images (search)", example: "purge images 100" },
  { name: "purge links", description: "Delete messages with links", category: "Moderation", permissions: "Manage Messages", aliases: "N/A", syntax: "purge links (search)", example: "purge links 100" },
  { name: "purge mentions", description: "Delete messages mentioning a member", category: "Moderation", permissions: "Manage Messages", aliases: "N/A", syntax: "purge mentions [member] (search)", example: "purge mentions @curet 100" },
  { name: "purge reactions", description: "Remove reactions from messages", category: "Moderation", permissions: "Manage Messages", aliases: "N/A", syntax: "purge reactions (search)", example: "purge reactions 100" },
  { name: "purge startswith", description: "Delete messages starting with a substring", category: "Moderation", permissions: "Manage Messages", aliases: "N/A", syntax: "purge startswith [substring] (search)", example: "purge startswith ! 100" },
  { name: "purge stickers", description: "Delete messages with stickers", category: "Moderation", permissions: "Manage Messages", aliases: "N/A", syntax: "purge stickers (search)", example: "purge stickers 100" },
  { name: "purge upto", description: "Delete messages up to a message", category: "Moderation", permissions: "Manage Messages", aliases: "N/A", syntax: "purge upto [message]", example: "purge upto https://discord.com/channels/.../123" },
  { name: "purge webhooks", description: "Delete messages from webhooks", category: "Moderation", permissions: "Manage Messages", aliases: "N/A", syntax: "purge webhooks (search)", example: "purge webhooks 100" },
  { name: "filter", description: "Apply an audio filter", category: "Music", permissions: "N/A", aliases: "N/A", syntax: "filter (name)", example: "filter bassboost" },
  { name: "move", description: "Move a song in the queue", category: "Music", permissions: "N/A", aliases: "N/A", syntax: "move [from] [to]", example: "move 3 1" },
  { name: "nowplaying", description: "Show the currently playing song", category: "Music", permissions: "N/A", aliases: "np", syntax: "nowplaying", example: "N/A" },
  { name: "pause", description: "Pause the current song", category: "Music", permissions: "N/A", aliases: "N/A", syntax: "pause", example: "N/A" },
  { name: "play", description: "Play a song or add it to the queue", category: "Music", permissions: "N/A", aliases: "p", syntax: "play [query]", example: "play Daft Punk - Around the World" },
  { name: "queue", description: "Show the current queue", category: "Music", permissions: "N/A", aliases: "q", syntax: "queue", example: "N/A" },
  { name: "remove", description: "Remove a song from the queue", category: "Music", permissions: "N/A", aliases: "N/A", syntax: "remove [position]", example: "remove 3" },
  { name: "repeat", description: "Set the repeat mode", category: "Music", permissions: "N/A", aliases: "loop", syntax: "repeat [mode]", example: "repeat track" },
  { name: "resume", description: "Resume the current song", category: "Music", permissions: "N/A", aliases: "N/A", syntax: "resume", example: "N/A" },
  { name: "seek", description: "Seek to a position in the current song", category: "Music", permissions: "N/A", aliases: "N/A", syntax: "seek [time]", example: "seek 1:30" },
  { name: "shuffle", description: "Shuffle the queue", category: "Music", permissions: "N/A", aliases: "N/A", syntax: "shuffle", example: "N/A" },
  { name: "skip", description: "Skip the current song", category: "Music", permissions: "N/A", aliases: "sk", syntax: "skip", example: "N/A" },
  { name: "stop", description: "Stop playing and clear the queue", category: "Music", permissions: "N/A", aliases: "disconnect, dc, leave", syntax: "stop", example: "N/A" },
  { name: "volume", description: "Set the volume", category: "Music", permissions: "N/A", aliases: "vol", syntax: "volume [level]", example: "volume 80" },
  { name: "botinfo", description: "Shows information about the bot", category: "Other", permissions: "N/A", aliases: "bi, bot, about", syntax: "botinfo", example: "N/A" },
  { name: "channelinfo", description: "Shows information about a channel", category: "Other", permissions: "N/A", aliases: "ci", syntax: "channelinfo (channel)", example: "channelinfo #general" },
  { name: "clearguildnames", description: "Clear the server's name history", category: "Other", permissions: "Administrator", aliases: "cleargnames", syntax: "clearguildnames", example: "N/A" },
  { name: "clearnames", description: "Clear your own name history", category: "Other", permissions: "N/A", aliases: "N/A", syntax: "clearnames", example: "N/A" },
  { name: "clearsnipe", description: "Clears all snipe data for this channel", category: "Other", permissions: "Manage Messages", aliases: "clearsnipes, cs", syntax: "clearsnipe", example: "N/A" },
  { name: "editsnipe", description: "Shows a recently edited message", category: "Other", permissions: "N/A", aliases: "es", syntax: "editsnipe", example: "N/A" },
  { name: "guildbanner", description: "Shows the server banner", category: "Other", permissions: "N/A", aliases: "serverbanner, gbanner", syntax: "guildbanner", example: "N/A" },
  { name: "guildicon", description: "Shows the server icon", category: "Other", permissions: "N/A", aliases: "icon, servericon", syntax: "guildicon", example: "N/A" },
  { name: "guildnames", description: "Shows the name change history of the server", category: "Other", permissions: "N/A", aliases: "gnames", syntax: "guildnames", example: "N/A" },
  { name: "guildowners", description: "Shows the owner change history of the server", category: "Other", permissions: "N/A", aliases: "gowners", syntax: "guildowners", example: "N/A" },
  { name: "guildsplash", description: "Shows the server invite splash image", category: "Other", permissions: "N/A", aliases: "splash, serversplash", syntax: "guildsplash", example: "N/A" },
  { name: "help", description: "Shows an overview of all commands", category: "Other", permissions: "N/A", aliases: "h, commands", syntax: "help (command)", example: "help help" },
  { name: "inrole", description: "Lists all members with a specific role", category: "Other", permissions: "N/A", aliases: "ir, rolemembers", syntax: "inrole [role]", example: "inrole @moderator" },
  { name: "membercount", description: "Shows the member count of the server", category: "Other", permissions: "N/A", aliases: "mc, members", syntax: "membercount", example: "N/A" },
  { name: "names", description: "Shows the name and nickname history of a user", category: "Other", permissions: "N/A", aliases: "N/A", syntax: "names (user)", example: "names @curet" },
  { name: "ping", description: "Shows the bot's latency", category: "Other", permissions: "N/A", aliases: "pong", syntax: "ping", example: "N/A" },
  { name: "reactionhistory", description: "Shows all logged reactions for a message", category: "Other", permissions: "Manage Messages", aliases: "rh", syntax: "reactionhistory [message]", example: "reactionhistory https://discord.com/.../123" },
  { name: "reactionsnipe", description: "Shows the latest removed reaction", category: "Other", permissions: "N/A", aliases: "rs", syntax: "reactionsnipe", example: "N/A" },
  { name: "roleinfo", description: "Shows information about a role", category: "Other", permissions: "N/A", aliases: "ri", syntax: "roleinfo [role]", example: "roleinfo @moderator" },
  { name: "serveravatar", description: "Shows the server-specific avatar of a member", category: "Other", permissions: "N/A", aliases: "sav, serverpfp, memberavatar", syntax: "serveravatar (member)", example: "serveravatar @curet" },
  { name: "serverbanner", description: "Shows the server-specific banner of a member", category: "Other", permissions: "N/A", aliases: "sbn, memberbanner", syntax: "serverbanner (member)", example: "serverbanner @curet" },
  { name: "serverinfo", description: "Shows information about the server", category: "Other", permissions: "N/A", aliases: "si", syntax: "serverinfo (server)", example: "serverinfo 335500798752456705" },
  { name: "snipe", description: "Shows a recently deleted message", category: "Other", permissions: "N/A", aliases: "s", syntax: "snipe", example: "N/A" },
  { name: "steal", description: "Steal an emoji from another server", category: "Other", permissions: "Manage Guild Expressions", aliases: "addemoji, stealemoji", syntax: "steal (emoji) (name)", example: "steal :emoji: custom_name" },
  { name: "translate", description: "Translate text to another language", category: "Other", permissions: "N/A", aliases: "tr", syntax: "translate [language] (text)", example: "translate en Hello World" },
  { name: "userinfo", description: "Shows information about a user or member", category: "Other", permissions: "N/A", aliases: "ui, whois", syntax: "userinfo (member)", example: "userinfo @curet" },
  { name: "role", description: "Modify a member's roles", category: "Utility", permissions: "Manage Roles", aliases: "r", syntax: "role [member] [roles]", example: "role @curet @admin, @mod" },
  { name: "role add", description: "Add a role to a member", category: "Utility", permissions: "Manage Roles", aliases: "set, give", syntax: "role add [member] [role]", example: "role add @curet @moderator" },
  { name: "role bots add", description: "Add a role to all bots", category: "Utility", permissions: "Manage Roles", aliases: "N/A", syntax: "role bots add [role]", example: "role bots add @bot" },
  { name: "role bots remove", description: "Remove a role from all bots", category: "Utility", permissions: "Manage Roles", aliases: "N/A", syntax: "role bots remove [role]", example: "role bots remove @bot" },
  { name: "role cancel", description: "Cancel a running mass role task", category: "Utility", permissions: "Manage Roles", aliases: "kill", syntax: "role cancel", example: "N/A" },
  { name: "role color", description: "Set a color or gradient for a role", category: "Utility", permissions: "Manage Roles", aliases: "colour", syntax: "role color [role] [colour1] (colour2)", example: "role color @moderator #ff0000 #0000ff" },
  { name: "role create", description: "Create a role with optional color", category: "Utility", permissions: "Manage Roles", aliases: "make", syntax: "role create (colour) [name]", example: "role create #ff0000 New Role" },
  { name: "role delete", description: "Delete a role", category: "Utility", permissions: "Manage Roles", aliases: "del", syntax: "role delete [role]", example: "role delete @moderator" },
  { name: "role edit", description: "Change a role name", category: "Utility", permissions: "Manage Roles", aliases: "editname, rename", syntax: "role edit [role] [name]", example: "role edit @moderator Admin" },
  { name: "role has add", description: "Add a role to members with a specific role", category: "Utility", permissions: "Manage Roles", aliases: "N/A", syntax: "role has add [filter_role] [assign_role]", example: "role has add @member @verified" },
  { name: "role has remove", description: "Remove a role from members with a specific role", category: "Utility", permissions: "Manage Roles", aliases: "N/A", syntax: "role has remove [filter_role] [remove_role]", example: "role has remove @member @verified" },
  { name: "role hoist", description: "Toggle hoisting a role", category: "Utility", permissions: "Manage Roles", aliases: "N/A", syntax: "role hoist [role]", example: "role hoist @moderator" },
  { name: "role humans add", description: "Add a role to all humans", category: "Utility", permissions: "Manage Roles", aliases: "N/A", syntax: "role humans add [role]", example: "role humans add @member" },
  { name: "role humans remove", description: "Remove a role from all humans", category: "Utility", permissions: "Manage Roles", aliases: "N/A", syntax: "role humans remove [role]", example: "role humans remove @member" },
  { name: "role icon", description: "Set an icon for a role", category: "Utility", permissions: "Manage Roles", aliases: "N/A", syntax: "role icon [icon] [role]", example: "role icon https://example.com/icon.png @moderator" },
  { name: "role mentionable", description: "Toggle mentioning a role", category: "Utility", permissions: "Manage Roles", aliases: "mention", syntax: "role mentionable [role]", example: "role mentionable @moderator" },
  { name: "role remove", description: "Remove a role from a member", category: "Utility", permissions: "Manage Roles", aliases: "rmv, take", syntax: "role remove [member] [role]", example: "role remove @curet @moderator" },
  { name: "role restore", description: "Restore roles to a member", category: "Utility", permissions: "Manage Roles", aliases: "N/A", syntax: "role restore [member]", example: "role restore @curet" },
  { name: "bump", description: "Bump your server on the server list", category: "Serverlist", permissions: "N/A", aliases: "b", syntax: "bump", example: "N/A" },
  { name: "bump leaderboard", description: "View the bump leaderboard", category: "Serverlist", permissions: "N/A", aliases: "lb, top", syntax: "bump leaderboard", example: "N/A" },
  { name: "bump up", description: "Bump your server", category: "Serverlist", permissions: "N/A", aliases: "N/A", syntax: "bump up", example: "N/A" },
  { name: "language", description: "Change the bot language", category: "Settings", permissions: "N/A", aliases: "lang", syntax: "language", example: "N/A" },
  { name: "language server set", description: "Change the server language", category: "Settings", permissions: "Manage Guild", aliases: "N/A", syntax: "language server set [language]", example: "language server set en" },
  { name: "language server view", description: "View the current server language", category: "Settings", permissions: "N/A", aliases: "N/A", syntax: "language server view", example: "N/A" },
  { name: "language user reset", description: "Reset your personal language to the server default", category: "Settings", permissions: "N/A", aliases: "N/A", syntax: "language user reset", example: "N/A" },
  { name: "language user set", description: "Change your personal language", category: "Settings", permissions: "N/A", aliases: "N/A", syntax: "language user set [language]", example: "language user set en" },
  { name: "language user view", description: "View your current language", category: "Settings", permissions: "N/A", aliases: "N/A", syntax: "language user view", example: "N/A" },
  { name: "prefix", description: "Change the bot prefix", category: "Settings", permissions: "N/A", aliases: "pre", syntax: "prefix", example: "N/A" },
  { name: "prefix remove", description: "Reset the server prefix to the default", category: "Settings", permissions: "Manage Guild", aliases: "N/A", syntax: "prefix remove", example: "N/A" },
  { name: "prefix self remove", description: "Remove your personal prefix", category: "Settings", permissions: "N/A", aliases: "N/A", syntax: "prefix self remove", example: "N/A" },
  { name: "prefix self set", description: "Set your personal prefix", category: "Settings", permissions: "N/A", aliases: "N/A", syntax: "prefix self set [prefix]", example: "prefix self set !" },
  { name: "prefix set", description: "Change the server prefix", category: "Settings", permissions: "Manage Guild", aliases: "N/A", syntax: "prefix set [prefix]", example: "prefix set !" },
  { name: "ticket", description: "Manage tickets", category: "Tickets", permissions: "N/A", aliases: "N/A", syntax: "ticket", example: "N/A" },
  { name: "ticket add", description: "Add a user to the current ticket", category: "Tickets", permissions: "N/A", aliases: "N/A", syntax: "ticket add [user]", example: "ticket add @curet" },
  { name: "ticket claim", description: "Claim the current ticket", category: "Tickets", permissions: "N/A", aliases: "N/A", syntax: "ticket claim", example: "N/A" },
  { name: "ticket close", description: "Close the current ticket", category: "Tickets", permissions: "N/A", aliases: "N/A", syntax: "ticket close", example: "N/A" },
  { name: "ticket delete", description: "Delete the current ticket", category: "Tickets", permissions: "N/A", aliases: "N/A", syntax: "ticket delete (reason)", example: "ticket delete Spam" },
  { name: "ticket remove", description: "Remove a user from the current ticket", category: "Tickets", permissions: "N/A", aliases: "N/A", syntax: "ticket remove [user]", example: "ticket remove @curet" },
  { name: "ticket rename", description: "Rename the current ticket channel", category: "Tickets", permissions: "N/A", aliases: "N/A", syntax: "ticket rename [name]", example: "ticket rename new-name" },
  { name: "ticket reopen", description: "Reopen the current ticket", category: "Tickets", permissions: "N/A", aliases: "N/A", syntax: "ticket reopen", example: "N/A" },
  { name: "ticket unclaim", description: "Unclaim the current ticket", category: "Tickets", permissions: "N/A", aliases: "N/A", syntax: "ticket unclaim", example: "N/A" },
  { name: "voice", description: "Manage your temporary voice channel", category: "Voice", permissions: "N/A", aliases: "vc", syntax: "voice", example: "N/A" },
  { name: "voice bitrate", description: "Set the channel bitrate", category: "Voice", permissions: "N/A", aliases: "N/A", syntax: "voice bitrate [kbps]", example: "voice bitrate 64" },
  { name: "voice claim", description: "Claim ownership of the channel if the owner left", category: "Voice", permissions: "N/A", aliases: "N/A", syntax: "voice claim", example: "N/A" },
  { name: "voice hide", description: "Hide your channel from everyone", category: "Voice", permissions: "N/A", aliases: "N/A", syntax: "voice hide", example: "N/A" },
  { name: "voice limit", description: "Set the user limit for your channel", category: "Voice", permissions: "N/A", aliases: "N/A", syntax: "voice limit [limit]", example: "voice limit 5" },
  { name: "voice lock", description: "Lock your channel so no one can join", category: "Voice", permissions: "N/A", aliases: "N/A", syntax: "voice lock", example: "N/A" },
  { name: "voice name", description: "Rename your channel", category: "Voice", permissions: "N/A", aliases: "N/A", syntax: "voice name [name]", example: "voice name My Channel" },
  { name: "voice permit", description: "Allow users to view and join your channel", category: "Voice", permissions: "N/A", aliases: "N/A", syntax: "voice permit [users]", example: "voice permit @curet, @visics" },
  { name: "voice preset autoload", description: "Set a preset to auto-load when you create a channel", category: "Voice", permissions: "N/A", aliases: "N/A", syntax: "voice preset autoload [name]", example: "voice preset autoload my-preset" },
  { name: "voice preset delete", description: "Delete a preset", category: "Voice", permissions: "N/A", aliases: "N/A", syntax: "voice preset delete [name]", example: "voice preset delete my-preset" },
  { name: "voice preset edit", description: "Update a preset with current channel settings", category: "Voice", permissions: "N/A", aliases: "N/A", syntax: "voice preset edit [name]", example: "voice preset edit my-preset" },
  { name: "voice preset info", description: "View details of a preset", category: "Voice", permissions: "N/A", aliases: "N/A", syntax: "voice preset info [name]", example: "voice preset info my-preset" },
  { name: "voice preset list", description: "List all your presets", category: "Voice", permissions: "N/A", aliases: "N/A", syntax: "voice preset list", example: "N/A" },
  { name: "voice preset save", description: "Save current channel settings as a preset", category: "Voice", permissions: "N/A", aliases: "N/A", syntax: "voice preset save [name]", example: "voice preset save my-preset" },
  { name: "voice reject", description: "Remove user permissions from your channel", category: "Voice", permissions: "N/A", aliases: "N/A", syntax: "voice reject [users]", example: "voice reject @curet, @visics" },
  { name: "voice status", description: "Set the voice channel status", category: "Voice", permissions: "N/A", aliases: "N/A", syntax: "voice status (text)", example: "voice status Playing games" },
  { name: "voice transfer", description: "Transfer channel ownership to another user", category: "Voice", permissions: "N/A", aliases: "N/A", syntax: "voice transfer [user]", example: "voice transfer @curet" },
  { name: "voice unhide", description: "Make your channel visible again", category: "Voice", permissions: "N/A", aliases: "N/A", syntax: "voice unhide", example: "N/A" },
  { name: "voice unlock", description: "Unlock your channel so everyone can join", category: "Voice", permissions: "N/A", aliases: "N/A", syntax: "voice unlock", example: "N/A" },
];

export default function CommandsPage() {
  const [category, setCategory] = useState("All");

  const filtered = category === "All" ? commands : commands.filter((cmd) => cmd.category === category);

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-foreground">Commands</h1>
        <p className="mt-2 text-muted-foreground">
          Browse all available bot commands and their usage.
        </p>
      </div>

      <div className="mt-8 flex items-center gap-4">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-lg border border-border bg-secondary px-4 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        >
          <option value="All">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <span className="text-sm text-muted-foreground">
          {filtered.length} command{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((cmd) => (
          <div
            key={cmd.name}
            className="border-border/50 from-card to-background hover:border-border/80 relative rounded-[2rem] border bg-linear-to-br p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06),0_1px_3px_rgba(0,0,0,0.3),inset_0_-1px_1px_rgba(0,0,0,0.2)] transition-all duration-300 before:absolute before:inset-0 before:-z-10 before:rounded-[1.5rem] before:bg-linear-to-b before:from-white/[0.02] before:to-transparent after:absolute after:inset-0 after:z-[-1] after:rounded-[2rem] after:bg-linear-to-t after:from-black/30 after:to-transparent"
          >
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-semibold text-foreground">{cmd.name}</h3>
              <span
                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${categoryColors[cmd.category] || "bg-gray-500/15 text-gray-400"}`}
              >
                {cmd.category}
              </span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{cmd.description}</p>
            <div className="mt-4 flex flex-col gap-1.5">
              {cmd.permissions !== "N/A" && (
                <div className="text-xs text-muted-foreground">
                  <span className="font-medium">Permissions:</span> {cmd.permissions}
                </div>
              )}
              {cmd.aliases !== "N/A" && (
                <div className="text-xs text-muted-foreground">
                  <span className="font-medium">Aliases:</span> {cmd.aliases}
                </div>
              )}
            </div>
            <div className="mt-3 flex flex-col gap-2">
              <div>
                <span className="text-xs text-muted-foreground">Syntax</span>
                <div className="mt-1 bg-secondary/60 rounded-lg px-3 py-1.5 text-xs font-mono">
                  {cmd.syntax}
                </div>
              </div>
              <div>
                <span className="text-xs text-muted-foreground">Example</span>
                {cmd.example !== "N/A" ? (
                  <div className="mt-1 bg-secondary/60 rounded-lg px-3 py-1.5 text-xs font-mono">
                    {cmd.example}
                  </div>
                ) : (
                  <div className="mt-1 text-xs text-muted-foreground">N/A</div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
