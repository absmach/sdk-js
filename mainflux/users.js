import fetch from "node-fetch";
import Errors from "mainflux-sdk/mainflux/errors.js";
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
        fetch(url, options)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json(); // Parse the response JSON
            })
            .then((result) => {
                console.log('Response data:', result);
                // Handle the response data here
            })
            .catch((error) => {
                console.error('Fetch error:', error);
                // Handle errors here
            });
    }

    Get(user_id, token) {
        const url = `${this.users_url}/${this.usersEndpoint}/${user_id}`;
        const options = {
            method: "GET",
            headers: {
                "Content-Type": this.content_type,
                Authorization: `Bearer ${token}`,
            },
        };
        fetch(url, options)
            .then((response) => {
                if (!response.ok) {
                   this.userError.HandleError(this.userError.users["get"], response.status);
                    // throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((result) => {
                console.log('Response data:', result);
            })
            .catch((error) => {
                console.error('Fetch error:', error);
            });
    }


}

export default Users;