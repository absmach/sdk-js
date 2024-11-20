import Errors from "./errors";

import type {
  Channel,
  PageMetadata,
  Response,
  ChannelsPage,
} from "./defs";

export default class Channels {
  // Channels API client
  /**
   * @class Channels -
   * Channels API is used for managing Channels. It is used for creating new
   * channels, retrieving them, updating them and disabling them
   * @param {string} channels_url - URL to the Channels service
   * @param {string} content_type - Content type for the requests which is an application
   * json
   * @param {string} channelsEndpoint - Endpoint for the channels' service.
   * @returns {Object} -Channels object
   *
   */

  private readonly contentType: string;

  private readonly channelsEndpoint: string;

  private readonly channelsUrl: URL;

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
  * Creates a new a channel
  * @method Create - Creates new channels when provided with a channel object
  * with viable fresh information and a valid token.
  * @param {Object} channel - Channel Object with a name and id.
  * @param {string} domainId - The Domain ID.
  * @param {String} token - Authentication token.
  * @returns {Object} - Channel object.
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
  * Retrieves channel with specified id.
  * @method Get - Retrieves channel with specified id and a valid token.
  * @param {String} channelId - Channel id.
  * @param {string} domainId - The Domain ID.
  * @param {String} token - Authentication token.
  * @returns {Object} - Channel object.
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
  * Creates multiple channels.
  * @method CreateChannels - Creates multiple channels.
  * @param {Object} channels - Array of channels.
  * @param {string} domainId - The Domain ID.
  * @param {string} token - User token.
  * @returns {Object} - Channel object.
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

  // Provides a list of all channels with pagination metadata.
  /**
  * @method Channels - Provides a list of all channels with pagination metadata.
  * @param {Object} queryParams - Query parameters for the request.
  * @param {string} domainId - The Domain ID.
  * @param {String} token - Authentication token.
  * @returns {Object} - returns Channels Page
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
  * Updates channel metadata and name.
  * @method Update - Updates channel metadata and name with specified id.
  * @param {Object} channel - Channel object with new information.
  * @param {string} domainId - The Domain ID.
  * @param {String} token - Authentication token.
  * @returns {Object} - returns updated Channel.
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
  * @method Update - Updates channel tags with specified id.
  * @param {Object} channel - Channel object with new information.
  * @param {string} domainId - The Domain ID.
  * @param {String} token - Authentication token.
  * @returns {Object} - returns updated Channel.
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
      console.log("url", response.url);
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
  * Disables channel with specified id.
  * @method Disable - Disables channel with specified id.
  * @param {Object} channelId - Channel ID.
  * @param {string} domainId - The Domain ID.
  * @param {String} token - Authentication token.
  * @returns {Object} - returns Disabled channel.
  */
  public async Disable(
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
  * Enables channel with specified id.
  * @method Enable - Enables a previously disabled channel with specified id.
  * @param {Object} channelId - Channel ID.
  * @param {string} domainId - The Domain ID.
  * @param {String} token - Authentication token.
  * @returns {Object} - Returns Enabled Channel.
  */
  public async Enable(
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
  * Deletes channel with specified id.
  * @method DeleteChannel - Deletes channel with specified id.
  * @param {Object} channelId - Channel ID.
  * @param {string} domainId - The Domain ID.
  * @param {String} token - Authentication token.
  * @returns {Object} - Returns response message.
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
  * Connects clients to channel.
  * @method ConnectClient - Connects clients to channel when provided with a valid token,
  * channel id and clients id. The client must have an action that it can perform over
  * the channel.
  * @param {array} clientIds - Client IDs.
  * @param {string} channelId - Channel ID.
  * @param connectionTypes - Connection types can be publish, subscribe or both publish and subscribe
  * @param {string} domainId - The Domain ID.
  * @param {string} token - Authentication token.
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
  * Connects client to channels.
  * @method Connect - Connect clients to channels when provided with a valid token,
  * channel ids and client ids.
  * @param clientIds - client IDs.
  * @param channelIds - channels IDs.
  * @param connectionTypes - connection types can be publish, subscribe or both publish and subscribe
  * @param {string} domainId - The Domain ID.
  * @param {string} token - Authentication token.
  * @returns Response - Returns response message.
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
  * Disconnects client from channel.
  * @method Disconnect - Disconnects clients from channels when provided with a valid token,
  * channel ids and client ids. The clients must have an action that it can perform over
  * the channels.
  * @param {string} clientIds - Client IDs.
  * @param {string} channelIds - Channel IDs.
  * @param connectionTypes - Connection types can be publish, subscribe or both publish and subscribe
  * @param {string} domainId - The Domain ID.
  * @param {string} token - Authentication token.
  * @returns Response - Returns response message.
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
  * Disconnects clients from channel.
  * @method DisconnectClient - Disconnects clients from channel when provided with a valid token,
  * channel id and a client id. The client must have an action that it can perform over
  * the channel.
  * @param {string} clientId - Client ID.
  * @param {string} channelId - Channel ID.
  * @param connectionTypes - connection types can be publish, subscribe or both publish and subscribe.
  * @param {string} domainId - The Domain ID.
  * @param {string} token - Authentication token.
  * @returns Response - Returns response message.
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
  * Sets parent to a channel.
  * @method ChannelParents - Sets a parent to a channels.
  * @param {string} domainId - The Domain ID.
  * @param {string} channelId - Channel ID.
  * @param {string} parentGroupId - Parent Group ID.
  * @param {string} token - User token.
  * @returns Response - Returns response message.
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
  * Deletes parent from a channel.
  * @method DeleteChannelParents - Deletes parent from a channel.
  * @param {string} domainId - The Domain ID.
  * @param {string} channelId - Channel ID.
  * @param {string} parentGroupId - Parent Group ID.
  * @returns Response - Returns response message.
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
}
