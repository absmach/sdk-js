// import fetch from "node-fetch";
// import Errors from "./errors.js";

const axios = require("axios");

class Certs {
    constructor(certs_url) {
        this.certs_url = certs_url;
        this.content_type = "application/json";
        this.certsEndpoint = "certs";
    }

    Issue(thing_id , valid, token) {
        
        console.log(url);
        const payload= {"thing_id": thing_id, "ttl": valid};
        const options = {
            method: "post",
            maxBodyLength: Infinity,
            url: `${this.certs_url}/${this.certsEndpoint}`,
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

    View_by_thing(thing_id, token) {
        
        console.log(url);
        const options = {
            method: "get",
            maxBodyLength: Infinity,
            url: `${this.certs_url}/serials/${thing_id}`,
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

    View_by_serial(cert_id, token) {
        
        console.log(url);
        const options = {
            method: "get",
            maxBodyLength: Infinity,
            url: `${this.certs_url}/${this.certsEndpoint}/${cert_id}`,
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

    Revoke(thing_id, token) {
        
        console.log(url);
        const options = {
            method: "delete",
            maxBodyLength: Infinity,
            url: `${this.certs_url}/${this.certsEndpoint}/${thing_id}`,
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

}

// export default Certs;
module.exports = Certs;
