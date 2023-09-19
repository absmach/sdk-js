import fetch from "node-fetch";
import Errors from "./errors.js";

class Groups {
    constructor(groups_url) {
        this.groups_url = groups_url;
        this.content_type = "application/json";
        this.groupsEndpoint = "groups";
    }
    groupError = new Errors;

    Create(group, token) {
        const url = `${this.groups_url}/${this.groupsEndpoint}`;
        console.log(url);
        const options = {
            method: "POST",
            headers: {
                "Content-Type": this.content_type,
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(group),
        };
        return fetch(url, options)
            .then((response) => {
                if (!response.ok) {
                    console.log
                    // return Errors.HandleError(Errors.g)
                    return this.groupError.HandleError(this.groupError.errors, response.status); 
                }
                return response.json(); // Parse the response JSON
            })
            .catch((error) => {
                console.error('Fetch error:', error);
                // Handle errors here
            });
    }

    Get(group_id, token) {
        const url = `${this.groups_url}/${this.groupsEndpoint}/${group_id}`;
        const options = {
            method: "GET",
            headers: {
                "Content-Type": this.content_type,
                Authorization: `Bearer ${token}`,
            },
        };
        return fetch(url, options)
            .then((response) => {
                if (!response.ok) {
                    return this.groupError.HandleError(this.groupError.errors, response.status);
                }
                return response.json();
            })
            .catch((error) => {
                console.error('Fetch error:', error);
            });
    }

    Get_all(query_params, token) {
        const url = `${this.groups_url}/${this.groupsEndpoint}?${new URLSearchParams(query_params).toString()}`;
        const options = {
            method: "GET",
            headers: {
                "Content-Type": this.content_type,
                Authorization: `Bearer ${token}`,
            },
            params: query_params,
        };
        return fetch(url, options)
            .then((response) => {
                if (!response.ok) {
                    return this.groupError.HandleError(this.groupError.errors, response.status);
                    // throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .catch((error) => {
                console.error('Fetch error:', error);
            });
    }

    Update(group, token) {
        const url = `${this.groups_url}/${this.groupsEndpoint}/${group["id"]}`;
        const options = {
            method: "PUT",
            headers: {
                "Content-Type": this.content_type,
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(group),
        };
        return fetch(url, options)
            .then((response) => {
                if (!response.ok) {
                    return this.groupError.HandleError(this.groupError.errors, response.status);
                }
                return response.json();
            })
            .catch((error) => {
                console.error('Fetch error:', error);
            });
    }

    Children(group_id, query_params, token) {
        const url = `${this.groups_url}/${this.groupsEndpoint}/${group_id}/children?${new URLSearchParams(query_params).toString()}`;
        console.log(url);
        const options = {
            method: "GET",
            headers: {
                "Content-Type": this.content_type,
                Authorization: `Bearer ${token}`,
            },
            params: query_params,
        };
        return fetch(url, options)
            .then((response) => {
                if (!response.ok) {
                    return this.groupError.HandleError(this.groupError.errors, response.status);
                    // throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .catch((error) => {
                console.error('Fetch error:', error);
            });
    }

    Parents(group, query_params, token) {
        const url = `${this.groups_url}/${this.groupsEndpoint}/${group["id"]}/parents?${new URLSearchParams(query_params).toString()}`;
        console.log(url);
        const options = {
            method: "GET",
            headers: {
                "Content-Type": this.content_type,
                Authorization: `Bearer ${token}`,
            },
            params: query_params,
        };
        return fetch(url, options)
            .then((response) => {
                if (!response.ok) {
                    return this.groupError.HandleError(this.groupError.errors, response.status);
                    // throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .catch((error) => {
                console.error('Fetch error:', error);
            });
    }

    Assign(group_id, member_id, member_type, token) {
        const url = `${this.groups_url}/policies`;
        const payload = { "object": group_id, "subject": member_id, "actions": member_type };
        console.log(url);
        const options = {
            method: "POST",
            headers: {
                "Content-Type": this.content_type,
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
        };
        return fetch(url, options)
            .then((response) => {
                if (!response.ok) {
                    return this.groupError.HandleError(this.groupError.errors, response.status);
                }
                return "OK";
            })
            .catch((error) => {
                console.error('Fetch error:', error);
            });
    }

    Unassign(members_ids, group_id, token) {
        const url = `${this.groups_url}/policies/${members_ids}/${group_id}`;
        const payload = { "object": group_id, "subject": members_ids };
        console.log(url);
        const options = {
            method: "DELETE",
            headers: {
                "Content-Type": this.content_type,
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
        };
        return fetch(url, options)
            .then((response) => {
                if (!response.ok) {
                    return this.groupError.HandleError(this.groupError.errors, response.status);
                    // throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return "OK";
            })
            .catch((error) => {
                console.error('Fetch error:', error);
            });
    }

    Disable(group_id, token) {
        const url = `${this.groups_url}/${this.groupsEndpoint}/${group_id}/disable`;
        const options = {
            method: "POST",
            headers: {
                "Content-Type": this.content_type,
                Authorization: `Bearer ${token}`,
            },
        };
        return fetch(url, options)
            .then((response) => {
                if (!response.ok) {
                    return this.groupError.HandleError(this.groupError.errors, response.status);
                }
                return response.json();
            })
            .catch((error) => {
                console.error('Fetch error:', error);
            });
    }

    Members(group_id, query_params, token) {
        const url = `${this.groups_url}/${this.groupsEndpoint}/${group_id}/members?${new URLSearchParams(query_params).toString()}`;
        console.log(url);
        const options = {
            method: "GET",
            headers: {
                "Content-Type": this.content_type,
                Authorization: `Bearer ${token}`,
            },
            params: query_params,
        };
        return fetch(url, options)
            .then((response) => {
                if (!response.ok) {
                    return this.groupError.HandleError(this.groupError.errors, response.status);
                }
                return response.json();
            })
            .catch((error) => {
                console.error('Fetch error:', error);
            });
    }

}

export default Groups;
