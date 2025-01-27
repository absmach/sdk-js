// Copyright (c) Abstract Machines
// SPDX-License-Identifier: Apache-2.0

import Errors from "./errors";
import type {
  Domain,
  PageMetadata,
  DomainsPage,
  Response,
  Role,
  BasicPageMeta,
  RolePage,
} from "./defs";
import Roles from "./roles";

/**
 * @class Domains
 * Handles interactions with the domains API, including creating, updating, and managing domains, roles, and permissions.
 */
export default class Domains {
  private readonly domainsUrl: URL;

  private readonly usersUrl?: URL;

  private readonly contentType: string;

  private readonly domainsEndpoint: string;

  private readonly domainRoles: Roles;

  /**
   * @constructor
   * Initializes the Domains API client.
   * @param {object} config - Configuration object.
   * @param {string} config.domainsUrl - Base URL for the domains API.
   * @param {string} [config.usersUrl] - Optional URL for the users API.
   */
  public constructor({
    domainsUrl,
    usersUrl,
  }: {
    domainsUrl: string;
    usersUrl?: string;
  }) {
    this.domainsUrl = new URL(domainsUrl);
    if (usersUrl !== undefined) {
      this.usersUrl = new URL(usersUrl);
    } else {
      this.usersUrl = new URL("");
    }
    this.contentType = "application/json";
    this.domainsEndpoint = "domains";
    this.domainRoles = new Roles();
  }

  /**
   * @method CreateDomain - Creates a new domain.
   * @param {Domain} domain - Domain object containing details like name and alias.
   * @param {string} token - Authorization token.
   * @returns {Promise<Domain>} domain - The created domain object.
   * @throws {Error} - If the domain cannot be created.
   */
  public async CreateDomain(domain: Domain, token: string): Promise<Domain> {
    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": this.contentType,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(domain),
    };

    try {
      const response = await fetch(
        new URL(this.domainsEndpoint, this.domainsUrl).toString(),
        options
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const domainData: Domain = await response.json();
      return domainData;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @method UpdateDomain - Updates an existing domain's details.
   * @param {Domain} domain - Domain object with updated properties.
   * @param {string} token - Authorization token.
   * @returns {Promise<Domain>} domain - The updated domain object.
   * @throws {Error} - If the domain cannot be updated.
   */
  public async UpdateDomain(domain: Domain, token: string): Promise<Domain> {
    const options: RequestInit = {
      method: "PATCH",
      headers: {
        "Content-Type": this.contentType,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(domain),
    };

    try {
      const response = await fetch(
        new URL(
          `${this.domainsEndpoint}/${domain.id}`,
          this.domainsUrl
        ).toString(),
        options
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const domainData: Domain = await response.json();
      return domainData;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @method Domain - Retrieves a domain by its ID.
   * @param {string} domainId - The unique ID of the domain.
   * @param {string} token - Authorization token.
   * @returns {Promise<Domain>} domain - The requested domain object.
   * @throws {Error} - If the domain cannot be fetched.
   */
  public async Domain(domainId: string, token: string): Promise<Domain> {
    const options: RequestInit = {
      method: "GET",
      headers: {
        "Content-Type": this.contentType,
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await fetch(
        new URL(
          `${this.domainsEndpoint}/${domainId}`,
          this.domainsUrl
        ).toString(),
        options
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const domainData: Domain = await response.json();
      return domainData;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @method Domains - Retrieves all domains matching the provided query parameters.
   * @param {PageMetadata} queryParams - Metadata for pagination or filters.
   * @param {string} token - Authorization token.
   * @returns {Promise<DomainsPage>} domainsPage - A page of domains.
   * @throws {Error} - If the domains cannot be fetched.
   */
  public async Domains(
    queryParams: PageMetadata,
    token: string
  ): Promise<DomainsPage> {
    const stringParams: Record<string, string> = Object.fromEntries(
      Object.entries(queryParams).map(([key, value]) => [key, String(value)])
    );
    const options: RequestInit = {
      method: "GET",
      headers: {
        "Content-Type": this.contentType,
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await fetch(
        new URL(
          `${this.domainsEndpoint}?${new URLSearchParams(
            stringParams
          ).toString()}`,
          this.domainsUrl
        ).toString(),
        options
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const domainData: DomainsPage = await response.json();
      return domainData;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @method ListUserDomains - Retrieves all domains associated with a specific user.
   * @param {string} userId - The ID of the user.
   * @param {PageMetadata} queryParams - Metadata for pagination or filters.
   * @param {string} token - Authorization token.
   * @returns {Promise<DomainsPage>} domainsPage - A page of domains associated with the user.
   * @throws {Error} - If the domains of a user cannot be fetched.
   */
  public async ListUserDomains(
    userId: string,
    queryParams: PageMetadata,
    token: string
  ): Promise<DomainsPage> {
    const stringParams: Record<string, string> = Object.fromEntries(
      Object.entries(queryParams).map(([key, value]) => [key, String(value)])
    );
    const options: RequestInit = {
      method: "GET",
      headers: {
        "Content-Type": this.contentType,
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await fetch(
        new URL(
          `/users/${userId}/domains?${new URLSearchParams(
            stringParams
          ).toString()}`,
          this.domainsUrl
        ).toString(),
        options
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const domainData: DomainsPage = await response.json();
      return domainData;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @method EnableDomain - Enables a specific domain, making it active and accessible.
   * @param {string} domainId - The unique identifier of the domain to enable.
   * @param {string} token - Authorization token.
   * @returns {Promise<Response>} response - A promise that resolves when the domain is enabled.
   * @throws {Error} - If the domain cannot be enabled.
   */
  public async EnableDomain(
    domainId: string,
    token: string
  ): Promise<Response> {
    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": this.contentType,
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await fetch(
        new URL(
          `${this.domainsEndpoint}/${domainId}/enable`,
          this.domainsUrl
        ).toString(),
        options
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const enableResponse: Response = {
        status: response.status,
        message: "Domain enabled successfully",
      };
      return enableResponse;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @method DisableDomain - Disables a specific domain, making it inactive and inaccessible.
   * @param {string} domainId - The unique identifier of the domain to disable.
   * @param {string} token - Authorization token.
   * @returns {Promise<Response>} response - A promise that resolves when the domain is disabled.
   * @throws {Error} - If the domain cannot be disabled.
   */
  public async DisableDomain(
    domainId: string,
    token: string
  ): Promise<Response> {
    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": this.contentType,
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await fetch(
        new URL(
          `${this.domainsEndpoint}/${domainId}/disable`,
          this.domainsUrl
        ).toString(),
        options
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const disableResponse: Response = {
        status: response.status,
        message: "Domain disabled successfully",
      };
      return disableResponse;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @method FreezeDomain - Freezes the specified domain.
   * @param {string} domainId - The unique identifier of the domain to disable.
   * @param {string} token - Authorization token.
   * @returns {Promise<Response>} response - A promise that resolves when the domain is frozen.
   * @throws {Error} - If the domain cannot be frozen.
   */
  public async FreezeDomain(
    domainId: string,
    token: string
  ): Promise<Response> {
    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": this.contentType,
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await fetch(
        new URL(
          `${this.domainsEndpoint}/${domainId}/freeze`,
          this.domainsUrl
        ).toString(),
        options
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const disableResponse: Response = {
        status: response.status,
        message: "Domain frozen successfully",
      };
      return disableResponse;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @method ListDomainActions - Lists all actions available in a specific domain.
   * @param {string} token - Authorization token.
   * @returns {Promise<string[]>} actions - A promise that resolves with an array of actions.
   * @throws {Error} - If domain actions cannot be fetched.
   */
  public async ListDomainActions(token: string): Promise<string[]> {
    try {
      const actions: string[] = await this.domainRoles.ListAvailableActions(
        this.domainsUrl,
        this.domainsEndpoint,
        token
      );
      return actions;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @method CreateDomainRole - Creates a new role within a specific domain.
   * @param {string} domainId - The unique identifier of the domain.
   * @param {string} roleName - The name of the role to create.
   * @param {string} token - Authorization token.
   * @param {string[]} optionalActions - Optional actions assigned to the role.
   * @param {string[]} optionalMembers - Optional members assigned to the role.
   * @returns {Promise<Role>} role - A promise that resolves with the role created.
   * @throws {Error} - If the role cannot be created or already exists.
   */
  public async CreateDomainRole(
    domainId: string,
    roleName: string,
    token: string,
    optionalActions?: string[],
    optionalMembers?: string[]
  ): Promise<Role> {
    try {
      const role: Role = await this.domainRoles.CreateRole(
        this.domainsUrl,
        this.domainsEndpoint,
        domainId,
        roleName,
        token,
        optionalActions,
        optionalMembers
      );
      return role;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @method ListDomainRoles - Lists all roles within a specific domain.
   * @param {string} domainId - The unique identifier of the domain.
   * @param {PageMetadata} queryParams - Metadata for pagination or filters.
   * @param {string} token - Authorization token.
   * @returns {Promise<RolePage>} rolesPage - A promise that resolves with a page of roles in the domain.
   * @throws {Error} - If the domainId is invalid or roles cannot be fetched.
   */
  public async ListDomainRoles(
    domainId: string,
    queryParams: PageMetadata,
    token: string
  ): Promise<RolePage> {
    try {
      const rolesPage: RolePage = await this.domainRoles.ListRoles(
        this.domainsUrl,
        this.domainsEndpoint,
        domainId,
        queryParams,
        token
      );
      return rolesPage;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @method ViewDomainRole - Retrieves details about a specific role in a domain.
   * @param {string} domainId - The unique identifier of the domain.
   * @param {string} roleId - The unique identifier of the role.
   * @param {string} token - Authorization token.
   * @returns {Promise<Role>} role - A promise that resolves with the role details.
   * @throws {Error} - If the role does not exist or cannot be retrieved.
   */
  public async ViewDomainRole(
    domainId: string,
    roleId: string,
    token: string
  ): Promise<Role> {
    try {
      const role = await this.domainRoles.ViewRole(
        this.domainsUrl,
        this.domainsEndpoint,
        domainId,
        roleId,
        token
      );
      return role;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @method UpdateDomainRole - Updates the details of a specific role in a domain.
   * @param {string} domainId - The unique identifier of the domain.
   * @param {string} roleId - The unique identifier of the role.
   * @param {Role} role - The role to be updated.
   * @param {string} token - Authorization token.
   * @returns {Promise<Role>} role - A promise that resolves with the updated role.
   * @throws {Error} - If the role cannot be updated.
   */
  public async UpdateDomainRole(
    domainId: string,
    roleId: string,
    role: Role,
    token: string
  ): Promise<Role> {
    try {
      const updatedRole = await this.domainRoles.UpdateRole(
        this.domainsUrl,
        this.domainsEndpoint,
        domainId,
        roleId,
        role,
        token
      );
      return updatedRole;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @method DeleteDomainRole - Deletes a specific role from a domain.
   * @param {string} domainId - The unique identifier of the domain.
   * @param {string} roleId - The unique identifier of the role.
   * @param {string} token - Authorization token.
   * @returns {Promise<Response>} response - A promise that resolves when the role is deleted.
   * @throws {Error} - If the role cannot be deleted.
   */
  public async DeleteDomainRole(
    domainId: string,
    roleId: string,
    token: string
  ): Promise<Response> {
    try {
      const response = await this.domainRoles.DeleteRole(
        this.domainsUrl,
        this.domainsEndpoint,
        domainId,
        roleId,
        token
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @method AddDomainRoleActions - Adds actions to a specific role in a domain.
   * @param {string} domainId - The unique identifier of the domain.
   * @param {string} roleId - The unique identifier of the role.
   * @param {string} token - Authorization token.
   * @param {string[]} actions - The actions to add to the role.
   * @returns {Promise<string[]>} actions - A promise that resolves with an array of actions.
   * @throws {Error} - If the actions cannot be added.
   */
  public async AddDomainRoleActions(
    domainId: string,
    roleId: string,
    actions: string[],
    token: string
  ) {
    try {
      const response = await this.domainRoles.AddRoleActions(
        this.domainsUrl,
        this.domainsEndpoint,
        domainId,
        roleId,
        actions,
        token
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @method ListDomainRoleActions - Lists all actions associated with a specific role in a domain.
   * @param {string} domainId - The unique identifier of the domain.
   * @param {string} roleId - The unique identifier of the role.
   * @param {string} token - Authorization token.
   * @returns {Promise<string[]>} actions - A promise that resolves with an array of actions.
   * @throws {Error} - If actions cannot be retrieved.
   */
  public async ListDomainRoleActions(
    domainId: string,
    roleId: string,
    token: string
  ): Promise<string[]> {
    try {
      const updatedRole = await this.domainRoles.ListRoleActions(
        this.domainsUrl,
        this.domainsEndpoint,
        domainId,
        roleId,
        token
      );
      return updatedRole;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @method DeleteDomainRoleActions - Deletes specific actions from a role in a domain.
   * @param {string} domainId - The unique identifier of the domain.
   * @param {string} roleId - The unique identifier of the role.
   * @param {string[]} actions - The actions to delete from the role.
   * @param {string} token - Authorization token.
   * @returns {Promise<Response>} response - A promise that resolves when actions are deleted.
   * @throws {Error} - If the actions cannot be deleted.
   */
  public async DeleteDomainRoleActions(
    domainId: string,
    roleId: string,
    actions: string[],
    token: string
  ): Promise<Response> {
    try {
      const response = await this.domainRoles.DeleteRoleActions(
        this.domainsUrl,
        this.domainsEndpoint,
        domainId,
        roleId,
        actions,
        token
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @method DeleteAllDomainRoleActions - Deletes all actions associated with a specific role in a domain.
   * @param {string} domainId - The unique identifier of the domain.
   * @param {string} roleId - The unique identifier of the role.
   * @param {string} token - Authorization token.
   * @returns {Promise<Response>} response - A promise that resolves when all actions are deleted.
   * @throws {Error} - If the actions cannot be deleted.
   */
  public async DeleteAllDomainRoleActions(
    domainId: string,
    roleId: string,
    token: string
  ): Promise<Response> {
    try {
      const response = await this.domainRoles.DeleteAllRoleActions(
        this.domainsUrl,
        this.domainsEndpoint,
        domainId,
        roleId,
        token
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @method AddDomainRoleMembers - Adds members to a specific role in a domain.
   * @param {string} domainId - The unique identifier of the domain.
   * @param {string} roleId - The unique identifier of the role.
   * @param {string[]} members - The IDs of the members to add.
   * @param {string} token - Authorization token.
   * @returns {Promise<string[]>} members - A promise that resolves with an array of member ids.
   * @throws {Error} - If the members cannot be added.
   */
  public async AddDomainRoleMembers(
    domainId: string,
    roleId: string,
    members: string[],
    token: string
  ): Promise<string[]> {
    try {
      const response = await this.domainRoles.AddRoleMembers(
        this.domainsUrl,
        this.domainsEndpoint,
        domainId,
        roleId,
        members,
        token
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @method ListDomainRoleMembers - Lists all members associated with a specific role in a domain.
   * @param {string} domainId - The unique identifier of the domain.
   * @param {string} roleId - The unique identifier of the role.
   * @param {string} token - Authorization token.
   * @returns {Promise<string[]>} members - A promise that resolves with an array of member ids.
   * @throws {Error} - If members cannot be retrieved.
   */
  public async ListDomainRoleMembers(
    domainId: string,
    roleId: string,
    queryParams: BasicPageMeta,
    token: string
  ): Promise<string[]> {
    try {
      const updatedRole = await this.domainRoles.ListRoleMembers(
        this.domainsUrl,
        this.domainsEndpoint,
        domainId,
        roleId,
        queryParams,
        token
      );
      return updatedRole;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @method DeleteDomainRoleMembers - Deletes specific members from a role in a domain.
   * @param {string} domainId - The unique identifier of the domain.
   * @param {string} roleId - The unique identifier of the role.
   * @param {string[]} members - The IDs of the members to delete.
   * @param {string} token - Authorization token.
   * @returns {Promise<Response>} response - A promise that resolves when members are deleted.
   * @throws {Error} - If the members cannot be deleted.
   */
  public async DeleteDomainRoleMembers(
    domainId: string,
    roleId: string,
    members: string[],
    token: string
  ): Promise<Response> {
    try {
      const response = await this.domainRoles.DeleteRoleMembers(
        this.domainsUrl,
        this.domainsEndpoint,
        domainId,
        roleId,
        members,
        token
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @method DeleteAllDomainRoleMembers - Deletes all members associated with a specific role in a domain.
   * @param {string} domainId - The unique identifier of the domain.
   * @param {string} roleId - The unique identifier of the role.
   *  @param {string} token - Authorization token.
   * @returns {Promise<Response>} response - A promise that resolves when all members are deleted.
   * @throws {Error} - If the members cannot be deleted.
   */
  public async DeleteAllDomainRoleMembers(
    domainId: string,
    roleId: string,
    token: string
  ): Promise<Response> {
    try {
      const response = await this.domainRoles.DeleteAllRoleMembers(
        this.domainsUrl,
        this.domainsEndpoint,
        domainId,
        roleId,
        token
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
}
