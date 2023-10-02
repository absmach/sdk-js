// import fetch from "node-fetch";
const axios = require("axios");

class Channels {
    constructor(channels_url) {
        this.channels_url = channels_url;
        this.content_type = "application/json";
        this.channelsEndpoint = "channels";
    }

    Create(channel, token) {
        const options = {
            method: "post",
            maxBodyLength: Infinity,
            url: `${this.channels_url}/${this.channelsEndpoint}`,
            headers: {
                "Content-Type": this.content_type,
                Authorization: `Bearer ${token}`,
            },
            data: JSON.stringify(channel),
        };
        return axios.request(options)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                return error.response.data;
            })
    }

    Create_bulk(channels, token) {

        const options = {
            method: "post",
            maxBodyLength: Infinity,
            url: `${this.channels_url}/${this.channelsEndpoint}/bulk`,
            headers: {
                "Content-Type": this.content_type,
                Authorization: `Bearer ${token}`,
            },
            data: JSON.stringify(channels),
        };
        return axios.request(options)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                return error.response.data;
            })
    }

    Get(channel_id, token) {

        const options = {
            method: "get",
            maxBodyLength: Infinity,
            url: `${this.channels_url}/${this.channelsEndpoint}/${channel_id}`,
            headers: {
                "Content-Type": this.content_type,
                Authorization: `Bearer ${token}`,
            },
        };
        return axios.request(options)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                return error.response.data;
            })
    }

    Get_by_thing(channel_id, query_params, token) {
        //Retrieves list of things connected to specified channel with pagination metadata.

        const options = {
            method: "get",
            maxBodyLength: Infinity,
            url: `${this.channels_url}/${this.channelsEndpoint}/${channel_id}/things?${new URLSearchParams(query_params).toString()}`,
            headers: {
                "Content-Type": this.content_type,
                Authorization: `Bearer ${token}`,
            },
            params: query_params,
        };
        return axios.request(options)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                return error.response.data;
            })
    }

    Get_all(query_params, token) {

        const options = {
            method: "get",
            maxBodyLength: Infinity,
            url: `${this.channels_url}/${this.channelsEndpoint}?${new URLSearchParams(query_params).toString()}`,
            headers: {
                "Content-Type": this.content_type,
                Authorization: `Bearer ${token}`,
            },
        };
        return axios.request(options)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                return error.response.data;
            })
    }

    Update(channel, token) {

        const options = {
            method: "put",
            maxBodyLength: Infinity,
            url: `${this.channels_url}/${this.channelsEndpoint}/${channel["id"]}`,
            headers: {
                "Content-Type": this.content_type,
                Authorization: `Bearer ${token}`,
            },
            data: JSON.stringify(channel),
        };
        return axios.request(options)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                return error.response.data;
            })
    }

    Disable(channel, token) {

        const options = {
            method: "post",
            maxBodyLength: Infinity,
            url: `${this.channels_url}/${this.channelsEndpoint}/${channel["id"]}/disable`,
            headers: {
                "Content-Type": this.content_type,
                Authorization: `Bearer ${token}`,
            },
        };
        return axios.request(options)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                return error.response.data;
            })
    }

    // Identify_thing(thing_key) {
    //     const url = `${this.channels_url}/identify`;
    //     const options = {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": this.content_type,
    //             Authorization: `Bearer ${thing_key}`,
    //         },
    //     };
    //     return axios.request(options)
    // .then((response) => {
    //     return response.data;
    // })
    // .catch((error) => {
    //     return error.response.data;
    // })
    // }

}

// export default Channels;
module.exports = Channels;
