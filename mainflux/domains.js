const axios = require('axios');
const Errors = require('./errors');

class Domains {

    //Domains API Client
    /**
     * @class Domains-
     * Domains is used to manage domains.
     */
    constructor(domains_url){
        this.domains_url = new URL (domains_url);
        this.content_type = 'application/json';
        this.domainsEndpoint = 'domains';
    }

    domainsError = new Errors;

    CreateDomain(domain, token) {
        const options = {
            method: "post",
            maxBodyLength: 2000,
            url: new URL (this.domainsEndpoint, this.domains_url),
            headers: {
                "Content-Type": this.content_type,
                Authorization: `Bearer ${token}`,
            },
            data: domain,
        };

        return axios.request(options)
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                if (error.response){
                    return this.domainsError.HandleError(
                        this.domainsError.domains.createdomain,
                        error.response.status,
                    );
                };
            });
    }

    


}

module.exports = Domains;
