import Errors from "./errors";

import type {
  Channel,
  PageMetadata,
  Response,
  ChannelsPage,
} from "./defs";

/**
* @class Channels
* Handles interactions with channels API, including creating, updating and managing channels.
*/
export default class Channels {
  private readonly contentType: string;

  private readonly channelsEndpoint: string;

  private readonly channelsUrl: URL;

  /**
   * @constructor
   * Initializes the Channel API client.
   * @param {object} config - Configuration object.
   * @param {string} config.channelsUrl - Base URL for the channels API.
   */
  public constructor({
    channelsUrl,
  }: {
    channelsUrl:string;
  }) {
    this.channelsUrl = new URL(channelsUrl);
    this.contentType = "application/json";
    this.channelsEndpoint = "channels";
  }

  /**
  * @method CreateChannel - Creates a new channel
  * @param {Channel} channel - Channel object with a containing details like name, metadata and tags.
  * @param {string} domainId - The  unique ID of the domain.
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
  * @param {string} domainId - The  unique ID of the domain.
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
  * @param {string} domainId - The  unique ID of the domain.
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
  * @param {string} domainId - The  unique ID of the domain.
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
  * @param {string} domainId - The  unique ID of the domain.
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
          `${domainId}/channels/${channel.id}`,
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
  * @param {string} domainId - The  unique ID of the domain.
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
          `${domainId}/channels/${channel.id}/tags`,
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
  * @method DisableChannel - Disables a spcific channel.
  * @param {string} channelId - The  unique ID of the channel.
  * @param {string} domainId - The  unique ID of the domain.
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
  * @param {string} channelId - The  unique ID of the channel.
  * @param {string} domainId - The  unique ID of the domain.
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
  * @param {string} channelId - The  unique ID of the channel.
  * @param {string} domainId - The  unique ID of the domain.
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
        new URL(`${domainId}/${this.channelsEndpoint}/${channelId}`, this.channelsUrl).toString(),
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
  * @param {string[]}connectionTypes - Connection types can be publish, subscribe or both publish and subscribe
  * @param {string} domainId - The  unique ID of the domain.
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
      body: JSON.stringify({ client_ids: clientIds, channel_id: channelId, types: connectionTypes }),
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
  * @param {string} domainId - The  unique ID of the channel.
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
      body: JSON.stringify({ client_ids: clientIds, channel_ids: channelIds, types: connectionTypes }),
    };
    try {
      const response = await fetch(
        new URL(`${domainId}/${this.channelsEndpoint}/connect`, this.channelsUrl).toString(),
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
  * @param {string} domainId - The  unique ID of the domain.
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
      body: JSON.stringify({ client_ids: clientIds, channel_ids: channelIds, types: connectionTypes }),
    };
    try {
      const response = await fetch(
        new URL(`${domainId}/${this.channelsEndpoint}/disconnect`, this.channelsUrl).toString(),
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
  * @param {string} domainId - The  unique ID of the domain.
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
      body: JSON.stringify({ client_ids: clientIds, channel_id: channelId, types: connectionTypes }),
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
  * @method ChannelParents - Sets parent to a channel.
  * @param {string} domainId - The  unique ID of the domain.
  * @param {string} channelId - The unique ID of the channel to be updated.
  * @param {string} parentGroupId - The unique ID of the group to be set as the parent.
  * @param {string} token - Authorization token.
  * @returns {Promise<Response>} response - A promise that resolves when the parent group is successfully set for the specified channel.
  * @throws {Error} - If the parent group cannot be set for the channel.
  */
  public async ChannelParents(domainId: string, channelId: string, parentGroupId: string, token: string) : Promise<Response> {
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
        new URL(`${domainId}/${this.channelsEndpoint}/${channelId}/parent`, this.channelsUrl).toString(),
        options
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const addChannelParentsResponse: Response = { status: response.status, message: "Channel Group Parent added successfully" };
      return addChannelParentsResponse;
    } catch (error) {
      throw error;
    }
  }

  /**
  * @method DeleteChannelParents - Removes the parent group from a specified channel.
  * @param {string} domainId - The  unique ID of the domain.
  * @param {string} channelId - The  unique ID of the channel.
  * @param {string} token - Authorization token.
  * @returns {Promise<Response>} response - A promise that resolves when the parent group is successfully removed from the specified channel.
  * @throws {Error} - If the parent group cannot removed from the channel.
  */
  public async DeleteChannelParents(domainId: string, channelId: string, token: string) : Promise<Response> {
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
          `${domainId}/${this.channelsEndpoint}/${channelId}/parent`,
          this.channelsUrl
        ).toString(),
        options
      );
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
}
