import Errors from "./errors";

import type {
  Channel,
  GroupsPage,
  PageMetadata,
  Permissions,
  Response,
  ChannelsPage,
  UsersPage,
  GroupRelation,
} from "./defs";

import Roles from "./roles";
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
  private readonly usersUrl?: URL;

  private readonly contentType: string;

  private readonly channelsEndpoint: string;

 // private readonly thingsUrl: URL;

  private readonly channelsUrl: URL
  private readonly channelRoles: Roles;
  public constructor({
    usersUrl,
    channelsUrl,
  }: {
    usersUrl?: string;
    channelsUrl:string;
  }) {
    this.channelsUrl = new URL(channelsUrl);
    if (usersUrl !== undefined) {
      this.usersUrl = new URL(usersUrl);
    } else {
      this.usersUrl = new URL("");
    }
    this.contentType = "application/json";
    this.channelsEndpoint = "channels";
  }

  public async CreateChannel(
    channel: Channel,
    domainId: string,
    token: string
  ): Promise<Channel> {
    // Creates a new a channel
    /**
     * @method Create - Creates new channels when provided with a channel object
     * with viable fresh information and a valid token.
     * @param {Object} channel - Channel Object with a name and id.
     * @param {string} domainId - The Domain ID.
     * @param {String} token - Authentication token.
     * @returns {Object} - Channel object.
     * @example
     * const channel = {
     * "name": "channelName",
     * "description": "long channel description",
     *  "metadata": {
     *       "domain": "example.com"
     *  },
     * "status": "enabled",
     * }
     *
     */
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

  public async Channel(
    channelId: string,
    domainId: string,
    token: string
  ): Promise<Channel> {
    // Retrieves channel with specified id.
    /**
     * @method Get - Retrieves channel with specified id and a valid token.
     * @param {String} channel_id - Channel id.
     * @param {string} domainId - The Domain ID.
     * @param {String} token - Authentication token.
     * @returns {Object} - Channel object.
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

  public async ChannelsByThing(
    thingID: string,
    queryParams: PageMetadata,
    domainId: string,
    token: string
  ): Promise<ChannelsPage> {
    // Retrieves list of channels a thing is connected to with pagination metadata.
    /**
     * @method ChannelsByThing - Retrieves list of channels a thing is connected to with pagination metadata.
     * @param {String} channel_id - Channel id.
     * @param {Object} queryParams - Query parameters for the request.
     * @param {string} domainId - The Domain ID.
     * @param {String} token - Authentication token.
     * @returns {List} - Channels Page.
     */
    const stringParams: Record<string, string> = Object.fromEntries(
      Object.entries(queryParams).map(([key, value]) => [key, String(value)])
    );
    const options = {
      method: "GET",
      headers: {
        "Content-Type": this.contentType,
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await fetch(
        new URL(
          `${domainId}/things/${thingID}/${
            this.channelsEndpoint
          }?${new URLSearchParams(stringParams).toString()}`,
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

  public async Channels(
    queryParams: PageMetadata,
    domainId: string,
    token: string
  ): Promise<ChannelsPage> {
    // Provides a list of all channels with pagination metadata.
    /**
     * @method GetAll - Provides a list of all channels with pagination metadata.
     * @param {Object} queryParams - Query parameters for the request.
     * @param {string} domainId - The Domain ID.
     * @param {String} token - Authentication token.
     * @returns {Object} - returns Channels Page
     */
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
      const channelsPage: ChannelsPage = await response.json()
      return channelsPage;
    } catch (error) {
      throw error;
    }
  }

  public async UpdateChannelNameAndMetadata (
    channel: Channel,
    domainId: string,
    token: string
  ): Promise<Channel> {
    // Updates channel metadata and name.
    /**
     * @method Update - Updates channel with specified id.
     * @param {Object} channel - Channel object with new information.
     * @param {string} domainId - The Domain ID.
     * @param {String} token - Authentication token.
     * @returns {Object} - returns updated Channel.
     */

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
      const updatedChannel: Channel = await response.json()
      return updatedChannel
    } catch (error) {
      throw error;
    }
  }

  public async UpdateChannelTags (
    channel: Channel,
    domainId: string,
    token: string
  ): Promise<Channel> {
    // Updates channel tags.
    /**
     * @method Update - Updates channel with specified id.
     * @param {Object} channel - Channel object with new information.
     * @param {string} domainId - The Domain ID.
     * @param {String} token - Authentication token.
     * @returns {Object} - returns updated Channel.
     */

    const options: RequestInit = {
      method: 'PATCH',
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
      )
      console.log("url", response.url);
      if (!response.ok) {
        const errorRes = await response.json();
        throw this.channelError.HandleError(errorRes.message, response.status);
      }
      const updatedChannel: Channel = await response.json();
      return updatedChannel
    } catch (error) {
      throw error
    }
  }

  public async Disable (
    channelId: string,
    domainId: string,
    token: string
  ): Promise<Channel> {
    // Disables channel with specified id.
    /**
     * @method Disable - Disables channel with specified id.
     * @param {Object} channelId - Channel ID.
     * @param {string} domainId - The Domain ID.
     * @param {String} token - Authentication token.
     * @returns {Object} - Creturns Disabled channel.
     */
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

  public async Enable(
    channelId: string,
    domainId: string,
    token: string
  ): Promise<Channel> {
    // Enables channel with specified id.
    /**
     * @method Enable - Enables a previously disabled channel with specified id.
     * @param {Object} channelId - Channel ID.
     * @param {string} domainId - The Domain ID.
     * @param {String} token - Authentication token.
     * @returns {Object} - Returns Enabled Channel.
     */
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

  public async ChannelPermissions(
    channelId: string,
    domainId: string,
    token: string
  ): Promise<Permissions> {
    // Retrieves channel permissions.
    /**
     * @method ChannelPermission - Retrieves channel permissions with specified id..
     * @param {Object}
     * @param {string} token - Authentication token.
     * @param {string} domainId - The Domain ID.
     * @returns {object} - returns channel domain permissions eg:
     *  { permissions: [ 'admin', 'edit', 'view', 'membership' ] }
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
          `${domainId}/${this.channelsEndpoint}/${channelId}/permissions`,
          this.channelsUrl
        ).toString(),
        options
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const permissions: Permissions = await response.json();
      return permissions;
    } catch (error) {
      throw error;
    }
  }

  public async AddUserToChannel(
    channelId: string,
    userIds: string[],
    relation: GroupRelation,
    domainId: string,
    token: string
  ): Promise<Response> {
    // Adds user to channel.
    /**
     * @method AddUser - Adds user to channel when provided with a valid token,
     * channel id and a user id.
     * @param  {string []} userIds - Array of user id's.
     * @param {string} channelId - Channel ID.
     * @param {string} relation - The member's role.
     * @param {string} domainId - The Domain ID.
     * @param {string} token - Authentication token.
     * @returns Response - 'User Added Successfully'.
     *  */
    const req = { user_ids: userIds, relation };
    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": this.contentType,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(req),
    };
    try {
      const response = await fetch(
        new URL(
          `${domainId}/${this.channelsEndpoint}/${channelId}/users/assign`,
          this.channelsUrl
        ).toString(),
        options
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const addUserResponse: Response = {
        status: response.status,
        message: "User added successfully",
      };
      return addUserResponse;
    } catch (error) {
      throw error;
    }
  }

  public async RemoveUserFromChannel(
    channelId: string,
    userIds: string[],
    relation: GroupRelation,
    domainId: string,
    token: string
  ): Promise<Response> {
    // Removes user from channel.
    /**
     * @method RemoveUserFromChannel - Removes user from channel when provided with a valid token,
     * channel id and a user id.
     * @param {String} relation - The member's role.
     * @param  {string []} userIds - Array of user id's.
     * @param {string} channelId - Channel ID.
     * @param {string} domainId - The Domain ID.
     * @param {string} token -  Authentication token.
     * @returns Response - 'User Removed Successfully'.
     * */
    const req = { user_ids: userIds, relation };
    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": this.contentType,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(req),
    };
    try {
      const response = await fetch(
        new URL(
          `${domainId}/${this.channelsEndpoint}/${channelId}/users/unassign`,
          this.channelsUrl
        ).toString(),
        options
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const removeUserResponse: Response = {
        status: response.status,
        message: "User removed successfully",
      };
      return removeUserResponse;
    } catch (error) {
      throw error;
    }
  }

  public async DeleteChannel(
    channelId: string,
    domainId: string,
    token: string
  ): Promise<Response> {
    // Deletes channel with specified id.
    /**
     * @method DeleteChannel - Deletes channel with specified id.
     * @param {Object} channelId - Channel ID.
     * @param {string} domainId - The Domain ID.
     * @param {String} token - Authentication token.
     * @returns {Object} - Returns response message.
     */
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
          `${domainId}/${this.channelsEndpoint}/${channelId}`, this.channelsUrl
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

  public async ListChannelUserGroups(
    channelId: string,
    queryParams: PageMetadata,
    domainId: string,
    token: string
  ): Promise<GroupsPage> {
    // Lists groups in a channel.
    /**
     * @method ListChannelUsersGroups - Lists groups in a channel.
     * @param {string} channelId - Channel ID.
     * @param {Object} queryParams - Query parameters for the request.
     * @param {string} domainId - The Domain ID.
     * @param {string} token - Authentication token
     * @returns {Object} - Groups Page.
     * */
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
          `${domainId}/channels/${channelId}/groups?${new URLSearchParams(
            stringParams
          ).toString()}`,
          this.usersUrl
        ).toString(),
        options
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const groupsPage: GroupsPage = await response.json();
      return groupsPage;
    } catch (error) {
      throw error;
    }
  }

  public async ConnectThing(
    thingId: string,
    channelId: string,
    domainId: string,
    token: string
  ): Promise<Response> {
    // Connects thing to channel.
    /**
     * @method ConnectThing - Connects thing to channel when provided with a valid token,
     * channel id and a thing id. The thing must have an action that it can perform over
     * the channel.
     * @param {string} thingId - Thing ID.
     * @param {string} channelId - Channel ID.
     * @param {string} domainId - The Domain ID.
     * @param {string} token - Authentication token.
     *
     */
    const options = {
      method: "POST",
      headers: {
        "Content-Type": this.contentType,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ thing_id: thingId, channel_id: channelId }),
    };
    try {
      const response = await fetch(
        new URL(
          `${domainId}/${this.channelsEndpoint}/${channelId}/things/${thingId}/connect`,
          this.channelsUrl
        ).toString(),
        options
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const connectThingResponse: Response = {
        status: response.status,
        message: "Thing connected successfully",
      };
      return connectThingResponse;
    } catch (error) {
      throw error;
    }
  }

  public async Connect(
    thingId: string,
    channelId: string,
    domainId: string,
    token: string
  ): Promise<Response> {
    // Connects thing to channel.
    /**
     * @method Connect - Connect thing to channel when provided with a valid token,
     * channel id and thing id.
     * @param thingId - thing ID.
     * @param channelId - channel ID.
     * @param {string} domainId - The Domain ID.
     * @param {string} token - Authentication token.
     * @returns Response - 'Thing Connected Successfully'.
     */
    const options = {
      method: "POST",
      headers: {
        "Content-Type": this.contentType,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ thing_id: thingId, channel_id: channelId }),
    };
    try {
      const response = await fetch(
        new URL(`${domainId}/connect`, this.channelsUrl).toString(),
        options
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const connectResponse: Response = {
        status: response.status,
        message: "Thing connected successfully",
      };
      return connectResponse;
    } catch (error) {
      throw error;
    }
  }

  public async Disconnect(
    thingId: string,
    channelId: string,
    domainId: string,
    token: string
  ): Promise<Response> {
    // Disconnects thing from channel.
    /**
     * @method Disconnect - Disconnects thing from channel when provided with a valid token,
     * channel id and a thing id. The thing must have an action that it can perform over
     * the channel.
     * @param {string} thingId - Thing ID.
     * @param {string} channelId - Channel ID.
     * @param {string} domainId - The Domain ID.
     * @param {string} token - Authentication token.
     *
     */
    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": this.contentType,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ thing_id: thingId, channel_id: channelId }),
    };
    try {
      const response = await fetch(
        new URL(`${domainId}/disconnect`, this.channelsUrl).toString(),
        options
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const disconnectResponse: Response = {
        status: response.status,
        message: "Thing disconnected successfully",
      };
      return disconnectResponse;
    } catch (error) {
      throw error;
    }
  }

  public async DisconnectThing(
    thingId: string,
    channelId: string,
    domainId: string,
    token: string
  ): Promise<Response> {
    // Disconnects thing from channel.
    /**
     * @method DisconnectThing - Disconnects thing from channel when provided with a valid token,
     * channel id and a thing id. The thing must have an action that it can perform over
     * the channel.
     * @param {string} thingId - Thing ID.
     * @param {string} channelId - Channel ID.
     * @param {string} token - Authentication token.
     *
     */
    const options = {
      method: "POST",
      headers: {
        "Content-Type": this.contentType,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ thing_id: thingId, channel_id: channelId }),
    };
    try {
      const response = await fetch(
        new URL(
          `${domainId}/${this.channelsEndpoint}/${channelId}/things/${thingId}/disconnect`,
          this.channelsUrl
        ).toString(),
        options
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const disconnectThingResponse: Response = {
        status: response.status,
        message: "Thing disconnected successfully",
      };
      return disconnectThingResponse;
    } catch (error) {
      throw error;
    }
  }

  public async ListChannelUsers(
    channelId: string,
    queryParams: PageMetadata,
    domainId: string,
    token: string
  ): Promise<UsersPage> {
    // Lists users in a channel.
    /**
     * @method ListChannelUsers - Lists users in a channel.
     * @param {string} channelId - Channel ID.
     * @param {Object} queryParams - Query parameters for the request.
     * @param {string} domainId - The Domain ID.
     * @param {string} token - Authentication token.
     * @returns {Object} - Users Page.
     * */
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
          `${domainId}/channels/${channelId}/users?${new URLSearchParams(
            stringParams
          ).toString()}`,
          this.usersUrl
        ).toString(),
        options
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const usersPage: UsersPage = await response.json();
      return usersPage;
    } catch (error) {
      throw error;
    }
  }

  public async AddUserGroupToChannel(
    channelId: string,
    userGroupIds: string[],
    domainId: string,
    token: string
  ): Promise<Response> {
    // Adds user group to channel.
    /**
     * @method AddUserGroup - Adds user group to channel when provided with a valid token,
     * channel id and a user group id.
     * @param {string []} userGroupIds - User Group IDs.
     * @param {string} channelId - Channel ID.
     * @param {string} domainId - The Domain ID.
     * @param {string} token - User token.
     * */
    const options = {
      method: "POST",
      headers: {
        "Content-Type": this.contentType,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ group_ids: userGroupIds }),
    };
    try {
      const response = await fetch(
        new URL(
          `${domainId}/${this.channelsEndpoint}/${channelId}/groups/assign`,
          this.channelsUrl
        ).toString(),
        options
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const addUserGroupResponse: Response = {
        status: response.status,
        message: "Group added successfully",
      };
      return addUserGroupResponse;
    } catch (error) {
      throw error;
    }
  }

  public async RemoveUserGroupFromChannel(
    channelId: string,
    userGroupIds: string[],
    domainId: string,
    token: string
  ): Promise<Response> {
    // Removes user group from channel.
    /**
     * @method RemoveUserGroup - Removes user group from channel when provided with a valid token,
     * channel id and a user group id.
     * @param {string []} userGroupIds - User Group IDs.
     * @param {string} channelId - Channel ID.
     * @param {string} domainId - The Domain ID.
     * @param {string} token - User token.
     * */
    const options = {
      method: "POST",
      headers: {
        "Content-Type": this.contentType,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ group_ids: userGroupIds }),
    };
    try {
      const response = await fetch(
        new URL(
          `${domainId}/${this.channelsEndpoint}/${channelId}/groups/unassign`,
          this.channelsUrl
        ).toString(),
        options
      )
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const deleteChannelParentsResponse: Response = { status: response.status, message: 'Channel Group Parent deleted successfully' }
      return deleteChannelParentsResponse
    } catch (error) {
      throw error;
    }
  }

  

  public async ChannelParents (domainId: string, channelId: string, parentGroupId: string, token: string) : Promise<Response> {
    // Sets of parent to a channel.
    /**
     * @method ChannelParents - Sets a parent to a channels.
     * @param {string} domainId - The Domain ID.
     * @param {string} channelId - Channel ID.
     * @param {string} parentGroupId - Parent Group ID.
     * @param {string} token - User token.
     * @returns {string} Response.
     * */
    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': this.contentType,
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ parent_group_id: parentGroupId })
  }
  try {
      const response = await fetch(
        new URL(`${domainId}/${this.channelsEndpoint}/${channelId}/parent`, this.channelsUrl).toString(),
        options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.channelError.HandleError(errorRes.message, response.status)
      }
      const addChannelParentsResponse: Response = { status: response.status, message: "Channel Group Parent added successfully }
      return addChannelParentsResponse
    } catch (error) {
      throw error;
    }
  }

  public async DeleteChannelParents (domainId: string, channelId: string, token: string) : Promise<Response> {
    // Deletes parent from a channel.
    /**
     * @method DeleteChannelParents - Deletes parent from a channel.
     * @param {string} domainId - The Domain ID.
     * @param {string} channelId - Channel ID.
     * @param {string} parentGroupId - Parent Group ID.
     * @returns {string} - Response.
     * */
    const options: RequestInit = {
      method: 'DELETE',
      headers: {
        'Content-Type': this.contentType,
        Authorization: `Bearer ${token}`
      },
    }
    try {
      const response = await fetch(
        new URL(
          `${domainId}/${this.channelsEndpoint}/${channelId}/parent`,
          this.channelsUrl
        ).toString(),
        options
      );
      console.log("url", response.url)
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.channelError.HandleError(errorRes.message, response.status)
      }
      const deleteChannelParentsResponse: Response = { status: response.status, message: 'Channel Group Parent deleted successfully' }
      return deleteChannelParentsResponse
    } catch (error) {
      throw error
    }
  }

  public async CreateDomainRole(
    domainId: string,
    roleName: string,
    token: string,
    optionalActions?: string[],
    optionalMembers?: string[]
  ) {
    try {
      const role = await this.channelRoles.CreateRole(
        this.channelsUrl,
        this.channelsEndpoint,
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

  public async ListDomainRoles(
    domainId: string,
    queryParams: PageMetadata,
    token: string
  ) {
    try {
      const rolesPage = await this.channelRoles.ListRoles(
        this.channelsUrl,
        this.channelsEndpoint,
        domainId,
        queryParams,
        token
      );
      return rolesPage;
    } catch (error) {
      throw error;
    }
  }

  public async ViewDomainRole(
    domainId: string,
    roleName: string,
    token: string
  ) {
    try {
      const role = await this.channelRoles.ViewRole(
        this.channelsUrl,
        this.channelsEndpoint,
        domainId,
        roleName,
        token
      );
      return role;
    } catch (error) {
      throw error;
    }
  }

  public async UpdateDomainRole(
    domainId: string,
    roleName: string,
    role: Role,
    token: string
  ) {
    try {
      const updatedRole = await this.channelRoles.UpdateRole(
        this.channelsUrl,
        this.channelsEndpoint,
        domainId,
        roleName,
        role,
        token
      );
      return updatedRole;
    } catch (error) {
      throw error;
    }
  }

   public async DeleteDomainRole(
    domainId: string,
    roleName: string,
    token: string
  ) {
    try {
      const response = await this.channelRoles.DeleteRole(
        this.channelsUrl,
        this.channelsEndpoint,
        domainId,
        roleName,
        token
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async AddDomainRoleActions(
    domainId: string,
    roleName: string,
    actions: string[],
    token: string
  ) {
    try {
      const response = await this.channelRoles.AddRoleActions(
        this.channelsUrl,
        this.channelsEndpoint,
        domainId,
        roleName,
        actions,
        token
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async ListDomainRoleActions(
    domainId: string,
    roleName: string,
    token: string
  ) {
    try {
      const updatedRole = await this.channelRoles.ListRoleActions(
        this.channelsUrl,
        this.channelsEndpoint,
        domainId,
        roleName,
        token
      );
      return updatedRole;
    } catch (error) {
      throw error;
    }
  }

  public async DeleteDomainRoleActions(
    domainId: string,
    roleName: string,
    actions: string[],
    token: string
  ) {
    try {
      const response = await this.channelRoles.DeleteRoleActions(
        this.channelsUrl,
        this.channelsEndpoint,
        domainId,
        roleName,
        actions,
        token
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async DeleteAllDomainRoleActions(
    domainId: string,
    roleName: string,
    token: string
  ) {
    try {
      const response = await this.channelRoles.DeleteAllRoleActions(
        this.channelsUrl,
        this.channelsEndpoint,
        domainId,
        roleName,
        token
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async AddDomainRoleMembers(
    domainId: string,
    roleName: string,
    members: string[],
    token: string
  ) {
    try {
      const response = await this.channelRoles.AddRoleMembers(
        this.channelsUrl,
        this.channelsEndpoint,
        domainId,
        roleName,
        members,
        token
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
}
