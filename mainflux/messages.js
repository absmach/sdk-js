const axios = require('axios');

class Messages{
    constructor(readers_url, httpadapter_url){
        this.readers_url = readers_url;
        this.httpadapter_url = httpadapter_url;
        this.content_type = 'application/json';
    }

    Send(channel_id, msg, thing_key){
        const chan_name_parts = channel_id.split(".", 2);
        const chan_id = chan_name_parts[0];
        let subtopic = "";

        if (chan_name_parts.length == 2) {
            subtopic = chan_name_parts[1].replace(".", "/", -1);
        }

        const options = {
            method: "post",
            maxBodyLength: Infinity,
            url: `${this.httpadapter_url}/http/channels/${chan_id}/messages/subtopic`,
            headers: {
                "Content-Type": this.content_type,
                Authorization: `Thing ${thing_key}`,
            },
            data: new TextEncoder().encode(msg),
        };
        return axios.request(options)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                return error.response.data;
            })
    }

    Read(channel_id, token){
        const chan_name_parts = channel_id.split(".", 2);
        const chan_id = chan_name_parts[0];
        let subtopic = "";

        if (chan_name_parts.length == 2) {
            subtopic = chan_name_parts[1].replace(".", "/", -1);
        }

        const options = {
            method: "get",
            maxBodyLength: Infinity,
            url: `${this.readers_url}/channels/${chan_id}/messages`,
            headers: {
                "Content-Type": this.content_type,
                Authorization: `Bearer ${token}`,
            },
            params: {"subtopic": subtopic},
        };
        return axios.request(options)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                return error.response.data;
            })
    }
}

module.exports = Messages;
