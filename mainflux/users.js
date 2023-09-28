const axios = require('axios');

class Users {
    constructor(users_url) {
        this.users_url = users_url;
        this.content_type = "application/json";
        this.usersEndpoint = "users";
    }

    Create(user, token) {
        // Create a new user

        const options = {
            method: "post",
            maxBodyLength: Infinity,
            url: `${this.users_url}/${this.usersEndpoint}`,
            headers: {
                "Content-Type": this.content_type,
                Authorization: `Bearer ${token}`,
            },
            data: JSON.stringify(user),
        };
        return axios.request(options)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                return error.response.data;
            })
    }

    Login(user) {
        // Issue Access and Refresh Token used for authenticating into the system

        const options = {
            method: "post",
            maxBodyLength: Infinity,
            url: `${this.users_url}/${this.usersEndpoint}/tokens/issue`,
            headers: {
                "Content-Type": this.content_type,
            },
            data: JSON.stringify(user),
        };
        return axios.request(options)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                return error;
            });
    }

    Refresh_token(user, refresh_token) {
        //provides a new access token and refresh token.

        const options = {
            method: "post",
            maxBodyLength: Infinity,
            url: `${this.users_url}/${this.usersEndpoint}/tokens/refresh`,
            headers: {
                "Content-Type": this.content_type,
                Authorization: `Bearer ${refresh_token}`,
            },
            data: JSON.stringify(user),
        };
        return axios.request(options)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                return error;
            });
    }

    Update(user, token) {
        // Update a user
        const options = {
            method: "patch",
            url: `${this.users_url}/${this.usersEndpoint}/${user["id"]}`,
            maxBodyLength: Infinity,
            headers: {
                "Content-Type": this.content_type,
                Authorization: `Bearer ${token}`,
            },
            data: JSON.stringify(user),
        };
        return axios.request(options)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                return error.response.data;
            });
    }

    Update_user_identity(user, token) {
        // Update a user identity
        const options = {
            method: "patch",
            url:`${this.users_url}/${this.usersEndpoint}/${user["id"]}/identity`,
            maxBodyLength: Infinity,
            headers: {
                "Content-Type": this.content_type,
                Authorization: `Bearer ${token}`,
            },
            data: JSON.stringify(user),
        };
        return axios.request(options)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                return error.response.data;
            });
    }

    Update_user_tags(user, token) {
        // Update a user's tags
        const options = {
            method: "patch",
            url: `${this.users_url}/${this.usersEndpoint}/${user["id"]}/tags`,
            maxBodyLength: Infinity,
            headers: {
                "Content-Type": this.content_type,
                Authorization: `Bearer ${token}`,
            },
            data: JSON.stringify(user),
        };

        return axios.request(options)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                return error.response.data;
            });
    }

    Update_user_owner(user, token) {
        // Update a user's owner status.
        const options = {
            method: "patch",
            url: `${this.users_url}/${this.usersEndpoint}/${user["id"]}/owner`,
            maxBodyLength: Infinity,
            headers: {
                "Content-Type": this.content_type,
                Authorization: `Bearer ${token}`,
            },
            data: JSON.stringify(user),
        };
        return axios.request(options)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                return error.response.data;
            });
    }

    Update_user_password(old_secret, new_secret, token) {
        // Update a user's password.
        const secret = { old_secret: old_secret, new_secret: new_secret }
        const options = {
            method: "patch",
            url: `${this.users_url}/${this.usersEndpoint}/secret`,
            maxBodyLength: Infinity,
            headers: {
                "Content-Type": this.content_type,
                Authorization: `Bearer ${token}`,
            },
            data: JSON.stringify(secret),
        };
        return axios.request(options)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                return error.response.data;
            });
    }

    Get(user_id, token) {
        // Get a user

        const options = {
            method: "get",
            maxBodyLength: Infinity,
            url: `${this.users_url}/${this.usersEndpoint}/${user_id}`,
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
            });
    }

    Get_all(query_params, token) {
        // Gets all users with pagination.
        const options = {
            method: "get",
            maxBodyLength: Infinity,
            url: `${this.users_url}/${this.usersEndpoint}?${new URLSearchParams(query_params).toString()}`,
            headers: {
                "Content-Type": this.content_type,
                Authorization: `Bearer ${token}`,
            }
        };
        return axios.request(options)
            .then((response) => {
                return response.data;
            })
            .catch((error) => { 
                return error.response.data;
            });

        // return fetch(url , options)
        //     .then((response) => {
        //         if (!response.ok) {
        //             return this.userError.HandleError(this.userError.errors, response.status);
        //             // throw new Error(`HTTP error! Status: ${response.status}`);
        //         }
        //         return response.json();
        //     })
        //     .catch((error) => {
        //         console.error('Fetch error:', error);
        //     });
    }

    Disable(user, token) {
        // Disable a user
        const options = {
            method: "post",
            maxBodyLength: Infinity,
            url: `${this.users_url}/${this.usersEndpoint}/${user["id"]}/disable`,
            headers: {
                "Content-Type": this.content_type,
                Authorization: `Bearer ${token}`,
            },
            data: JSON.stringify(user),
        };
        return axios.request(options)
            .then((response) => {
                return response.data;
            })
            .catch((error) => { 
                return error.response.data;
            });
    }

    Enable(user, token) {
        // Enable a user
        const options = {
            method: "post",
            maxBodyLength: Infinity,
            url: `${this.users_url}/${this.usersEndpoint}/${user["id"]}/enable`,
            headers: {
                "Content-Type": this.content_type,
                Authorization: `Bearer ${token}`,
            },
            data: JSON.stringify(user),
        };
        return axios.request(options)  
            .then((response) => {
                return response.data;
            })
            .catch((error) => { 
                return error.response.data;
            });
    }

    Memberships(member_id, query_params, token) {
        // Get memberships of a user
        const options = {
            method: "get",
            maxBodyLength: Infinity,
            url: `${this.users_url}/${this.usersEndpoint}/${member_id}/memberships?${new URLSearchParams(query_params).toString()}`,
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
            });
    }

    Authorise_user(user_id, group_id, action, entity_type, token) {
        //Authorises user to perform an action on an entity
        const access_request = {
            "subject": user_id,
            "object": group_id,
            "action": action,
            "entity_type": entity_type
        }
        const options = {
            method: "post",
            maxBodyLength: Infinity,
            url: `${this.users_url}/authorize`,
            headers: {
                "Content-Type": this.content_type,
                Authorization: `Bearer ${token}`,
            },
            data: JSON.stringify(access_request),
        };
        return axios.request(options)  
            .then((_response) => {
                return true;
            })
            .catch((_error) => { 
                return false;
            });
    }

}

module.exports = Users;
