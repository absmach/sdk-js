// import fetch from "node-fetch";
// import Errors from "./errors.js";
const axios = require("axios");

class Groups {
    constructor(groups_url) {
        this.groups_url = groups_url;
        this.content_type = "application/json";
        this.groupsEndpoint = "groups";
    }
    // groupError = new Errors;

    Create(group, token) {

        const options = {
            method: "post",
            maxBodyLength: Infinity,
            url: `${this.groups_url}/${this.groupsEndpoint}`,
            headers: {
                "Content-Type": this.content_type,
                Authorization: `Bearer ${token}`,
            },
            data: JSON.stringify(group),
        };
        return axios.request(options)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                return error.response.data;
            });
    }

    Get(group_id, token) {
        
        const options = {
            method: "get",
            maxBodyLength: Infinity,
            url: `${this.groups_url}/${this.groupsEndpoint}/${group_id}`,
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

    Get_all(query_params, token) {
        
        const options = {
            method: "get",
            maxBodyLength: Infinity,
            url: `${this.groups_url}/${this.groupsEndpoint}?${new URLSearchParams(query_params).toString()}`,
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

    Update(group, token) {
        
        const options = {
            method: "put",
            maxBodyLength: Infinity,
            url: `${this.groups_url}/${this.groupsEndpoint}/${group["id"]}`,
            headers: {
                "Content-Type": this.content_type,
                Authorization: `Bearer ${token}`,
            },
            data: JSON.stringify(group),
        };
        return axios.request(options)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                return error.response.data;
            })
    }

    Children(group_id, query_params, token) {
        
        const options = {
            method: "get",
            maxBodyLength: Infinity,
            url: `${this.groups_url}/${this.groupsEndpoint}/${group_id}/children?${new URLSearchParams(query_params).toString()}`,
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

    Parents(group, query_params, token) {
         
        const options = {
            method: "get",
            maxBodyLength: Infinity,
            url: `${this.groups_url}/${this.groupsEndpoint}/${group["id"]}/parents?${new URLSearchParams(query_params).toString()}`,
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

    Assign(group_id, member_id, member_type, token) {
        
        const payload = { "object": group_id, "subject": member_id, "actions": member_type };
        const options = {
            method: "post",
            maxBodyLength: Infinity,
            url: `${this.groups_url}/policies`,
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

    Unassign(members_ids, group_id, token) {
        
        const payload = { "object": group_id, "subject": members_ids };
        const options = {
            method: "delete",
            maxBodyLength: Infinity,
            url: `${this.groups_url}/policies/${members_ids}/${group_id}`,
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

    Disable(group_id, token) {
        
        const options = {
            method: "post",
            maxBodyLength: Infinity,
            url: `${this.groups_url}/${this.groupsEndpoint}/${group_id}/disable`,
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

    Members(group_id, query_params, token) {
        
        const options = {
            method: "get",
            maxBodyLength: Infinity,
            url: `${this.groups_url}/${this.groupsEndpoint}/${group_id}/members?${new URLSearchParams(query_params).toString()}`,
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

}

// export default Groups;
module.exports = Groups;
