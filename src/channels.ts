import Errors from './errors'

import {
  type Channel,
  type GroupsPage,
  type QueryParams,
  type Permissions,
  type Response,
  type ChannelsPage,
  type UsersPage
} from './defs'
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
  private readonly usersUrl: URL
  private readonly contentType: string
  private readonly channelsEndpoint: string
  private readonly channelError: Errors
  private readonly thingsUrl: URL
  public constructor ({ usersUrl, thingsUrl }: { usersUrl: string, thingsUrl: string }) {
    this.thingsUrl = new URL(thingsUrl)
    if (usersUrl !== undefined) {
      this.usersUrl = new URL(usersUrl)
    } else {
      this.usersUrl = new URL('')
    }
    this.contentType = 'application/json'
    this.channelsEndpoint = 'channels'
    this.channelError = new Errors()
  }

  public async CreateChannel (
    channel: Channel,
    token: string
  ): Promise<Channel> {
    // Creates a new a channel
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
      method: 'POST',
      headers: {
        'Content-Type': this.contentType,
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(channel)
    }
    try {
      const response = await fetch(
        new URL(this.channelsEndpoint, this.thingsUrl).toString(),
        options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.channelError.HandleError(errorRes.error, response.status)
      }
      const channelData: Channel = await response.json()
      return channelData
    } catch (error) {
      throw error
    }
  }

  public async Channel (channelId: string, token: string): Promise<Channel> {
    // Retrieves channel with specified id.
    /**
     * @method Get - Retrieves channel with specified id and a valid token.
     * @param {String} channel_id - Channel id.
     * @param {String} token - An access token that is valid.
     * @returns {Object} - Channel object.
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
        new URL(`${this.channelsEndpoint}/${channelId}`, this.thingsUrl).toString(),
        options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.channelError.HandleError(errorRes.error, response.status)
      }
      const channelData: Channel = await response.json()
      return channelData
    } catch (error) {
      throw error
    }
  }

  public async ChannelsByThing (
    thingID: string,
    queryParams: QueryParams,
    token: string
  ): Promise<ChannelsPage> {
    // Retrieves list of things connected to specified channel with pagination metadata.
    /**
     * @method GetByThing - Retrieves list of things connected to specified channel with pagination metadata.
     * @param {String} channel_id - Channel id.
     * @param {Object} queryParams - Query parameters for the request.
     * @param {String} token - An access token that is valid.
     * @returns {List} - Things list.
     */
    const stringParams: Record<string, string> = Object.fromEntries(
      Object.entries(queryParams).map(([key, value]) => [key, String(value)])
    )
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': this.contentType,
        Authorization: `Bearer ${token}`
      }
    }
    try {
      const response = await fetch(
        new URL(
          `things/${thingID}/${this.channelsEndpoint}?${new URLSearchParams(
            stringParams
          ).toString()}`,
          this.thingsUrl
        ).toString(),
        options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.channelError.HandleError(errorRes.error, response.status)
      }
      const channelData: ChannelsPage = await response.json()
      return channelData
    } catch (error) {
      throw error
    }
  }

  public async Channels (
    queryParams: QueryParams,
    token: string
  ): Promise<ChannelsPage> {
    // Provides a list of all channels with pagination metadata.
    /**
     * @method GetAll - Provides a list of all channels with pagination metadata.
     * @param {Object} queryParams - Query parameters for the request.
     * @param {String} token - An access token that is valid.
     * @returns {Object} - Channel Object.
     */
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
          `${this.channelsEndpoint}?${new URLSearchParams(
            stringParams
          ).toString()}`,
          this.thingsUrl
        ).toString(),
        options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.channelError.HandleError(errorRes.error, response.status)
      }
      const channelsData: ChannelsPage = await response.json()
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
      method: 'PUT',
      headers: {
        'Content-Type': this.contentType,
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(channel)
    }
    try {
      const response = await fetch(
        new URL(
          `channels/${channel.id}`,
          this.thingsUrl
        ).toString(),
        options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.channelError.HandleError(errorRes.error, response.status)
      }
      const channelData: Channel = await response.json()
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
      method: 'POST',
      headers: {
        'Content-Type': this.contentType,
        Authorization: `Bearer ${token}`
      }
    }
    try {
      const response = await fetch(
        new URL(
          `${this.channelsEndpoint}/${channel.id}/disable`,
          this.thingsUrl
        ).toString(),
        options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.channelError.HandleError(errorRes.error, response.status)
      }
      const channelData: Channel = await response.json()
      return channelData
    } catch (error) {
      throw error
    }
  }

  public async Enable (channel: Channel, token: string): Promise<Channel> {
    // Enables channel with specified id.
    /**
     * @method Enable - Enables channel with specified id.
     * @param {Object} channel - Channel object with new information.
     * @param {String} token - An access token that is valid.
     * @returns {Object} - Channel Object.
     */
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': this.contentType,
        Authorization: `Bearer ${token}`
      }
    }
    try {
      const response = await fetch(
        new URL(
          `${this.channelsEndpoint}/${channel.id}/enable`,
          this.thingsUrl
        ).toString(),
        options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.channelError.HandleError(errorRes.error, response.status)
      }
      const channelData: Channel = await response.json()
      return channelData
    } catch (error) {
      throw error
    }
  }

  public async ChannelPermissions (
    channelId: string,
    token: string
  ): Promise<Permissions> {
    // Retrieves channel permissions.
    /**
     * @method ChannelPermission - Retrieves channel permissions with specified id..
     * @param {Object}
     * @param {string} token - user token.
     * @returns {object} - returns an object domain permissions eg:
     *  { permissions: [ 'admin', 'edit', 'view', 'membership' ] }
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
          `${this.channelsEndpoint}/${channelId}/permissions`,
          this.thingsUrl
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
      throw error
    }
  }

  public async AddUserToChannel (
    channelID: string,
    userIDs: string[],
    relation: string,
    token: string
  ): Promise<Response> {
    const req = { user_ids: userIDs, relation }
    const options: RequestInit = {
      method: 'POST',
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
          this.thingsUrl
        ).toString(),
        options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.channelError.HandleError(errorRes.error, response.status)
      }
      const shareResponse: Response = { status: response.status, message: 'User Added Successfully' }
      return shareResponse
    } catch (error) {
      throw error
    }
  }

  public async RemoveUserFromChannel (
    channelID: string,
    userIDs: string[],
    relation: string,
    token: string
  ): Promise<Response> {
    const req = { user_ids: userIDs, relation }
    const options: RequestInit = {
      method: 'POST',
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
          this.thingsUrl
        ).toString(),
        options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.channelError.HandleError(errorRes.error, response.status)
      }
      const shareResponse: Response = { status: response.status, message: 'User Removed Successfully' }
      return shareResponse
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
      method: 'DELETE',
      headers: {
        'Content-Type': this.contentType,
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(channel)
    }
    try {
      const response = await fetch(
        new URL(
          `/${this.channelsEndpoint}/${channel.id}/delete`, this.thingsUrl
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
    channelId: string,
    queryParams: QueryParams,
    token: string
  ): Promise<GroupsPage> {
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
          `channels/${channelId}/groups?${new URLSearchParams(stringParams).toString()}`,
          this.usersUrl
        ).toString(),
        options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.channelError.HandleError(errorRes.error, response.status)
      }
      const usersData: GroupsPage = await response.json()
      return usersData
    } catch (error) {
      throw error
    }
  }

  public async ConnectThing (
    thingId: string,
    channelId: string,
    token: string
  ): Promise<Response> {
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
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': this.contentType,
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ subject: thingId, object: channelId })
    }
    try {
      const response = await fetch(
        new URL(`${this.channelsEndpoint}/${channelId}/things/${thingId}/connect`, this.thingsUrl).toString(),
        options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.channelError.HandleError(errorRes.error, response.status)
      }
      const shareResponse: Response = { status: response.status, message: 'Thing Connected Successfully' }
      return shareResponse
    } catch (error) {
      throw error
    }
  }

  public async Connect (
    thingId: string,
    channelId: string,
    token: string
  ): Promise<Response> {
    // Connects thing to channel.
    /**
     * @method Connects - Connect thing to channel when provided with a valid token,
     * channel id and thing id.
     * @param thing_ids - thing ID.
     * @param channel_ids - channel Is.
     * @param {string} token - User token.
     * @returns Response - 'Thing Connected Successfully'.
     */
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': this.contentType,
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ subject: thingId, object: channelId })
    }
    try {
      const response = await fetch(
        new URL('/connect', this.thingsUrl).toString(),
        options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.channelError.HandleError(errorRes.error, response.status)
      }
      const shareResponse: Response = { status: response.status, message: 'Thing Connected Successfully' }
      return shareResponse
    } catch (error) {
      throw error
    }
  }

  public async Disconnect (
    thingId: string,
    channelId: string,
    token: string
  ): Promise<Response> {
    // Disconnects thing to channel.
    /**
     * @method Disconnect - Disconnects thing to channel when provided with a valid token,
     * channel id and a thing id. The thing must have an action that it can perform over
     * the channel.
     * @param {string} thing_id - Thing ID.
     * @param {string} channel_id - Channel ID.
     * @param {string} token - User token.
     *
     */
    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': this.contentType,
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ subject: thingId, object: channelId })
    }
    try {
      const response = await fetch(
        new URL(
          '/disconnect', this.thingsUrl
        ).toString(),
        options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.channelError.HandleError(errorRes.error, response.status)
      }
      const shareResponse: Response = { status: response.status, message: 'Thing Disconnected Successfully' }
      return shareResponse
    } catch (error) {
      throw error
    }
  }

  public async DisconnectThing (
    thingId: string,
    channelId: string,
    token: string
  ): Promise<Response> {
    // Disconnects thing to channel.
    /**
     * @method Disconnect - Disconnects thing to channel when provided with a valid token,
     * channel id and a thing id. The thing must have an action that it can perform over
     * the channel.
     * @param {string} thing_id - Thing ID.
     * @param {string} channel_id - Channel ID.
     * @param {string} token - User token.
     *
     */
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': this.contentType,
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ subject: thingId, object: channelId })

    }
    try {
      const response = await fetch(
        new URL(`${this.channelsEndpoint}/${channelId}/things/${thingId}/disconnect`, this.thingsUrl).toString(),
        options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.channelError.HandleError(errorRes.error, response.status)
      }
      const shareResponse: Response = { status: response.status, message: 'Thing Disconnected Successfully' }
      return shareResponse
    } catch (error) {
      throw error
    }
  }

  public async ListChannelUsers (
    channelId: string,
    queryParams: QueryParams,
    token: string
  ): Promise<UsersPage> {
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
          `channels/${channelId}/users?${new URLSearchParams(stringParams).toString()}`,
          this.usersUrl
        ).toString(),
        options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.channelError.HandleError(errorRes.error, response.status)
      }
      const usersData: UsersPage = await response.json()
      return usersData
    } catch (error) {
      throw error
    }
  }
}
