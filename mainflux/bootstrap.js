const axios = require('axios');

class  Bootstrap{
    constructor(bootstraps_url){
        this.bootstraps_url = bootstraps_url;
        this.content_type = "application/json";
        this.bootstrapsEndpoint = "configs";
    }

    Create(config, token){
        const options = {
            method: "post",
            maxBodyLength: Infinity,
            url: `${this.bootstraps_url}/things/${this.bootstrapsEndpoint}`,
            headers: {
                "Content-Type": this.content_type,
                Authorization: `Bearer ${token}`,
            },
            data: JSON.stringify(config),
        };
        return axios.request(options)
            .then((_response) => {
                return "Configuration added";
            })
            .catch((error) => {
                return error.response.data;
            })
    }

    Whitelist(config, token){
        const options = {
            method: "put",
            maxBodyLength: Infinity,
            url: `${this.bootstraps_url}/things/state/${config["thing_id"]}`,
            headers: {
                "Content-Type": this.content_type,
                Authorization: `Bearer ${token}`,
            },
            data: JSON.stringify(config),
        };
        return axios.request(options)
            .then((_response) => {
                return "Configuration updated";
            })
            .catch((error) => {
                return error.response.data;
            })
    }

    Update(config, token){
        const options = {
            method: "put",
            maxBodyLength: Infinity,
            url: `${this.bootstraps_url}/configs/${config["thing_id"]}`,
            headers: {
                "Content-Type": this.content_type,
                Authorization: `Bearer ${token}`,
            },
            data: JSON.stringify(config),
        };
        return axios.request(options)
            .then((_response) => {
                return "Configuration updated";
            })
            .catch((error) => {
                return error.response.data;
            })
    }

    View(config, token){
        const options = {
            method: "get",
            maxBodyLength: Infinity,
            url: `${this.bootstraps_url}/things/${this.bootstrapsEndpoint}/${thing_id}`,
            headers: {
                "Content-Type": this.content_type,
                Authorization: `Bearer ${token}`,
            },
            data: JSON.stringify(config),
        };
        return axios.request(options)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                return error.response.data;
            })
    }

    UpdateCerts(config_id,client_cert,client_key, ca, token){
        const payload = {
            "client_cert": client_cert,
            "client_key": client_key,
            "ca_cert": ca,
        }
        const options = {
            method: "patch",
            maxBodyLength: Infinity,
            url: `${this.bootstraps_url}/${this.bootstrapsEndpoint}/${config_id}`,
            headers: {
                "Content-Type": this.content_type,
                Authorization: `Bearer ${token}`,
            },
            data: JSON.stringify(payload),
        };
        return axios.request(options)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                return error.response.data;
            })
    }

    Remove(config_id, token){
        const options = {
            method: "delete",
            maxBodyLength: Infinity,
            url: `${this.bootstraps_url}/things/${this.bootstrapsEndpoint}/${config_id}`,
            headers: {
                "Content-Type": this.content_type,
                Authorization: `Bearer ${token}`,
            },
            data: JSON.stringify(config),
        };
        return axios.request(options)
            .then((response) => {
                return "Configuration removed";
            })
            .catch((error) => {
                return error.response.data;
            })
    }

    Bootstrap(external_id, external_key){
        const options = {
            method: "get",
            maxBodyLength: Infinity,
            url: `${this.bootstraps_url}/things/bootstrap/${external_id}`,
            headers: {
                "Content-Type": this.content_type,
                Authorization: `Thing ${external_key}`,
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

}

module.exports = Bootstrap;
