// Copyright (c) Abstract Machines
// SPDX-License-Identifier: Apache-2.0

import Errors from "./errors";

import type {
  Channel,
  PageMetadata,
  Response,
  ChannelsPage,
  Role,
  RolePage,
  BasicPageMeta,
} from "./defs";
import Roles from "./roles";

/**
 * @class Channels
 * Handles interactions with channels API, including creating, updating and managing channels.
 */
export default class Channels {
  private readonly contentType: string;

  private readonly channelsEndpoint: string;

  private readonly channelsUrl: URL;

  private readonly channelRoles: Roles;

  private readonly usersUrl?: URL;

  /**
   * @constructor
   * Initializes the Channel API client.
   * @param {object} config - Configuration object.
   * @param {string} config.channelsUrl - Base URL for the channels API.
   * @param {string} [config.usersUrl] - Optional URL for the users API.
   */
  public constructor({
    channelsUrl,
    usersUrl,
  }: {
    channelsUrl: string;
    usersUrl?: string;
  }) {
    this.channelsUrl = new URL(channelsUrl);
    if (usersUrl !== undefined) {
      this.usersUrl = new URL(usersUrl);
    } else {
      this.usersUrl = new URL("");
    }
    this.contentType = "application/json";
    this.channelsEndpoint = "channels";
    this.channelRoles = new Roles();
  }

  /**
   * @method CreateChannel - Creates a new channel
   * @param {Channel} channel - Channel object with a containing details like name, metadata and tags.
   * @param {string} domainId - The unique ID of the domain.
   * @param {string} token - Authorization token.
   * @returns {Promise<Channel>} channel - The created channel object.
   * @throws {Error} - If the channel cannot be created.
   */
  public async CreateChannel(
    channel: Channel,
    domainId: string,
    token: string
  ): Promise<Channel> {
    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": this.contentType,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(channel),
    };
    try {
      const response = await fetch(
        new URL(
          `${domainId}/${this.channelsEndpoint}`,
          this.channelsUrl
        ).toString(),
        options
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const newChannel: Channel = await response.json();
      return newChannel;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @method Channel - Retrieves a channel by its id.
   * @param {string} channelId - The unique ID of the channel.
   * @param {string} domainId - The unique ID of the domain.
   * @param {string} token - Authorization token.
   * @returns {Promise<Channel>} channel - The requested channel object.
   * @throws {Error} - If the channel cannot be fetched.
   */
  public async Channel(
    channelId: string,
    domainId: string,
    token: string
  ): Promise<Channel> {
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
          `${domainId}/${this.channelsEndpoint}/${channelId}`,
          this.channelsUrl
        ).toString(),
        options
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const channel: Channel = await response.json();
      return channel;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @method CreateChannels - Creates multiple new channels.
   * @param {Channel[]} channels - An array of channel objects, each containing details like name, metadata, and tags.
   * @param {string} domainId - The unique ID of the domain.
   * @param {string} token - Authorization token.
   * @returns {Promise<ChannelsPage>} channelsPage - A page of channels.
   * @throws {Error} - If the channels cannot be created.
   */
  public async CreateChannels(
    channels: Channel[],
    domainId: string,
    token: string
  ): Promise<ChannelsPage> {
    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": this.contentType,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(channels),
    };
    try {
      const response = await fetch(
        new URL(
          `${domainId}/${this.channelsEndpoint}/bulk`,
          this.channelsUrl
        ).toString(),
        options
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const channelData: ChannelsPage = await response.json();
      return channelData;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @method Channels - Retrieves all channels matching the provided query parameters.
   * @param {PageMetadata} queryParams - Query parameters for the request.
   * @param {string} domainId - The unique ID of the domain.
   * @param {string} token - Authorization token.
   * @returns {Promise<ChannelsPage>} channelsPage - A page of channels.
   * @throws {Error} - If the channels cannot be fetched.
   */
  public async Channels(
    queryParams: PageMetadata,
    domainId: string,
    token: string
  ): Promise<ChannelsPage> {
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
          `${domainId}/${this.channelsEndpoint}?${new URLSearchParams(
            stringParams
          ).toString()}`,
          this.channelsUrl
        ).toString(),
        options
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const channelsPage: ChannelsPage = await response.json();
      return channelsPage;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @method UpdateChannelNameAndMetadata - Updates an existing channel's metadata and name.
   * @param {Channel} channel - Channel object with updated properties.
   * @param {string} domainId - The unique ID of the domain.
   * @param {string} token - Authorization token.
   * @returns {Promise<Channel>} channel - The updated channel object.
   * @throws {Error} - If the channel cannot be updated.
   */
  public async UpdateChannelNameAndMetadata(
    channel: Channel,
    domainId: string,
    token: string
  ): Promise<Channel> {
    const options: RequestInit = {
      method: "PATCH",
      headers: {
        "Content-Type": this.contentType,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(channel),
    };
    try {
      const response = await fetch(
        new URL(
          `${domainId}/${this.channelsEndpoint}/${channel.id}`,
          this.channelsUrl
        ).toString(),
        options
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const updatedChannel: Channel = await response.json();
      return updatedChannel;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @method UpdateChannelTags - Updates an existing channel's tags.
   * @param {Channel} channel - Channel object with updated properties.
   * @param {string} domainId - The unique ID of the domain.
   * @param {string} token - Authorization token.
   * @returns {Promise<Channel>} channel - The updated channel object.
   * @throws {Error} - If the channel tags cannot be updated.
   */
  public async UpdateChannelTags(
    channel: Channel,
    domainId: string,
    token: string
  ): Promise<Channel> {
    const options: RequestInit = {
      method: "PATCH",
      headers: {
        "Content-Type": this.contentType,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(channel),
    };
    try {
      const response = await fetch(
        new URL(
          `${domainId}/${this.channelsEndpoint}/${channel.id}/tags`,
          this.channelsUrl
        ).toString(),
        options
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const updatedChannel: Channel = await response.json();
      return updatedChannel;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @method DisableChannel - Disables a specific channel.
   * @param {string} channelId - The unique ID of the channel.
   * @param {string} domainId - The unique ID of the domain.
   * @param {string} token - Authorization token.
   * @returns {Promise<Channel>} channel - The disabled channel object.
   * @throws {Error} - If the channel cannot be disabled.
   */
  public async DisableChannel(
    channelId: string,
    domainId: string,
    token: string
  ): Promise<Channel> {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": this.contentType,
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await fetch(
        new URL(
          `${domainId}/${this.channelsEndpoint}/${channelId}/disable`,
          this.channelsUrl
        ).toString(),
        options
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const disabledChannel: Channel = await response.json();
      return disabledChannel;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @method EnableChannel - Enables a previously disabled channel.
   * @param {string} channelId - The unique ID of the channel.
   * @param {string} domainId - The unique ID of the domain.
   * @param {string} token - Authorization token.
   * @returns {Promise<Channel>} channel - The enabled channel object.
   * @throws {Error} - If the channel cannot be enabled.
   */
  public async EnableChannel(
    channelId: string,
    domainId: string,
    token: string
  ): Promise<Channel> {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": this.contentType,
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await fetch(
        new URL(
          `${domainId}/${this.channelsEndpoint}/${channelId}/enable`,
          this.channelsUrl
        ).toString(),
        options
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const enabledChannel: Channel = await response.json();
      return enabledChannel;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @method DeleteChannel - Deletes channel with specified id.
   * @param {string} channelId - The unique ID of the channel.
   * @param {string} domainId - The unique ID of the domain.
   * @param {string} token - Authorization token.
   * @returns {Promise<Response>} response - A promise that resolves when the channel is deleted.
   * @throws {Error} - If the channel cannot be deleted.
   */
  public async DeleteChannel(
    channelId: string,
    domainId: string,
    token: string
  ): Promise<Response> {
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
          `${domainId}/${this.channelsEndpoint}/${channelId}`,
          this.channelsUrl
        ).toString(),
        options
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const deleteResponse: Response = {
        status: response.status,
        message: "Channel deleted successfully",
      };
      return deleteResponse;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @method ConnectClient - Connects multiple clients to a channel.
   * @param {string[]} clientIds - An array of unique clients IDs to be connected.
   * @param {string} channelId - The  unique ID of the channel to which the clients will connect.
   * @param {string[]}connectionTypes - Connection types can be 'publish', 'subscribe' or both.
   * @param {string} domainId - The unique ID of the domain.
   * @param {string} token - Authorization token.
   * @returns {Promise<Response>} response - A promise that resolves when the clients are connected to the channel.
   * @throws {Error} - If the clients cannot be connected to the channel.
   */
  public async ConnectClient(
    clientIds: string[],
    channelId: string,
    connectionTypes: string[],
    domainId: string,
    token: string
  ): Promise<Response> {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": this.contentType,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        client_ids: clientIds,
        channel_id: channelId,
        types: connectionTypes,
      }),
    };
    try {
      const response = await fetch(
        new URL(
          `${domainId}/${this.channelsEndpoint}/${channelId}/connect`,
          this.channelsUrl
        ).toString(),
        options
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const connectClientResponse: Response = {
        status: response.status,
        message: "Clients connected successfully",
      };
      return connectClientResponse;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @method Connect - Connects multiple clients to multple channels.
   * @param {string[]} clientIds - An array of unique clients IDs to be connected.
   * @param {string[]} channelIds - An array of unique channels IDs to which the clients will connect.
   * @param {string[]} connectionTypes - Connection types can be publish, subscribe or both publish and subscribe
   * @param {string} domainId - The unique ID of the channel.
   * @param {string} token - Authorization token.
   * @returns {Promise<Response>} response - A promise that resolves when the clients are connected to the channels.
   * @throws {Error} - If the clients cannot be connected to the channel.
   */
  public async Connect(
    clientIds: string[],
    channelIds: string[],
    connectionTypes: string[],
    domainId: string,
    token: string
  ): Promise<Response> {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": this.contentType,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        client_ids: clientIds,
        channel_ids: channelIds,
        types: connectionTypes,
      }),
    };
    try {
      const response = await fetch(
        new URL(
          `${domainId}/${this.channelsEndpoint}/connect`,
          this.channelsUrl
        ).toString(),
        options
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const connectResponse: Response = {
        status: response.status,
        message: "Clients connected successfully",
      };
      return connectResponse;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @method Disconnect - Disconnects clients from channels.
   * @param {string[]} clientIds - An array of unique clients IDs to be disconnected.
   * @param {string[]} channelIds -  An array of unique channels IDs to which the clients will disconnect.
   * @param {string[]}connectionTypes - Connection types can be publish, subscribe or both publish and subscribe.
   * @param {string} domainId - The unique ID of the domain.
   * @param {string} token - Authorization token.
   * @returns {Promise<Response>} response - A promise that resolves when the clients are disconnected from the channels.
   * @throws {Error} - If the clients cannot be disconnected from the channels.
   */
  public async Disconnect(
    clientIds: string[],
    channelIds: string[],
    connectionTypes: string[],
    domainId: string,
    token: string
  ): Promise<Response> {
    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": this.contentType,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        client_ids: clientIds,
        channel_ids: channelIds,
        types: connectionTypes,
      }),
    };
    try {
      const response = await fetch(
        new URL(
          `${domainId}/${this.channelsEndpoint}/disconnect`,
          this.channelsUrl
        ).toString(),
        options
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const disconnectResponse: Response = {
        status: response.status,
        message: "Clients disconnected successfully",
      };
      return disconnectResponse;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @method DisconnectClient - Disconnects clients from channel.
   * @param {string[]} clientIds - An array of unique clients IDs to be disconnected.
   * @param {string} channelId - The  unique ID of the channel from which the clients will be disconnected.
   * @param {string[]} connectionTypes - connection types can be publish, subscribe or both publish and subscribe.
   * @param {string} domainId - The unique ID of the domain.
   * @param {string} token - Authorization token.
   * @returns {Promise<Response>} response - A promise that resolves when the clients are disconnected from the channel.
   * @throws {Error} - If the clients cannot be disconnected from the channel.
   */
  public async DisconnectClient(
    clientIds: string[],
    channelId: string,
    connectionTypes: string[],
    domainId: string,
    token: string
  ): Promise<Response> {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": this.contentType,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        client_ids: clientIds,
        channel_id: channelId,
        types: connectionTypes,
      }),
    };
    try {
      const response = await fetch(
        new URL(
          `${domainId}/${this.channelsEndpoint}/${channelId}/disconnect`,
          this.channelsUrl
        ).toString(),
        options
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const disconnectClientResponse: Response = {
        status: response.status,
        message: "Clients disconnected successfully",
      };
      return disconnectClientResponse;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @method SetChannelParentGroup - Sets parent to a channel.
   * @param {string} domainId - The unique ID of the domain.
   * @param {string} channelId - The unique ID of the channel to be updated.
   * @param {string} parentGroupId - The unique ID of the group to be set as the parent.
   * @param {string} token - Authorization token.
   * @returns {Promise<Response>} response - A promise that resolves when the parent group is successfully set for the specified channel.
   * @throws {Error} - If the parent group cannot be set for the channel.
   */
  public async SetChannelParentGroup(
    domainId: string,
    channelId: string,
    parentGroupId: string,
    token: string
  ): Promise<Response> {
    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": this.contentType,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ parent_group_id: parentGroupId }),
    };
    try {
      const response = await fetch(
        new URL(
          `${domainId}/${this.channelsEndpoint}/${channelId}/parent`,
          this.channelsUrl
        ).toString(),
        options
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const addChannelParentsResponse: Response = {
        status: response.status,
        message: "Channel group parent added successfully",
      };
      return addChannelParentsResponse;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @method DeleteChannelParentGroup - Removes the parent group from a specified channel.
   * @param {string} domainId - The unique ID of the domain.
   * @param {string} channelId - The unique ID of the channel.
   * @param {string} token - Authorization token.
   * @returns {Promise<Response>} response - A promise that resolves when the parent group is successfully removed from the specified channel.
   * @throws {Error} - If the parent group cannot be removed from the channel.
   */
  public async DeleteChannelParentGroup(
    domainId: string,
    channelId: string,
    token: string
  ): Promise<Response> {
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
          `${domainId}/${this.channelsEndpoint}/${channelId}/parent`,
          this.channelsUrl
        ).toString(),
        options
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const deleteChannelParentsResponse: Response = {
        status: response.status,
        message: "Channel group parent deleted successfully",
      };
      return deleteChannelParentsResponse;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @method ListChannelActions - Lists all actions available to a specific channel.
   * @param {string} domainId - The unique identifier of the domain.
   * @param {string} token - Authorization token.
   * @returns {Promise<string[]>} actions - A promise that resolves with an array of actions.
   * @throws {Error} - If channel actions cannot be fetched.
   */
  public async ListChannelActions(
    domainId: string,
    token: string
  ): Promise<string[]> {
    try {
      const actions: string[] = await this.channelRoles.ListAvailableActions(
        this.channelsUrl,
        `${domainId}/${this.channelsEndpoint}`,
        token
      );
      return actions;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @method CreateChannelRole - Creates a new role within a specific channel.
   * @param {string} channelId - The unique identifier of the channel.
   * @param {string} domainId - The unique ID of the domain.
   * @param {string} roleName - The name of the role to create.
   * @param {string} token - Authorization token.
   * @param {string[]} optionalActions - Optional actions assigned to the role.
   * @param {string[]} optionalMembers - Optional members assigned to the role.
   * @returns {Promise<Role>} role - A promise that resolves with the role created.
   * @throws {Error} - If the role cannot be created or already exists.
   */
  public async CreateChannelRole(
    channelId: string,
    roleName: string,
    domainId: string,
    token: string,
    optionalActions?: string[],
    optionalMembers?: string[]
  ): Promise<Role> {
    try {
      const role: Role = await this.channelRoles.CreateRole(
        this.channelsUrl,
        `${domainId}/${this.channelsEndpoint}`,
        channelId,
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
   * @method ListChannelRoles - Lists all roles within a specific channel.
   * @param {string} channelId - The unique identifier of the channel.
   * @param {string} domainId - The unique ID of the domain.
   * @param {PageMetadata} queryParams - Metadata for pagination or filters.
   * @param {string} token - Authorization token.
   * @returns {Promise<RolePage>} rolePage - A promise that resolves with a page of roles in the domain.
   * @throws {Error} - If the channel is invalid or roles cannot be fetched.
   */
  public async ListChannelRoles(
    channelId: string,
    domainId: string,
    queryParams: PageMetadata,
    token: string
  ): Promise<RolePage> {
    try {
      const rolesPage: RolePage = await this.channelRoles.ListRoles(
        this.channelsUrl,
        `${domainId}/${this.channelsEndpoint}`,
        channelId,
        queryParams,
        token
      );
      return rolesPage;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @method ViewChannelRole - Retrieves details about a specific role in a channel.
   * @param {string} channelId - The unique identifier of the channel.
   * @param {string} domainId - The unique ID of the domain.
   * @param {string} roleId - The unique identifier of the role.
   * @param {string} token - Authorization token.
   * @returns {Promise<Role>} role - A promise that resolves with the role details.
   * @throws {Error} - If the role does not exist or cannot be retrieved.
   */
  public async ViewChannelRole(
    channelId: string,
    domainId: string,
    roleId: string,
    token: string
  ): Promise<Role> {
    try {
      const role = await this.channelRoles.ViewRole(
        this.channelsUrl,
        `${domainId}/${this.channelsEndpoint}`,
        channelId,
        roleId,
        token
      );
      return role;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @method UpdateChannelRole - Updates the details of a specific role in a channel.
   * @param {string} channelId - The unique identifier of the channel.
   * @param {string} domainId - The unique ID of the domain.
   * @param {string} roleId - The unique identifier of the role.
   * @param {Role} role - The role to be updated.
   * @param {string} token - Authorization token.
   * @returns {Promise<Role>} role - A promise that resolves with the updated role.
   * @throws {Error} - If the role cannot be updated.
   */
  public async UpdateChannelRole(
    channelId: string,
    domainId: string,
    roleId: string,
    role: Role,
    token: string
  ): Promise<Role> {
    try {
      const updatedRole = await this.channelRoles.UpdateRole(
        this.channelsUrl,
        `${domainId}/${this.channelsEndpoint}`,
        channelId,
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
   * @method DeleteChannelRole - Deletes a specific role from a channel.
   * @param {string} channelId - The unique identifier of the channel.
   * @param {string} domainId - The unique ID of the domain.
   * @param {string} roleId - The unique identifier of the role.
   * @param {string} token - Authorization token.
   * @returns {Promise<Response>} response - A promise that resolves when the role is deleted.
   * @throws {Error} - If the role cannot be deleted.
   */
  public async DeleteChannelRole(
    channelId: string,
    domainId: string,
    roleId: string,
    token: string
  ): Promise<Response> {
    try {
      const response = await this.channelRoles.DeleteRole(
        this.channelsUrl,
        `${domainId}/${this.channelsEndpoint}`,
        channelId,
        roleId,
        token
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @method AddChannelRoleActions - Adds actions to a specific role in a channel.
   * @param {string} channelId - The unique identifier of the channel.
   * @param {string} domainId - The unique ID of the domain.
   * @param {string} roleId - The unique identifier of the role.
   * @param {string} token - Authorization token.
   * @param {string[]} actions - The actions to add to the role.
   * @returns {Promise<string[]>} role actions- A promise that resolves with an array of actions.
   * @throws {Error} - If the actions cannot be added.
   */
  public async AddChannelRoleActions(
    channelId: string,
    domainId: string,
    roleId: string,
    actions: string[],
    token: string
  ): Promise<string[]> {
    try {
      const response = await this.channelRoles.AddRoleActions(
        this.channelsUrl,
        `${domainId}/${this.channelsEndpoint}`,
        channelId,
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
   * @method ListChannelRoleActions - Lists all actions associated with a specific role in a channel.
   * @param {string} channelId - The unique identifier of the channel.
   * @param {string} domainId - The unique ID of the domain.
   * @param {string} roleId - The unique identifier of the role.
   * @param {string} token - Authorization token.
   * @returns {Promise<string[]>} role actions - A promise that resolves with an array of actions.
   * @throws {Error} - If actions cannot be retrieved.
   */
  public async ListChannelRoleActions(
    channelId: string,
    domainId: string,
    roleId: string,
    token: string
  ): Promise<string[]> {
    try {
      const updatedRole = await this.channelRoles.ListRoleActions(
        this.channelsUrl,
        `${domainId}/${this.channelsEndpoint}`,
        channelId,
        roleId,
        token
      );
      return updatedRole;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @method DeleteChannelRoleActions - Deletes specific actions from a role in a channel.
   * @param {string} channelId - The unique identifier of the channel.
   * @param {string} domainId - The unique ID of the domain.
   * @param {string} roleId - The unique identifier of the role.
   * @param {string[]} actions - The actions to delete from the role.
   * @param {string} token - Authorization token.
   * @returns {Promise<Response>} response - A promise that resolves when actions are deleted.
   * @throws {Error} - If the actions cannot be deleted.
   */
  public async DeleteChannelRoleActions(
    channelId: string,
    domainId: string,
    roleId: string,
    actions: string[],
    token: string
  ): Promise<Response> {
    try {
      const response = await this.channelRoles.DeleteRoleActions(
        this.channelsUrl,
        `${domainId}/${this.channelsEndpoint}`,
        channelId,
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
   * @method DeleteAllChannelRoleActions - Deletes all actions associated with a specific role in a channel.
   * @param {string} channelId - The unique identifier of the channel.
   * @param {string} domainId - The unique ID of the domain.
   * @param {string} roleId - The unique identifier of the role.
   * @param {string} token - Authorization token.
   * @returns {Promise<Response>} response - A promise that resolves when all actions are deleted.
   * @throws {Error} - If the actions cannot be deleted.
   */
  public async DeleteAllChannelRoleActions(
    channelId: string,
    domainId: string,
    roleId: string,
    token: string
  ): Promise<Response> {
    try {
      const response = await this.channelRoles.DeleteAllRoleActions(
        this.channelsUrl,
        `${domainId}/${this.channelsEndpoint}`,
        channelId,
        roleId,
        token
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @method AddChannelRoleMembers - Adds members to a specific role in a channel.
   * @param {string} channelId - The unique identifier of the channel.
   * @param {string} domainId - The unique ID of the domain.
   * @param {string} roleId - The unique identifier of the role.
   * @param {string[]} members - The IDs of the members to add.
   * @param {string} token - Authorization token.
   * @returns {Promise<string[]>} members - A promise that resolves with an array of member ids.
   * @throws {Error} - If the members cannot be added.
   */
  public async AddChannelRoleMembers(
    channelId: string,
    domainId: string,
    roleId: string,
    members: string[],
    token: string
  ): Promise<string[]> {
    try {
      const response = await this.channelRoles.AddRoleMembers(
        this.channelsUrl,
        `${domainId}/${this.channelsEndpoint}`,
        channelId,
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
   * @method ListChannelRoleMembers - Lists all members associated with a specific role in a channel.
   * @param {string} channelId - The unique identifier of the channel.
   * @param {string} domainId - The unique ID of the domain.
   * @param {string} roleId - The unique identifier of the role.
   * @param {string} token - Authorization token.
   * @returns {Promise<string[]>} members - A promise that resolves with an array of member ids.
   * @throws {Error} - If members cannot be retrieved.
   */
  public async ListChannelRoleMembers(
    channelId: string,
    domainId: string,
    roleId: string,
    queryParams: BasicPageMeta,
    token: string
  ): Promise<string[]> {
    try {
      const updatedRole = await this.channelRoles.ListRoleMembers(
        this.channelsUrl,
        `${domainId}/${this.channelsEndpoint}`,
        channelId,
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
   * @method DeleteChannelRoleMembers - Deletes specific members from a role in a channel.
   * @param {string} channelId - The unique identifier of the channel.
   * @param {string} domainId - The unique ID of the domain.
   * @param {string} roleId - The unique identifier of the role.
   * @param {string[]} members - The IDs of the members to delete.
   * @param {string} token - Authorization token.
   * @returns {Promise<Response>} response - A promise that resolves when members are deleted.
   * @throws {Error} - If the members cannot be deleted.
   */
  public async DeleteChannelRoleMembers(
    channelId: string,
    domainId: string,
    roleId: string,
    members: string[],
    token: string
  ): Promise<Response> {
    try {
      const response = await this.channelRoles.DeleteRoleMembers(
        this.channelsUrl,
        `${domainId}/${this.channelsEndpoint}`,
        channelId,
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
   * @method DeleteAllChannelRoleMembers - Deletes all members associated with a specific role in a channel.
   * @param {string} channelId - The unique identifier of the channel.
   * @param {string} domainId - The unique ID of the domain.
   * @param {string} roleId - The unique identifier of the role.
   * @param {string} token - Authorization token.
   * @returns {Promise<Response>} response - A promise that resolves when all members are deleted.
   * @throws {Error} - If the members cannot be deleted.
   */
  public async DeleteAllChannelRoleMembers(
    channelId: string,
    domainId: string,
    roleId: string,
    token: string
  ): Promise<Response> {
    try {
      const response = await this.channelRoles.DeleteAllRoleMembers(
        this.channelsUrl,
        `${domainId}/${this.channelsEndpoint}`,
        channelId,
        roleId,
        token
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
}
