import Errors from "./errors";
import Roles from "./roles";
import type {
  Client,
  ClientsPage,
  Response,
  PageMetadata,
  Role,
  RolePage,
  BasicPageMeta,
} from "./defs";

export default class Clients {
  // Clients service client.
  /**
  @class Clients
    private Clients_url: URL;
    content_type: string;
    ClientsEndpoint: string;
   //
   //Clients API is used for creating and managing Clients.
   //It is used for creating, updating, deleting and retrieving Clients.
   //@param {string} clients_url - Clients service URL.
   //@returns {Object} - Clients service client.
   */
  private readonly clientsUrl: URL;

  private readonly usersUrl?: URL;

  private readonly contentType: string;

  private readonly clientsEndpoint: string;

  private readonly clientRoles: Roles;

  public constructor({
    clientsUrl,
    usersUrl,
  }: {
    clientsUrl: string;
    usersUrl?: string;
  }) {
    this.clientsUrl = new URL(clientsUrl);
    if (usersUrl !== undefined) {
      this.usersUrl = new URL(usersUrl);
    } else {
      this.usersUrl = new URL("");
    }
    this.contentType = "application/json";
    this.clientsEndpoint = "clients";
    this.clientRoles = new Roles();
  }

  /**
  * @method CreateClient
  * Creates a new client.
  * @param {Object} Client - Client object containing details like name and metadata.
  * @param {string} domainId -  The unique ID of the domain.
  * @param {stringtring} token - Authorization token.
  * @returns {Promise<Client>} - The created client object.
  * @throws {Error} If the client cannot be created.
  */
  public async CreateClient(
    client: Client,
    domainId: string,
    token: string
  ): Promise<Client> {
    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": this.contentType,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(client),
    };

    try {
      const response = await fetch(
        new URL(
          `${domainId}/${this.clientsEndpoint}`,
          this.clientsUrl
        ).toString(),
        options
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const clientData: Client = await response.json();
      return clientData;
    } catch (error) {
      throw error;
    }
  }

  /**
     * @method CreateClients
     * Creates multiple new clients.
     * @param {Client[]} clients - An array of client objects,  each containing details like name, metadata, and tags.
     * @param {string} domainId -  The  unique ID of the domain.
     * @param {string} token - Authorization token.
     * @returns {Promise<ClientsPage>} - A page of clients.
     * @throws {Error} If the clients cannot be created.
  */
  public async CreateClients(
    clients: Client[],
    domainId: string,
    token: string
  ): Promise<ClientsPage> {
    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": this.contentType,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(Clients),
    };
    try {
      const response = await fetch(
        new URL(
          `${domainId}/${this.clientsEndpoint}/bulk`,
          this.clientsUrl
        ).toString(),
        options
      );
      console.log("url", response.url);
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const ClientData: ClientsPage = await response.json();
      return ClientData;
    } catch (error) {
      throw error;
    }
  }

  public async Enable(
    clientId: string,
    domainId: string,
    token: string
  ): Promise<Client> {
    // Enables a Client.
    /**
     * @method Enable - Enables a previously disabled Client when provided with a valid token and Client ID.
     * @param {string} clientID - client ID.
     * @param {string} domainId - The Domain ID.
     * @param {string} token - User token.
     * @returns {Object} - Returns updated Client.
     */

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
          `${domainId}/${this.clientsEndpoint}/${clientId}/enable`,
          this.clientsUrl
        ).toString(),
        options
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const enabledClient: Client = await response.json();
      return enabledClient;
    } catch (error) {
      throw error;
    }
  }

  public async Disable(
    ClientId: string,
    domainId: string,
    token: string
  ): Promise<Client> {
    // Disables Client.
    /**
     * @method Disable - Disables a Client when provided with a valid token, domain ID and Client ID.
     * @param {string} ClientId - Client ID.
     * @param {string} domainId - The Domain ID.
     * @param {string} token - User token.
     * @returns {Object} - Returns disabled Client
     */

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
          `${domainId}/${this.clientsEndpoint}/${ClientId}/disable`,
          this.clientsUrl
        ).toString(),
        options
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const disabledClient: Client = await response.json();
      return disabledClient;
    } catch (error) {
      throw error;
    }
  }

  public async UpdateClient(
    Client: Client,
    domainId: string,
    token: string
  ): Promise<Client> {
    // Updates Client.
    /**
     * @method Update - Updates Client when provided with a valid token,
     * domain ID and Client object.
     * @param {Object} Client - Client object.
     * @param {string} domainId - The Domain ID.
     * @param {string} token - User token.
     * @returns {Object} - Client object.
     * @example
     * const Client = {
     * "name": "Client3",
     * "tags": [
     * "tag1"
     * ],
     * "credentials": {
     * "identity": "Clientidentity",
     * "secret":"12345678"
     * },
     * "owner": "bb7edb32-2eac-4aad-aebe-ed96fe073879",
     * "id": "bb7edb32-2eac-4aad-aebe-ed96fe073879",
     * }
     */

    const options: RequestInit = {
      method: "PATCH",
      headers: {
        "Content-Type": this.contentType,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(Client),
    };
    try {
      const response = await fetch(
        new URL(
          `${domainId}/${this.clientsEndpoint}/${Client.id}`,
          this.clientsUrl
        ).toString(),
        options
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const ClientData: Client = await response.json();
      return ClientData;
    } catch (error) {
      throw error;
    }
  }

  public async UpdateClientSecret(
    Client: Client,
    domainId: string,
    token: string
  ): Promise<Client> {
    // Updates Client secret.
    /**
     * @method UpdateClientSecret - Updates Client secret when provided with a valid token and domain ID,
     * domain ID and Client object.
     * @param {string} Client_id - Client ID.
     * @param {Object} Client - Client object.
     * @param {string} token - User token.
     * @returns {Object} - Client object.
     * @example
     * const Client = {
     * "name": "Client3",
     * "tags": [
     * "tag1"
     * ],
     * "credentials": {
     * "identity": "Clientidentity",
     * "secret":"56788912"
     * },
     * "owner": "bb7edb32-2eac-4aad-aebe-ed96fe073879",
     * "id": "bb7edb32-2eac-4aad-aebe-ed96fe073879",
     * }
     */

    const options: RequestInit = {
      method: "PATCH",
      headers: {
        "Content-Type": this.contentType,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ secret: Client.credentials?.secret }),
    };
    try {
      const response = await fetch(
        new URL(
          `${domainId}/${this.clientsEndpoint}/${Client.id}/secret`,
          this.clientsUrl
        ).toString(),
        options
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const ClientData: Client = await response.json();
      return ClientData;
    } catch (error) {
      throw error;
    }
  }

  public async UpdateClientTags(
    Client: Client,
    domainId: string,
    token: string
  ): Promise<Client> {
    // Updates Client tags.
    /**
     * @method UpdateClientTags - Updates Client tags when provided with a valid token,
     * domain ID and Client object.
     *
     * @param {Object} Client - Client object.
     * @param {string} domainId - The Domain ID.
     * @param {string} token - User token.
     * @returns {Object} - Client object.
     * @example
     * const Client = {
     * "name": "Client3",
     * "tags": [
     * "tag1"
     * ],
     * "credentials": {
     * "identity": "Clientidentity",
     * "secret":"56788912"
     * },
     * "owner": "bb7edb32-2eac-4aad-aebe-ed96fe073879",
     * "id": "bb7edb32-2eac-4aad-aebe-ed96fe073879",
     * }
     */

    const options: RequestInit = {
      method: "PATCH",
      headers: {
        "Content-Type": this.contentType,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(Client),
    };

    try {
      const response = await fetch(
        new URL(
          `${domainId}/${this.clientsEndpoint}/${Client.id}/tags`,
          this.clientsUrl
        ).toString(),
        options
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const ClientData: Client = await response.json();
      return ClientData;
    } catch (error) {
      throw error;
    }
  }

  public async Client(
    clientId: string,
    domainId: string,
    token: string
  ): Promise<Client> {
    // Gets a Client
    /**
     * Provides information about the Client with provided ID. The Client is
     * retrieved using authorization token.
     * @method Client - Gets a Client.
     * @param {String} ClientId - Client ID.
     * @param {string} domainId - The Domain ID.
     * @param {String} token - Access token.
     * @returns {Object} - Client object.
     * @example
     * const ClientId = "886b4266-77d1-4258-abae-2931fb4f16de"
     *
     */

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
          `${domainId}/${this.clientsEndpoint}/${clientId}`,
          this.clientsUrl
        ).toString(),
        options
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const ClientData: Client = await response.json();
      return ClientData;
    } catch (error) {
      throw error;
    }
  }

  /**
     * @method Clients
     * Retrieves all clients matching the provided query parameters.
     * @param {PageMetadata} queryParams - Query parameters for the request.
     * @param {string} domainId - The  unique ID of the domain.
     * @param {string} token - Authorization token.
     * @returns {Promise<ClientsPage>} - A page of clients.
     * @throws {Error} If the clients cannot be fetched.
  */
  public async Clients(
    queryParams: PageMetadata,
    domainId: string,
    token: string
  ): Promise<ClientsPage> {
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
          `${domainId}/${this.clientsEndpoint}?${new URLSearchParams(
            stringParams
          ).toString()}`,
          this.clientsUrl
        ).toString(),
        options
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const ClientsData: ClientsPage = await response.json();
      return ClientsData;
    } catch (error) {
      throw error;
    }
  }

  public async ListUserClients(
    userId: string,
    queryParams: PageMetadata,
    domainId: string,
    token: string
  ): Promise<ClientsPage> {
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
          `${domainId}/users/${userId}/clients?${new URLSearchParams(stringParams).toString()}`,
          this.usersUrl
        ).toString(),
        options
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const clientsData: ClientsPage = await response.json();
      return clientsData;
    } catch (error) {
      throw error;
    }
  }

  /**
  * @method ClientParents
  * Sets parent to a channel.
  * @param {string} domainId - The  unique ID of the domain.
  * @param {string} clientlId - The unique ID of the channel to be updated.
  * @param {string} parentGroupId - The unique ID of the group to be set as the parent.
  * @param {string} token - Authorization token.
  * @returns {Promise<Response>} - A promise that resolves when the parent group is successfully set for the specified channel.
  * @throws {Error} If the parent group cannot be set for the channel.
  */
  public async ClientParents(domainId: string, clientlId: string, parentGroupId: string, token: string) : Promise<Response> {
    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": this.contentType,
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ parent_group_id: parentGroupId })
    };
    try {
      const response = await fetch(
        new URL(`${domainId}/${this.clientsEndpoint}/${clientlId}/parent`, this.clientsUrl).toString(),
        options
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const addClientParentsResponse: Response = { status: response.status, message: "Client Group Parent added successfully" };
      return addClientParentsResponse;
    } catch (error) {
      throw error;
    }
  }

  /**
  * @method DeleteClientParents
  * Removes the parent group from a specified client.
  * @param {string} domainId - The  unique ID of the domain.
  * @param {string} clientId - The  unique ID of the client.
  * @param {string} token - Authorization token.
  * @returns {Promise<Response>} - A promise that resolves when the parent group is successfully removed from the specified channel.
  * @throws {Error} If the parent group cannot removed from the channel.
  */
  public async DeleteClientParents(domainId: string, clientId: string, token: string) : Promise<Response> {
    const options: RequestInit = {
      method: "DELETE",
      headers: {
        "Content-Type": this.contentType,
        Authorization: `Bearer ${token}`
      },
    };
    try {
      const response = await fetch(
        new URL(
          `${domainId}/${this.clientsEndpoint}/${clientId}/parent`,
          this.clientsUrl
        ).toString(),
        options
      );
      console.log("url", response.url);
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const deleteChannelParentsResponse: Response = { status: response.status, message: "Channel Group Parent deleted successfully" };
      return deleteChannelParentsResponse;
    } catch (error) {
      throw error;
    }
  }

  public async DeleteClient(
    ClientId: string,
    domainId: string,
    token: string
  ): Promise<Response> {
    // Deletes a Client.
    /**
     * @method DeleteClient - Deletes a Client.
     * @param {string} ClientId - Client ID.
     * @param {string} domainId - The Domain ID.
     * @param {string} token - User token.
     * @returns {Object} - NoClient
     *  */
    const options: RequestInit = {
      method: "DELETE",
      headers: {
        "Content-Type": this.contentType,
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await fetch(
        new URL(
          `${domainId}/${this.clientsEndpoint}/${ClientId}`,
          this.clientsUrl
        ).toString(),
        options
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const deleteResponse: Response = {
        status: response.status,
        message: "Client deleted successfully",
      };
      return deleteResponse;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @method CreateClientRole
   * Creates a new role within a specific client.
   * @param {string} clientId - The unique identifier of the client.
   * @param {string} roleName - The name of the role to create.
   * @param {string} token - Authorization token.
   * @param {string[]} optionalActions - Optional actions assigned to the role.
   * @param {string[]} optionalMembers - Optional members assigned to the role.
   * @returns {Promise<Role>} A promise that resolves with the role created.
   * @throws {Error} If the role cannot be created or already exists.
   */
  public async CreateClientRole(
    clientId: string,
    roleName: string,
    domainId: string,
    token: string,
    optionalActions?: string[],
    optionalMembers?: string[],
  ): Promise<Role> {
    try {
      const role: Role = await this.clientRoles.CreateRole(
        this.clientsUrl,
        `${domainId}/${this.clientsEndpoint}`,
        clientId,
        roleName,
        token,
        optionalActions,
        optionalMembers,
      );
      return role;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @method ListClientRoles
   * Lists all roles within a specific client.
   * @param {string} clientId - The unique identifier of the client.
   * @param {PageMetadata} queryParams - Metadata for pagination or filters.
   * @param {string} token - Authorization token.
   * @returns {Promise<RolePage>} A promise that resolves with a page of roles in the domain.
   * @throws {Error} If the client is invalid or roles cannot be fetched.
   */
  public async ListClientRoles(
    clientId: string,
    domainId: string,
    queryParams: PageMetadata,
    token: string,
  ): Promise<RolePage> {
    try {
      const rolesPage: RolePage = await this.clientRoles.ListRoles(
        this.clientsUrl,
        `${domainId}/${this.clientsEndpoint}`,
        clientId,
        queryParams,
        token,
      );
      return rolesPage;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @method ViewClientRole
   * Retrieves details about a specific role in a client.
   * @param {string} clientId - The unique identifier of the client.
   * @param {string} roleName - The unique identifier of the role.
   * @param {string} token - Authorization token.
   * @returns {Promise<Role>} A promise that resolves with the role details.
   * @throws {Error} If the role does not exist or cannot be retrieved.
   */
  public async ViewClientRole(
    clientId: string,
    domainId: string,
    roleName: string,
    token: string,
  ): Promise<Role> {
    try {
      const role = await this.clientRoles.ViewRole(
        this.clientsUrl,
        `${domainId}/${this.clientsEndpoint}`,
        clientId,
        roleName,
        token,
      );
      return role;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @method UpdateClientRole
   * Updates the details of a specific role in a client.
   * @param {string} clientId - The unique identifier of the client.
   * @param {string} roleName - The unique identifier of the role.
   * @param {Role} role - The role to be updated.
   * @param {string} token - Authorization token.
   * @returns {Promise<Role>} A promise that resolves with the updated role.
   * @throws {Error} If the role cannot be updated.
   */
  public async UpdateClientRole(
    clientId: string,
    domainId: string,
    roleName: string,
    role: Role,
    token: string,
  ): Promise<Role> {
    try {
      const updatedRole = await this.clientRoles.UpdateRole(
        this.clientsUrl,
        `${domainId}/${this.clientsEndpoint}`,
        clientId,
        roleName,
        role,
        token,
      );
      return updatedRole;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Deletes a specific role from a client.
   *
   * @function DeleteClientRole
   * @param {string} clientId - The unique identifier of the client.
   * @param {string} roleName - The unique identifier of the role.
   * @param {string} token - Authorization token.
   * @returns {Promise<Response>} A promise that resolves when the role is deleted.
   * @throws {Error} If the role cannot be deleted.
   */
  public async DeleteClientRole(
    clientId: string,
    domainId: string,
    roleName: string,
    token: string,
  ): Promise<Response> {
    try {
      const response = await this.clientRoles.DeleteRole(
        this.clientsUrl,
        `${domainId}/${this.clientsEndpoint}`,
        clientId,
        roleName,
        token,
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @method AddClientRoleActions
   * Adds actions to a specific role in a client.
   * @param {string} clientId - The unique identifier of the client.
   * @param {string} roleName - The unique identifier of the role.
   * @param {string} token - Authorization token.
   * @param {string[]} actions - The actions to add to the role.
   * @returns {Promise<string[]>} A promise that resolves with an array of actions.
   * @throws {Error} If the actions cannot be added.
   */
  public async AddClientRoleActions(
    clientId: string,
    domainId: string,
    roleName: string,
    actions: string[],
    token: string,
  ) {
    try {
      const response = await this.clientRoles.AddRoleActions(
        this.clientsUrl,
        `${domainId}/${this.clientsEndpoint}`,
        clientId,
        roleName,
        actions,
        token,
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @method ListClientRoleActions
   * Lists all actions associated with a specific role in a client.
   * @param {string} clientId - The unique identifier of the client.
   * @param {string} roleName - The unique identifier of the role.
   * @param {string} token - Authorization token.
   * @returns {Promise<string[]>} A promise that resolves with an array of actions.
   * @throws {Error} If actions cannot be retrieved.
   */
  public async ListClientRoleActions(
    clientId: string,
    domainId: string,
    roleName: string,
    token: string,
  ): Promise<string[]> {
    try {
      const updatedRole = await this.clientRoles.ListRoleActions(
        this.clientsUrl,
        `${domainId}/${this.clientsEndpoint}`,
        clientId,
        roleName,
        token,
      );
      return updatedRole;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @method DeleteClientRoleActions
   * Deletes specific actions from a role in a client.
   * @param {string} clientId - The unique identifier of the client.
   * @param {string} roleName - The unique identifier of the role.
   * @param {string[]} actions - The actions to delete from the role.
   * @param {string} token - Authorization token.
   * @returns {Promise<Response>} A promise that resolves when actions are deleted.
   * @throws {Error} If the actions cannot be deleted.
   */
  public async DeleteClientRoleActions(
    clientId: string,
    domainId: string,
    roleName: string,
    actions: string[],
    token: string,
  ): Promise<Response> {
    try {
      const response = await this.clientRoles.DeleteRoleActions(
        this.clientsUrl,
        `${domainId}/${this.clientsEndpoint}`,
        clientId,
        roleName,
        actions,
        token,
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @method DeleteAllClientRoleActions
   * Deletes all actions associated with a specific role in a client.
   * @param {string} clientId - The unique identifier of the client.
   * @param {string} roleName - The unique identifier of the role.
   * @param {string} token - Authorization token.
   * @returns {Promise<Response>} A promise that resolves when all actions are deleted.
   * @throws {Error} If the actions cannot be deleted.
   */
  public async DeleteAllClientRoleActions(
    clientId: string,
    domainId: string,
    roleName: string,
    token: string,
  ): Promise<Response> {
    try {
      const response = await this.clientRoles.DeleteAllRoleActions(
        this.clientsUrl,
        `${domainId}/${this.clientsEndpoint}`,
        clientId,
        roleName,
        token,
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @method AddClientRoleMembers
   * Adds members to a specific role in a client.
   * @param {string} clientId - The unique identifier of the client.
   * @param {string} roleName - The unique identifier of the role.
   * @param {string[]} members - The IDs of the members to add.
   * @param {string} token - Authorization token.
   * @returns {Promise<string[]>} A promise that resolves with an array of member ids.
   * @throws {Error} If the members cannot be added.
   */
  public async AddClientRoleMembers(
    clientId: string,
    domainId: string,
    roleName: string,
    members: string[],
    token: string,
  ): Promise<string[]> {
    try {
      const response = await this.clientRoles.AddRoleMembers(
        this.clientsUrl,
        `${domainId}/${this.clientsEndpoint}`,
        clientId,
        roleName,
        members,
        token,
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @method ListClientRoleMembers
   * Lists all members associated with a specific role in a client.
   * @param {string} clientId - The unique identifier of the client.
   * @param {string} roleName - The unique identifier of the role.
   * @param {string} token - Authorization token.
   * @returns {Promise<string[]>} A promise that resolves with an array of member ids.
   * @throws {Error} If members cannot be retrieved.
   */
  public async ListClientRoleMembers(
    clientId: string,
    domainId: string,
    roleName: string,
    queryParams: BasicPageMeta,
    token: string,
  ): Promise<string[]> {
    try {
      const updatedRole = await this.clientRoles.ListRoleMembers(
        this.clientsUrl,
        `${domainId}/${this.clientsEndpoint}`,
        clientId,
        roleName,
        queryParams,
        token,
      );
      return updatedRole;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @method DeleteClientRoleMembers
   * Deletes specific members from a role in a client.
   * @param {string} clientId - The unique identifier of the client.
   * @param {string} roleName - The unique identifier of the role.
   * @param {string[]} members - The IDs of the members to delete.
   * @param {string} token - Authorization token.
   * @returns {Promise<Response>} A promise that resolves when members are deleted.
   * @throws {Error} If the members cannot be deleted.
   */
  public async DeleteClientRoleMembers(
    clientId: string,
    domainId: string,
    roleName: string,
    members: string[],
    token: string,
  ): Promise<Response> {
    try {
      const response = await this.clientRoles.DeleteRoleMembers(
        this.clientsUrl,
        `${domainId}/${this.clientsEndpoint}`,
        clientId,
        roleName,
        members,
        token,
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @method DeleteAllClientRoleMembers
   * Deletes all members associated with a specific role in a client.
   * @param {string} clientId - The unique identifier of the client.
   * @param {string} roleName - The unique identifier of the role.
   *  @param {string} token - Authorization token.
   * @returns {Promise<Response>} A promise that resolves when all members are deleted.
   * @throws {Error} If the members cannot be deleted.
   */
  public async DeleteAllClientRoleMembers(
    clientId: string,
    domainId: string,
    roleName: string,
    token: string,
  ): Promise<Response> {
    try {
      const response = await this.clientRoles.DeleteAllRoleMembers(
        this.clientsUrl,
        `${domainId}/${this.clientsEndpoint}`,
        clientId,
        roleName,
        token,
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
}
