import fetch from "node-fetch";
import Errors from "./errors.js";

class Certs {
    constructor(certs_url) {
        this.certs_url = certs_url;
        this.content_type = "application/json";
        this.certsEndpoint = "certs";
    }
    certError = new Errors;

    Issue(thing_id , valid, token) {
        const url = `${this.certs_url}/${this.certsEndpoint}`;
        console.log(url);
        const payload= {"thing_id": thing_id, "ttl": valid};
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
                    console.log
                    // return Errors.HandleError(Errors.g)
                    return this.certError.HandleError(this.certError.errors, response.status); 
                }
                return response.json(); // Parse the response JSON
            })
            .catch((error) => {
                console.error('Fetch error:', error);
                // Handle errors here
            });
    }

    View_by_thing(thing_id, token) {
        const url = `${this.certs_url}/serials/${thing_id}`;
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
                    console.log
                    // return Errors.HandleError(Errors.g)
                    return this.certError.HandleError(this.certError.errors, response.status); 
                }
                return response.json(); // Parse the response JSON
            })
            .catch((error) => {
                console.error('Fetch error:', error);
                // Handle errors here
            });
    }

    View_by_serial(cert_id, token) {
        const url = `${this.certs_url}/${this.certsEndpoint}/${cert_id}`;
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
                    console.log
                    // return Errors.HandleError(Errors.g)
                    return this.certError.HandleError(this.certError.errors, response.status); 
                }
                return response.json(); // Parse the response JSON
            })
            .catch((error) => {
                console.error('Fetch error:', error);
                // Handle errors here
            });
    }

    Revoke(thing_id, token) {
        const url = `${this.certs_url}/${this.certsEndpoint}/${thing_id}`;
        console.log(url);
        const options = {
            method: "DELETE",
            headers: {
                "Content-Type": this.content_type,
                Authorization: `Bearer ${token}`,
            },
        };
        return fetch(url, options)
            .then((response) => {
                if (!response.ok) {
                    console.log
                    // return Errors.HandleError(Errors.g)
                    return this.certError.HandleError(this.certError.errors, response.status); 
                }
                return "DELETED"; // Parse the response JSON
            })
            .catch((error) => {
                console.error('Fetch error:', error);
                // Handle errors here
            });
    }

}

export default Certs;
