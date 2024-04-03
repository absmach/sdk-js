import Errors from './errors'
export interface Channel {
  name?: string
  description?: string
  parent_id?: string
  credentials?: {
    identity?: string
  }
  status?: string
  owner_id?: string
  id?: string
}
interface PageRes {
  total: number
  offset: number
  limit: number
}
// interface GroupsPage{
//   groups: Groups[];
//   page: PageRes;

// }
interface Actions {
  actions: string[]
}

interface ChannelsInterface {
  channels: Channel[]
  page: PageRes
  // id: string;
}

interface Users {
  users: Users[]
  page: PageRes
}

interface BulkChannels {
  channels: Channel[]
}

interface QueryParams {
  offset: number
  limit: number
  [key: string]: number | string
}

interface Permissions {
  permissions: ['admin', 'edit', 'view', 'membership']
}

interface UserRelation {
  user_id: []
  relation?: string
}
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
  private readonly channelsUrl: URL
  private readonly contentType: string
  private readonly channelsEndpoint: string
  private readonly channelError: Errors
  private readonly thingsUrl: URL
  // private readonly thingsEndpoint: string;
  private readonly channelUnshareEndpoint: string = 'unshare'
  private readonly channelPermissionsEndpoint: string = 'permissions'
  public constructor (channelsUrl: string, thingsUrl: string) {
    this.channelsUrl = new URL(channelsUrl)
    this.thingsUrl = new URL(thingsUrl)
    this.contentType = 'application/json'
    this.channelsEndpoint = 'channels'
    this.channelError = new Errors()
  }

  public async CreateChannel (
    channel: Channel,
    token?: string
  ): Promise<Channel> {
    // Creates a new channel
    /**
     * @method Create - Creates new channels when provided with a channel object
     * with viable fresh information and a valid token.
     * @param {Object} channel - Channel Object with a name and id.
     * @param {String} token - An access token that is valid.
     * @returns {Object} - Channel object.
     * @example
     * const channel = {
     * "name": "channelName",
     * "description": "long channel description",
     * "parent_id": "bb7edb32-2eac-4aad-aebe-ed96fe073879",
     *  "metadata": {
     *       "domain": "example.com"
     *  },
     * "status": "enabled",
     * "owner_id": "bb7edb32-2eac-4aad-aebe-ed96fe073879"
     * }
     *
     */
    const options: RequestInit = {
      method: 'post',
      headers: {
        'Content-Type': this.contentType,
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(channel)
    }
    try {
      const response = await fetch(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        new URL(this.channelsEndpoint, this.channelsUrl).toString(),
        options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.channelError.HandleError(errorRes.error, response.status)
      }
      const channelData = await response.json()
      console.log('channelData')
      return channelData
    } catch (error) {
      throw error
    }
  }

  public async CreateChannels (
    channels: Channel[],
    token?: string
  ): Promise<BulkChannels> {
    // Creates multiple channels.

    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': this.contentType,
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(channels)
    }
    console.log('body', options.body)
    try {
      const response = await fetch(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        new URL(this.channelsEndpoint, this.channelsUrl).toString(),
        options
      )
      console.log('url: ', response.url)
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.channelError.HandleError(errorRes.error, response.status)
      }
      const channelData = await response.json()
      return channelData
    } catch (error) {
      throw error
    }
  }

  // new URL(`${this.channelsEndpoint}/bulk`, this.channelsUrl).toString(),
  // options,

  public async Channel (channel_id: string, token: string): Promise<Channel> {
    // Retrieves channel with specified id.
    /**
     * @method Get - Retrieves channel with specified id and a valid token.
     * @param {String} channel_id - Channel id.
     * @param {String} token - An access token that is valid.
     * @returns {Object} - Channel object.
     */
    const options: RequestInit = {
      method: 'get',
      headers: {
        'Content-Type': this.contentType,
        Authorization: `Bearer ${token}`
      }
    }
    try {
      const response = await fetch(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        new URL(this.channelsEndpoint, this.channelsUrl).toString(),
        options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.channelError.HandleError(errorRes.error, response.status)
      }
      const channelData = await response.json()
      return channelData
    } catch (error) {
      throw error
    }
  }

  public async ChannelsByThing (
    thingID: string,
    query_params: QueryParams,
    token: string
  ): Promise<ChannelsInterface> {
    // Retrieves list of things connected to specified channel with pagination metadata.
    /**
     * @method GetByThing - Retrieves list of things connected to specified channel with pagination metadata.
     * @param {String} channel_id - Channel id.
     * @param {Object} query_params - Query parameters for the request.
     * @param {String} token - An access token that is valid.
     * @returns {List} - Things list.
     */
    const stringParams: Record<string, string> = Object.fromEntries(
      Object.entries(query_params).map(([key, value]) => [key, String(value)])
    )
    const options = {
      method: 'get',
      headers: {
        'Content-Type': this.contentType,
        Authorization: `Bearer ${token}`
      }
    }
    try {
      const response = await fetch(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        new URL(
          `${this.channelsEndpoint}/${thingID}/things?${new URLSearchParams(
            stringParams
          ).toString()}`,
          this.channelsUrl
        ).toString(),
        options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.channelError.HandleError(errorRes.error, response.status)
      }
      const channelData = await response.json()
      console.log(channelData)
      return channelData
    } catch (error) {
      throw error
    }
  }

  public async Channels (
    query_params: QueryParams,
    token: string
  ): Promise<ChannelsInterface> {
    // Provides a list of all channels with pagination metadata.
    /**
     * @method GetAll - Provides a list of all channels with pagination metadata.
     * @param {Object} query_params - Query parameters for the request.
     * @param {String} token - An access token that is valid.
     * @returns {Object} - Channel Object.
     */
    const stringParams: Record<string, string> = Object.fromEntries(
      Object.entries(query_params).map(([key, value]) => [key, String(value)])
    )
    const options: RequestInit = {
      method: 'get',
      headers: {
        'Content-Type': this.contentType,
        Authorization: `Bearer ${token}`
      }
    }
    try {
      const response = await fetch(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        new URL(
          `${this.channelsEndpoint}?${new URLSearchParams(
            stringParams
          ).toString()}`,
          this.channelsUrl
        ).toString(),
        options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.channelError.HandleError(errorRes.error, response.status)
      }
      const channelsData = await response.json()
      return channelsData
    } catch (error) {
      throw error
    }
  }

  public async UpdateChannel (
    channel: Channel,
    token: string
  ): Promise<Channel> {
    // Updates channel with specified id.
    /**
     * @method Update - Updates channel with specified id.
     * @param {Object} channel - Channel object with new information.
     * @param {String} token - An access token that is valid.
     * @returns {Object} - Channel Object.
     */

    const options: RequestInit = {
      method: 'PATCH',
      headers: {
        'Content-Type': this.contentType,
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(channel)
    }
    try {
      const response = await fetch(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        new URL(
          `${this.channelsEndpoint}/${channel.id}`,
          this.channelsUrl
        ).toString(),
        options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.channelError.HandleError(errorRes.error, response.status)
      }
      const channelData = await response.json()
      console.log(channelData)
      return channelData
    } catch (error) {
      throw error
    }
  }

  public async Disable (channel: Channel, token: string): Promise<Channel> {
    // Disables channel with specified id.
    /**
     * @method Disable - Disables channel with specified id.
     * @param {Object} channel - Channel object with new information.
     * @param {String} token - An access token that is valid.
     * @returns {Object} - Channel Object.
     */
    const options = {
      method: 'post',
      headers: {
        'Content-Type': this.contentType,
        Authorization: `Bearer ${token}`
      }
    }
    try {
      const response = await fetch(
        new URL(
          `${this.channelsEndpoint}/${channel.id}/disable`,
          this.channelsUrl
        ).toString(),
        options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.channelError.HandleError(errorRes.error, response.status)
      }
      const channelData = await response.json()
      return channelData
    } catch (error) {
      throw error
    }
  }

  public async Enable (channel: Channel, token: string): Promise<Channel> {
    // Disables channel with specified id.
    /**
     * @method Enable - Enables channel with specified id.
     * @param {Object} channel - Channel object with new information.
     * @param {String} token - An access token that is valid.
     * @returns {Object} - Channel Object.
     */
    const options = {
      method: 'post',
      headers: {
        'Content-Type': this.contentType,
        Authorization: `Bearer ${token}`
      }
    }
    try {
      const response = await fetch(
        new URL(
          `${this.channelsEndpoint}/${channel.id}/enable`,
          this.channelsUrl
        ).toString(),
        options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.channelError.HandleError(errorRes.error, response.status)
      }
      const channelData = await response.json()
      return channelData
    } catch (error) {
      throw error
    }
  }

  public async ChannelPermissions (
    channelID: Channel,
    token: string
  ): Promise<any> {
    // Disables channel with specified id.
    /**
     * @method ChannelPermission - Enables channel with specified id.
     * @param {Object}
     *  * @param {string} domainID - domain ID.
     * @param {string} token - user token.
     * @returns {object} - returns an object domain permissions eg:
     *  { permissions: [ 'admin', 'edit', 'view', 'membership' ] }
     * @example
     * const domainID = "domainID";
     */
    const options: RequestInit = {
      method: 'GET',
      headers: {
        'Content-Type': this.contentType,
        Authorization: `Bearer ${token}`
      }
    }
    try {
      const response = await fetch(
        new URL(
          `${this.channelsEndpoint}/${channelID}/permissions`,
          this.channelsUrl
        ).toString(),
        options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.channelError.HandleError(errorRes.error, response.status)
      }
      const channelData: Permissions = await response.json()
      return channelData
    } catch (error) {
      console.error(error)
    }
  }

  public async AddUserToChannel (
    channelID: string,
    userIDs: string[],
    relation: string,
    token: string
  ): Promise<string> {
    const req = { user_ids: userIDs, relation }
    const options: RequestInit = {
      method: 'post',
      headers: {
        'Content-Type': this.contentType,
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(req)
    }
    try {
      const response = await fetch(
        new URL(
          `${this.channelsEndpoint}/${channelID}/users/assign`,
          this.channelsUrl
        ).toString(),
        options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.channelError.HandleError(errorRes.error, response.status)
      }
      return 'Policy created.'
    } catch (error) {
      throw error
    }
  }

  public async RemoveUserFromChannel (
    channelID: string,
    userIDs: string[],
    relation: string,
    token: string
  ): Promise<any> {
    const req = { user_ids: userIDs, relation }
    const options: RequestInit = {
      method: 'post',
      headers: {
        'Content-Type': this.contentType,
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(req)
    }
    try {
      const response = await fetch(
        new URL(
          `${this.channelsEndpoint}/${channelID}/users/unassign`,
          this.channelsUrl
        ).toString(),
        options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.channelError.HandleError(errorRes.error, response.status)
      }
      return 'Policy removed.'
    } catch (error) {
      throw error
    }
  }

  public async Delete (channel: Channel, token: string): Promise<string> {
    // Deletes channel with specified id.
    /**
     * @method Disable - Deletes channel with specified id.
     * @param {Object} channel - Channel object with new information.
     * @param {String} token - An access token that is valid.
     * @returns {Object} - Channel Object.
     */
    const options: RequestInit = {
      method: 'post',
      headers: {
        'Content-Type': this.contentType,
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(channel)
    }
    try {
      const response = await fetch(
        new URL(
          `${this.channelsUrl}/${this.channelsEndpoint}/${channel.id}/delete`
        ).toString(),
        options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.channelError.HandleError(errorRes.error, response.status)
      }
      return 'Channel Deleted'
    } catch (error) {
      throw error
    }
  }

  public async ListChannelUsersGroups (
    channel_id: string,
    queryParams: QueryParams,
    token: string
  ): Promise<Users> {
    // Lists users in a channel.
    /**
     * @method ListChannelUsers - Lists users in a channel.
     * @param {string}
     * */
    const stringParams: Record<string, string> = Object.fromEntries(
      Object.entries(queryParams).map(([key, value]) => [key, String(value)])
    )
    const options: RequestInit = {
      method: 'GET',
      headers: {
        'Content-Type': this.contentType,
        Authorization: `Bearer ${token}`
      }
    }
    try {
      const response = await fetch(
        new URL(
          `${this.channelsEndpoint}/${channel_id}/things?${new URLSearchParams(stringParams).toString()}`,
          this.channelsUrl
        ).toString(),
        options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.channelError.HandleError(errorRes.error, response.status)
      }
      const usersData = await response.json()
      return usersData
    } catch (error) {
      throw error
    }
  }

  public async ConnectThing (
    thingId: string,
    channelId: string,
    actions: Actions | string[],
    token: string
  ): Promise<any> {
    // Connects thing to channel.
    /**
     * @method Connect - Connects thing to channel when provided with a valid token,
     * channel id and a thing id. The thing must have an action that it can perform over
     * the channel.
     * @param {string} thing_id - Thing ID.
     * @param {string} channel_id - Channel ID.
     * @param {list} actions - Action for example: ["m_read", "m_write"].
     * @param {string} token - User token.
     *
     */
    const payload = { subject: thingId, object: channelId, actions }
    const options = {
      method: 'post',
      headers: {
        'Content-Type': this.contentType,
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    }
    console.log('body', options.body)
    try {
      const response = await fetch(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        new URL(`${this.channelsEndpoint}/connect`, this.thingsUrl).toString(),
        options
      )
      console.log('url: ', response.url)
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.channelError.HandleError(errorRes.error, response.status)
      }
      const channelData = await response.json()
      console.log(channelData.response)
      return channelData
    } catch (error) {
      throw error
    }
  }

  public async Connect (
    thingsIDs: string[],
    channelsIDs: string[],
    actions: Actions | string[],
    token: string
  ): Promise<string> {
    // Connects multiple things to multiple channels.
    /**
     * @method Connects - Connects multiple things to multiple channels when provided with a valid token,
     * arrays of channel ids, thing ids and actions.
     * @param {list} thing_ids - Array of thing IDs.
     * @param {list} channel_ids - Array of channel IDs.
     * @param {list} actions - Array of actions for example: ["m_read", "m_write"].
     * @param {string} token - User token.
     * @returns {Object} - Policy object.
     *
     */
    const Connection = {
      thing_ids: thingsIDs,
      channel_ids: channelsIDs,
      actions
    }
    const payload = {
      subjects: thingsIDs,
      objects: channelsIDs,
      actions
    }
    const options = {
      method: 'connects',
      headers: {
        'Content-Type': this.contentType,
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(Connection)
    }
    try {
      const response = await fetch(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        new URL(`${this.channelsEndpoint}/connect`, this.thingsUrl).toString(),
        options
      )
      console.log('url: ', response.url)
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.channelError.HandleError(errorRes.error, response.status)
      }
      return 'Policy created'
    } catch (error) {
      throw error
    }
  }

  public async Disconnect (
    thingsIDs: string[],
    channelsIDs: string[],
    actions: Actions | string[],
    token: string
  ): Promise<string> {
    // Connects thing to channel.
    /**
     * @method Disconnect - Connects thing to channel when provided with a valid token,
     * channel id and a thing id. The thing must have an action that it can perform over
     * the channel.
     * @param {string} thing_id - Thing ID.
     * @param {string} channel_id - Channel ID.
     * @param {list} actions - Action for example: ["m_read", "m_write"].
     * @param {string} token - User token.
     *
     */
    const connIDs = {
      thing_ids: thingsIDs,
      channel_ids: channelsIDs,
      actions
    }
    const options: RequestInit = {
      method: 'post',
      headers: {
        'Content-Type': this.contentType,
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(connIDs)
    }
    try {
      const response = await fetch(
        new URL(
          `${this.channelsEndpoint}/disconnect`,
          this.thingsUrl
        ).toString(),
        options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.channelError.HandleError(errorRes.error, response.status)
      }
      return 'Policy deleted.'
    } catch (error) {
      throw error
    }
  }

  public async DisconnectThing (
    thingId: string,
    channelId: string,
    token: string
  ): Promise<any> {
    // Connects multiple things to multiple channels.
    /**
     * @method Connects - Connects multiple things to multiple channels when provided with a valid token,
     * arrays of channel ids, thing ids and actions.
     * @param {list} thing_ids - Array of thing IDs.
     * @param {list} channel_ids - Array of channel IDs.
     * @param {list} actions - Array of actions for example: ["m_read", "m_write"].
     * @param {string} token - User token.
     * @returns {Object} - Policy object.
     *
     */
    const payload = {
      subjects: thingId,
      objects: channelId
    }
    const options = {
      method: 'post',
      headers: {
        'Content-Type': this.contentType,
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    }
    try {
      const response = await fetch(
        new URL(this.channelsEndpoint, this.channelsUrl).toString(),
        options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.channelError.HandleError(errorRes.error, response.status)
      }
      return 'Policy Created'
    } catch (error) {
      throw error
    }
  }

  public async ListChannelUsers (
    channelId: string,
    queryParams: QueryParams,
    token: string
  ): Promise<Users> {
    // Lists users in a channel.
    /**
     * @method ListChannelUsers - Lists users in a channel.
     * @param {string}
     * */
    const stringParams: Record<string, string> = Object.fromEntries(
      Object.entries(queryParams).map(([key, value]) => [key, String(value)])
    )
    const options: RequestInit = {
      method: 'get',
      headers: {
        'Content-Type': this.contentType,
        Authorization: `Bearer ${token}`
      }
    }
    try {
      const response = await fetch(
        new URL(
          `/channels/${channelId}/users?${new URLSearchParams(stringParams).toString()}`,
          this.channelsUrl
        ).toString(),
        options
      )
      console.log('url:', response.url)
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.channelError.HandleError(errorRes.error, response.status)
      }
      const usersData = await response.json()
      return usersData
    } catch (error) {
      throw error
    }
  }
}
// public ChangeChannelStatus(
//         {thing_ids: string,
//         status: string,
//         actions: Actions,},
//         token: string,
//       ): Promise<string> {
//         //Connects multiple things to multiple channels.
//         /**
//          * @method Connects - Connects multiple things to multiple channels when provided with a valid token,
//          * arrays of channel ids, thing ids and actions.
//          * @param {list} thing_ids - Array of thing IDs.
//          * @param {list} channel_ids - Array of channel IDs.
//          * @param {list} actions - Array of actions for example: ["m_read", "m_write"].
//          * @param {string} token - User token.
//          * @returns {Object} - Policy object.
//          *
//          */
//         const payload = {
//           subjects: thing_ids,
//           objects: channel_ids,
//           actions: actions,
//         };
//         try{
//         const options = {
//           method: "post",
//           maxBodyLength: 2000,
//           url: new URL(`connect`, this.things.thingsUrl).toString(),
//           headers: {
//             "Content-Type": this.contentType,
//             Authorization: `Bearer ${token}`,
//           },
//           data: payload,
//         };
//         console.log(options.url.toString());
//         try {
//     const response = await fetch(
//       new URL(this.thingsEndpoint, this.thingsUrl).toString(),
//       options,
//     );
//     if (!response.ok) {
//       const errorRes = await response.json();
//       throw this.channelError.HandleError(errorRes.error, response.status);
//     }
//     return "Policy created.";
//   } catch (error) {
//     throw error;
//   }
// }
