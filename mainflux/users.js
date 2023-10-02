const axios = require('axios');

class Users {
    // Users API client
    /**
     * @class Users -
     * Users API is used for creating and managing users.
     * It is used for creating new users, logging in, refreshing tokens,
     * getting user information, updating user information, disabling 
     * and enabling users.
     * @param {String} users_url - URL to the Users service.
     * @param {String} content_type - Content type for the requests.
     * @param {String} usersEndpoint - Endpoint for the users service.
     * @returns {Object} - Users object.
     */
    constructor(users_url) {
        this.users_url = users_url;
        this.content_type = "application/json";
        this.usersEndpoint = "users";
    }

    Create(user, token) {
        // Creates a new user
        /**
         * @method Create - Creates a new user.
         * @param {Object} user - User object.
         * @param {String} token - Access token.
         * @returns {Object} - User object.
         * @example
         * const user = {
         * "credentials": {
         *    "identity": "admin@example.com",
         *   "password": "12345678"
         * }
         * }
         * 
         */

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
        /**
         * @method Login - Issue Access and Refresh Token used for authenticating into the system.
         * @param {Object} user - User object.
         * @returns {Object} - Access and Refresh Token.
         * @example
         * const user = {
         * "credentials": {
         *   "identity": "admin@example.com",
         *  "password": "12345678"
         * }
         * }
         */

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

    RefreshToken(user, refresh_token) {
        //provides a new access token and refresh token.
        /**
         * @method Refresh_token - Provides a new access token and refresh token.
         * @param {Object} user - User object.
         * @param {String} refresh_token - Refresh token.
         * @returns {Object} - Access and Refresh Token.
         * @example
         * const user = {
         *   "identity": "c52d-3b0d-43b9-8c3e-275c087d875af"
         * }
         * 
         */

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
        /**
         * @method Update - Update a user. Updates a user's name and metadata.
         * @param {Object} user - User object.
         * @param {String} token - Access token.
         * @returns {Object} - User object.
         * @example
         * const user = {
         * "id": "c52d-3b0d-43b9-8c3e-275c087d875af",
         * "name": "John Doe"
         * }
         * 
         */
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

    UpdateUserIdentity(user, token) {
        // Update a user identity
        /**
         * @method UpdateUserIdentity - Update a user identity for a currently logged in user.
         * The user Identity is updated using authorization user_token
         * @param {Object} user - User object.
         * @param {String} token - Access token.
         * @returns {Object} - User object.
         * @example
         * const user = {
         * "id": "c52d-3b0d-43b9-8c3e-275c087d875af",
         * "credentials": {
         *  "identity": "fkatwigs@email.com"
         * }
         * 
         * }
         */
        const options = {
            method: "patch",
            url: `${this.users_url}/${this.usersEndpoint}/${user["id"]}/identity`,
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

    UpdateUserTags(user, token) {
        // Update a user's tags.
        /**
         *  Updates tags of the user with provided ID. Tags is updated using 
         * authorization user_tokeN.
         * @method UpdateUserTags - Update a user's tags.
         * @param {Object} user - User object.
         * @param{String} token - Access token.
         * @returns {Object} - User object.
         * @example
         * const user = {
         *  "name": "example",
         *      "id": "886b4266-77d1-4258-abae-2931fb4f16de"
         *      "tags": [
         *          "back",
         *           "end"
         *       ]
         *       "metadata": {
         *          "foo": "bar"
         *       }
         *  }
         * 
         */
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

    UpdateUserOwner(user, token) {
        // Update a user's owner.
         /**
         *  Updates owner of the user with provided ID. The owner is updated using 
         * authorization user_tokeN.
         * @method UpdateUserOwner - Update a user's owner.
         * @param {Object} user - User object.
         * @param{String} token - Access token.
         * @returns {Object} - User object.
         * @example
         * const user = {
         *  "name": "example",
         *      "id": "886b4266-77d1-4258-abae-2931fb4f16de"
         *      "tags": [
         *          "back",
         *           "end"
         *       ]
         *       "metadata": {
         *          "foo": "bar"
         *       }
         *  "owner":"886b4266-77d1-4258-abae-2931fb4f16de"
         *  }
         * 
         */
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

    UpdateUserPassword(old_secret, new_secret, token) {
        // Update a user's password.
        /**
         * Updates password of the user with provided valid token.
         * 
         * @method UpdateUserPassword - Update a user's password.
         * @param {String} old_secret - Old password.
         * @param {String} new_secret - New password.
         * @param {String} token - Access token.
         * @returns {Object} - User object.
         * 
         */
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
        /**
         * Provides information about the user with provided ID. The user is
         * retrieved using authorization user_token.
         * @method Get - Get a user.
         * @param {String} user_id - User ID.
         * @param {String} token - Access token.
         * @returns {Object} - User object.
         * @example
         * const user_id = "886b4266-77d1-4258-abae-2931fb4f16de"
         * 
         */
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

    GetAll(query_params, token) {
        // Gets all users with pagination.
        /**
         * Provides information about all users. The users are retrieved using
         * authorization user_token.
         * 
         * @method Get_all - Gets all users with pagination.
         * @param {Object} query_params - Query parameters.
         * @param {String} token - Access token.
         * @returns {Object} - User object.
         * @example
         * const query_params = {
         * "offset": 0,
         * "limit": 10
         * }
         * 
         */
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
        /**
         * Disables a user with provided ID and valid token.
         * @method Disable - Disable a user.
         * @param {Object} user - User object.
         * @param {String} token - Access token.
         * @returns {Object} - User object.
         * @example
         * const user = {
         * "id": "c52d-3b0d-43b9-8c3e-275c087d875af",
         * "status": "disabled"
         * }
         */
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
        // Enable a user.
        /**
         * Enables a previously disabled user when provided with token and valid ID.
         * @method Enable - Enable a user.
         * @params {Object} user - User object.
         * @param {String} token - Access token.
         * @returns {Object} - User object.
         * @example
         * const user = {
         * "id": "c52d-3b0d-43b9-8c3e-275c087d875af",
         * "status": "enabled"
         * }
         * 
         */
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
        // Get memberships of a user.
        /**
         * Gets the various groups a user belongs to.
         * @method Memberships - Get memberships of a user.
         * @param {String} member_id - Member ID.
         * @param {Object} query_params - Query parameters for example offset and limit.
         * @param {String} token - Access token.
         * @returns {Object} - User object.
         */
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

    AuthoriseUser(user_id, group_id, action, entity_type, token) {
        //Authorises user to perform an action on an entity
        /**
         * Authorises user to perform an action on an entity. The user needs to be a member of the
         * group to be able to have authority over it.
         * @method AuthoriseUser - Authorises user to perform an action on an entity.
         * @param {String} user_id - User ID which is the Subject.
         * @param {String} group_id - Group ID which is the Object.
         * @return {Boolean} - Returns true if the user is authorised to perform the action.
         */
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
