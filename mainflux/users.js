import fetch from "node-fetch";
import Errors from "./errors.js";

class Users {
    constructor(users_url) {
        this.users_url = users_url;
        this.content_type = "application/json";
        this.usersEndpoint = "users";
    }
    userError = new Errors;

    Create(user, token) {
        const url = `${this.users_url}/${this.usersEndpoint}`;
        console.log(url);
        const options = {
            method: "POST",
            headers: {
                "Content-Type": this.content_type,
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(user),
        };
        return fetch(url, options)
            .then((response) => {
                if (!response.ok) {
                    return this.userError.HandleError(this.userError.errors, response.status);
                    // throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json(); // Parse the response JSON
            })
            .catch((error) => {
                console.error('Fetch error:', error);
                // Handle errors here
            });
    }

    Login(user) {
        // Issue Access and Refresh Token used for authenticating into the system
        const url = `${this.users_url}/${this.usersEndpoint}/tokens/issue`;
        console.log(url);
        const options = {
            method: "POST",
            headers: {
                "Content-Type": this.content_type,
            },
            body: JSON.stringify(user),
        };
        return fetch(url, options)
            .then((response) => {
                if (!response.ok) {
                    return this.userError.HandleError(this.userError.errors, response.status);
                    // throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .catch((error) => {
                console.error('Fetch error:', error);
            });
    }

    Refresh_token(user, refresh_token) {
        const url = `${this.users_url}/${this.usersEndpoint}/tokens/refresh`;
        const options = {
            method: "POST",
            headers: {
                "Content-Type": this.content_type,
                Authorization: `Bearer ${refresh_token}`,
            },
            body: JSON.stringify(user),
        };
        return fetch(url, options)
            .then((response) => {
                if (!response.ok) {
                    return this.userError.HandleError(this.userError.errors, response.status);
                    // throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .catch((error) => {
                console.error('Fetch error:', error);
            });
    }

    Update(user, token) {
        const url = `${this.users_url}/${this.usersEndpoint}/${user["id"]}`;
        console.log(url);
        const options = {
            method: "PATCH",
            headers: {
                "Content-Type": this.content_type,
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(user),
        };
        return fetch(url, options)
            .then((response) => {
                if (!response.ok) {
                    return this.userError.HandleError(this.userError.users["update"], response.status);
                    // throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .catch((error) => {
                console.error('Fetch error:', error);
            });
    }

    Update_user_identity(user, token) {
        const url = `${this.users_url}/${this.usersEndpoint}/${user["id"]}/identity`;
        console.log(url);
        const options = {
            method: "PATCH",
            headers: {
                "Content-Type": this.content_type,
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(user),
        };
        return fetch(url, options)
            .then((response) => {
                if (!response.ok) {
                    return this.userError.HandleError(this.userError.errors, response.status);
                    // throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .catch((error) => {
                console.error('Fetch error:', error);
            });
    }

    Update_user_tags(user, token) {
        const url = `${this.users_url}/${this.usersEndpoint}/${user["id"]}/tags`;
        console.log(url);
        const options = {
            method: "PATCH",
            headers: {
                "Content-Type": this.content_type,
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(user),
        };
        return fetch(url, options)
            .then((response) => {
                if (!response.ok) {
                   return this.userError.HandleError(this.userError.errors, response.status);
                    // throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .catch((error) => {
                console.error('Fetch error:', error);
            });
    }

    Update_user_owner(user, token) {
        const url = `${this.users_url}/${this.usersEndpoint}/${user["id"]}/owner`;
        console.log(url);
        const options = {
            method: "PATCH",
            headers: {
                "Content-Type": this.content_type,
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(user),
        };
        return fetch(url, options)
            .then((response) => {
                if (!response.ok) {
                    return this.userError.HandleError(this.userError.errors, response.status);
                    // throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .catch((error) => {
                console.error('Fetch error:', error);
            });
    }

    Update_user_password(old_secret, new_secret, token) {
        const url = `${this.users_url}/${this.usersEndpoint}/secret`;
        const secret = { old_secret: old_secret, new_secret: new_secret }
        console.log(url);
        const options = {
            method: "PATCH",
            headers: {
                "Content-Type": this.content_type,
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(secret),
        };
        return fetch(url, options)
            .then((response) => {
                if (!response.ok) {
                    return this.userError.HandleError(this.userError.errors, response.status);
                    // throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .catch((error) => {
                console.error('Fetch error:', error);
            });
    }

    async Get(user_id, token) {
        const url = `${this.users_url}/${this.usersEndpoint}/${user_id}`;
        console.log(url);
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
                    return this.userError.HandleError(this.userError.errors, response.status);
                    // throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .catch((error) => {
                console.error('Fetch error:', error);
            });
    }

    Get_all(query_params, token) {
        const url = `${this.users_url}/${this.usersEndpoint}?${new URLSearchParams(query_params).toString()}`;
        console.log(url);
        const options = {
            method: "GET",
            headers: {
                "Content-Type": this.content_type,
                Authorization: `Bearer ${token}`,
            }
            // URLSearchParams: query_params,
        };
        return fetch(url , options)
            .then((response) => {
                if (!response.ok) {
                    return this.userError.HandleError(this.userError.errors, response.status);
                    // throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .catch((error) => {
                console.error('Fetch error:', error);
            });
    }

    Disable(user, token) {
        const url = `${this.users_url}/${this.usersEndpoint}/${user["id"]}/disable`;
        console.log(url);
        const options = {
            method: "POST",
            headers: {
                "Content-Type": this.content_type,
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(user),
        };
        return fetch(url, options)
            .then((response) => {
                if (!response.ok) {
                    return this.userError.HandleError(this.userError.errors, response.status);
                    // throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .catch((error) => {
                console.error('Fetch error:', error);
            });
    }

    Enable(user, token) {
        const url = `${this.users_url}/${this.usersEndpoint}/${user["id"]}/enable`;
        console.log(url);
        const options = {
            method: "POST",
            headers: {
                "Content-Type": this.content_type,
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(user),
        };
        return fetch(url, options)
            .then((response) => {
                if (!response.ok) {
                    return this.userError.HandleError(this.userError.errors, response.status);
                    // throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .catch((error) => {
                console.error('Fetch error:', error);
            });
    }

    Memberships(member_id, query_params, token) {
        const url = `${this.users_url}/${this.usersEndpoint}/${member_id}/memberships?${new URLSearchParams(query_params).toString()}`;
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
                    return this.userError.HandleError(this.userError.errors, response.status);
                    // throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .catch((error) => {
                console.error('Fetch error:', error);
            });
    }

    Authorise_user(user_id, group_id, action, entity_type, token) {
        //Authorises user
        const url = `${this.users_url}/authorize`;
        const access_request = {
            "subject": user_id,
            "object": group_id,
            "action": action,
            "entity_type": entity_type
        }
        const options = {
            method: "POST",
            headers: {
                "Content-Type": this.content_type,
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(access_request),
        };
        return fetch(url, options)
            .then((response) => {
                if (!response.ok) {
                    return this.userError.HandleError(this.userError.errors, response.status);
                    // throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .catch((error) => {
                console.error('Fetch error:', error);
            });
    }

}

export default Users;
