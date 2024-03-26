import axios, { AxiosResponse } from "axios";
import { Errors } from "./errors";

interface Domain {
    name?: string;
    id?: string;
    alias?: string;
    email?: string;
}

interface QueryParams {
    offset: number;
    limit: number;
}

interface DomainsInterface {
    domains: Domain[];
    page: PageRes;
}

interface PageRes {
    total: number;
    offset: number;
    limit: number;
}

interface UserRelationRequest {
    user_ids: string[];
    relation: string;
}

class Domains {
// Domains API client

    private domains_url: URL;
    private content_type: string;
    private domainsEndpoint: string;
    private domainError: Errors;

    public constructor(domains_url: string) {
        this.domains_url = new URL(domains_url);
        this.content_type = "application/json";
        this.domainsEndpoint = "domains";
        this.domainError = new Errors();
    }

    public CreateDomain(domain: Domain, token: string): Promise<Domain> {
        // CreateDomain creates a new domain.
        const options = {
            method: "post",
            maxBodyLength: 2000,
            url: new URL(this.domainsEndpoint, this.domains_url).toString(),
            headers: {
              "Content-Type": this.content_type,
              Authorization: `Bearer ${token}`,
            },
            data: domain,
        };

        return axios
        .request(options)
        .then((response: AxiosResponse) => {
          return response.data;
        })
        .catch((error) => {
          if (error.response) {
            return this.domainError.HandleError(
              this.domainError.domains.create,
              error.response.status,
            );
          }
        });

    }

    public UpdateDomain(domain: Domain, token: string): Promise<Domain> {
        // UpdateDomain updates an existing domain.
        const options = {
            method: "patch",
            maxBodyLength: 2000,
            url: new URL(`${this.domainsEndpoint}/${domain.id}`, this.domains_url).toString(),
            headers: {
              "Content-Type": this.content_type,
              Authorization: `Bearer ${token}`,
            },
            data: domain,
        };

        return axios
        .request(options)
        .then((response: AxiosResponse) => {
          return response.data;
        })
        .catch((error) => {
          if (error.response) {
            return this.domainError.HandleError(
              this.domainError.domains.update,
              error.response.status,
            );
          }
        });
    }

    public Domain(domainID: string, token: string): Promise<Domain> {
        // Domain retrieves domain with provided ID.
        const options = {
            method: "get",
            url: new URL(`${this.domainsEndpoint}/${domainID}`, this.domains_url).toString(),
            headers: {
              "Content-Type": this.content_type,
              Authorization: `Bearer ${token}`,
            },
        };

        return axios
        .request(options)
        .then((response: AxiosResponse) => {
          return response.data;
        })
        .catch((error) => {
          if (error.response) {
            return this.domainError.HandleError(
              this.domainError.domains.domain,
              error.response.status,
            );
          }
        });
    }

    public DomainPermissions(domainID: string, token: string): Promise<Domain> {
        // DomainPermissions retrieves domain permissions with provided ID.
        /**
         * @method DomainPermissions - retrieves domain permissions with provided ID.
         * @param {string} domainID - domain ID.
         * @param {string} token - user token.
         * @returns {object} - returns an object domain permissions eg: 
         *  { permissions: [ 'admin', 'edit', 'view', 'membership' ] }
         * @example
         * const domainID = "domainID";
         */
        const options = {
            method: "get",
            url: new URL(`${this.domainsEndpoint}/${domainID}/permissions`, this.domains_url).toString(),
            headers: {
              "Content-Type": this.content_type,
              Authorization: `Bearer ${token}`,
            },
        };

        return axios
        .request(options)
        .then((response: AxiosResponse) => {
          return response.data;
        })
        .catch((error) => {
          if (error.response) {
            return this.domainError.HandleError(
              this.domainError.domains.permissions,
              error.response.status,
            );
          }
        });
    }

    public Domains(query_params: QueryParams, token: string): Promise<DomainsInterface> {
        // Domains retrieves all domains.

        const stringParams: Record<string, string> = Object.fromEntries(
            Object.entries(query_params).map(([key, value]) => [key, String(value)]),
          );
        const options = {
            method: "get",
            url: new URL(`${this.domainsEndpoint}?${new URLSearchParams(stringParams).toString()}`,this.domains_url).toString(),
            headers: {
              "Content-Type": this.content_type,
              Authorization: `Bearer ${token}`,
            },
        };

        return axios
        .request(options)
        .then((response: AxiosResponse) => {
          return response.data;
        })
        .catch((error) => {
          if (error.response) {
            return this.domainError.HandleError(
              this.domainError.domains.domains,
              error.response.status,
            );
          }
        });
    }

    public ListUserDomains(userID: string, query_params: QueryParams, token: string): Promise<DomainsInterface> {
        // ListUserDomains retrieves all domains for a user.

        const stringParams: Record<string, string> = Object.fromEntries(
            Object.entries(query_params).map(([key, value]) => [key, String(value)]),
          );
        const options = {
            method: "get",
            url: new URL(`/users/${userID}/domains?${new URLSearchParams(stringParams).toString()}`, this.domains_url).toString(),
            headers: {
              "Content-Type": this.content_type,
              Authorization: `Bearer ${token}`,
            },
        };

        return axios
        .request(options)
        .then((response: AxiosResponse) => {
          return response.data;
        })
        .catch((error) => {
          if (error.response) {
            return this.domainError.HandleError(
              this.domainError.domains.listUserDomains,
              error.response.status,
            );
          }
        });
    }

    public EnableDomain(domainID: string, token: string): Promise<any> {
        // EnableDomain enables domain with provided ID.
        const options = {
            method: "post",
            url: new URL(`${this.domainsEndpoint}/${domainID}/enable`, this.domains_url).toString(),
            headers: {
              "Content-Type": this.content_type,
              Authorization: `Bearer ${token}`,
            },
        };

        return axios
        .request(options)
        .then((response: AxiosResponse) => {
          return 'Domain enabled successfully.';
        })
        .catch((error) => {
          if (error.response) {
            return this.domainError.HandleError(
              this.domainError.domains.enable,
              error.response.status,
            );
          }
        });
    }

    public DisableDomain(domainID: string, token: string): Promise<any> {
        // DisableDomain disables domain with provided ID.
        const options = {
            method: "post",
            url: new URL(`${this.domainsEndpoint}/${domainID}/disable`, this.domains_url).toString(),
            headers: {
              "Content-Type": this.content_type,
              Authorization: `Bearer ${token}`,
            },
        };

        return axios
        .request(options)
        .then((response: AxiosResponse) => {
          return 'Domain disabled successfully.';
        })
        .catch((error) => {
          if (error.response) {
            return this.domainError.HandleError(
              this.domainError.domains.disable,
              error.response.status,
            );
          }
        });
    }

    public AddUsertoDomain(domainID: string, req: UserRelationRequest, token: string): Promise<any> {
        // AddUsertoDomain adds user to domain.
        const options = {
            method: "post",
            url: new URL(`${this.domainsEndpoint}/${domainID}/users/assign`, this.domains_url).toString(),
            headers: {
              "Content-Type": this.content_type,
              Authorization: `Bearer ${token}`,
            },
        };

        return axios
        .request(options)
        .then((response: AxiosResponse) => {
          return "Policy created";
        })
        .catch((error) => {
          if (error.response) {
            return this.domainError.HandleError(
              this.domainError.domains.addUser,
              error.response.status,
            );
          }
        });
    }

    public RemoveUserfromDomain(domainID: string, req: UserRelationRequest, token: string): Promise<Domain> {
        // RemoveUserfromDomain removes user from domain.
        const options = {
            method: "post",
            url: new URL(`${this.domainsEndpoint}/${domainID}/users/unassign`, this.domains_url).toString(),
            headers: {
              "Content-Type": this.content_type,
              Authorization: `Bearer ${token}`,
            },
            data: req,
        };

        return axios
        .request(options)
        .then((response: AxiosResponse) => {
          return response.data;
        })
        .catch((error) => {
          if (error.response) {
            return this.domainError.HandleError(
              this.domainError.domains.removeUser,
              error.response.status,
            );
          }
        });
    }

}

export default Domains;
