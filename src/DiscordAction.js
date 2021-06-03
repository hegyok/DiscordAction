const fetch = require('node-fetch');

const apps = {
    'youtube':   '755600276941176913', 
    'poker':     '755827207812677713',
    'betrayal':  '773336526917861400',
    'fishing':   '814288819477020702',
    'chess':     '832012586023256104' 
}

/**
 * class for DiscordActions\
 */
class DiscordAction{
    /**
     * Create a new DiscordAction instance
     * @param {string} token You discord bot token
     */
    constructor(token){
        if(!token)  throw new Error(`No token was provided`)
        this.token = token;
    }

    /**
     * 
     * @param {string} voiceChannelId Discord voice channel id
     * @param {string} option youtube/poker/betrayal/fishing/chess or custom application ID
     */
    createInvite = async (voiceChannelId, option) => {
        let appid = apps[option] || option;
        try{
            fetch(`https://discord.com/api/v8/channels/${voiceChannelId}/invites`, {
                method: 'post',
                body: JSON.stringify({
                    max_age: 86400,
                    max_uses: 0,
                    target_application_id: appid,
                    target_type: 2,
                    temporary: false,
                    validate: null
                }),
                headers: {
                    'Authorization' : `Bot ${this.token}`,
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json()).then(inv => {
                if(inv.error || !inv.code){
                    throw new Error(`An error has occured`)
                }
                return `https://discord.com/invite/${inv.code}`;
            })
        }catch(e){
            throw new Error(e);
        }
    }
}
module.exports = DiscordAction;