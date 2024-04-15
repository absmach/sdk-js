import Errors from './errors'

import type {
  Thing,
  ThingsPage,
  Response,
  PageMetadata,
  UsersPage,
  Permissions,
  Relation
} from './defs'

export default class Things {
  // Things service client.
  /**
     @class Things
    private things_url: URL;
    content_type: string;
    thingsEndpoint: string;
   //
   //Things API is used for creating and managing things.
   //It is used for creating, updating, deleting and retrieving things.
   //@param {string} things_url - Things service URL.
   //@returns {Object} - Things service client.
   */
  private readonly thingsUrl: URL
  private readonly usersUrl?: URL
  private readonly contentType: string
  private readonly thingsEndpoint: string
  private readonly thingError: Errors

  public constructor ({ thingsUrl, usersUrl }: { thingsUrl: string, usersUrl?: string }) {
    this.thingsUrl = new URL(thingsUrl)
    if (usersUrl !== undefined) {
      this.usersUrl = new URL(usersUrl)
    } else {
      this.usersUrl = new URL('')
    }
    this.contentType = 'application/json'
    this.thingsEndpoint = 'things'
    this.thingError = new Errors()
  }

  public async Create (thing: Thing, token: string): Promise<Thing> {
    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': this.contentType,
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(thing)
    }

    try {
      const response = await fetch(
        new URL(this.thingsEndpoint, this.thingsUrl).toString(),
        options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.thingError.HandleError(errorRes.error, response.status)
      }
      const thingData: Thing = await response.json()
      return thingData
    } catch (error) {
      throw error
    }
  }

  public async CreateThings (
    things: Thing[],
    token: string
  ): Promise<ThingsPage> {
    // Creates multiple things.
    /**
     * @method CreateThings - Creates multiple things.
     * @param {Object} things - Array of things.
     * @param {string} token - User token.
     * @returns {Object} - Thing object.
     * @example
     * const things = [
     * {
     * "name": "thing3",
     * "tags": [
     * "tag1"
     * ],
     * */
    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': this.contentType,
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(things)
    }
    try {
      const response = await fetch(
        new URL(`${this.thingsEndpoint}/bulk`, this.thingsUrl).toString(),
        options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.thingError.HandleError(errorRes.error, response.status)
      }
      const thingData: ThingsPage = await response.json()
      return thingData
    } catch (error) {
      throw error
    }
  }

  public async ThingsByChannel (
    channelID: string,
    queryParams: PageMetadata,
    token: string
  ): Promise<ThingsPage> {
    // Retrieves list of channels connected to specified thing with pagination metadata.
    /**
     * @method GetByChannel - Retrieves list of channels connected to specified thing
     * with pagination metadata.
     * @param {string} thing_id - Thing ID.
     * @param {Object} queryParams - Query parameters such as offset and limit.
     * @returns {Object} - Channels list.
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
          `channels/${channelID}/${this.thingsEndpoint}?${new URLSearchParams(
            stringParams
          ).toString()}`,
          this.thingsUrl
        ).toString(),
        options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.thingError.HandleError(errorRes.error, response.status)
      }
      const ThingsData: ThingsPage = await response.json()
      return ThingsData
    } catch (error) {
      throw error
    }
  }

  public async Disable (thing: Thing, token: string): Promise<Thing> {
    // Disables thing.
    /**
     * @method Disable - Deletes a thing when provided with a valid token and thing ID.
     * @param {string} thing_id - Thing ID.
     * @param {string} token - User token.
     * @returns {Object} - Returns disabled thing
     */

    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': this.contentType,
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(thing)
    }
    try {
      const response = await fetch(
        new URL(
          `${this.thingsEndpoint}/${thing.id}/disable`,
          this.thingsUrl
        ).toString(),
        options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.thingError.HandleError(errorRes.error, response.status)
      }
      const disabledThing: Thing = await response.json()
      return disabledThing
    } catch (error) {
      throw error
    }
  }

  public async UpdateThing (thing: Thing, token: string): Promise<Thing> {
    // Updates thing.
    /**
     * @method Update - Updates thing when provided with a valid token,
     * thing ID and thing object.
     * @param {string} thing_id - Thing ID.
     * @param {Object} thing - Thing object.
     * @param {string} token - User token.
     * @returns {Object} - Thing object.
     * @example
     * const thing = {
     * "name": "thing3",
     * "tags": [
     * "tag1"
     * ],
     * "credentials": {
     * "identity": "thingidentity",
     * "secret":"12345678"
     * },
     * "owner": "bb7edb32-2eac-4aad-aebe-ed96fe073879",
     * "id": "bb7edb32-2eac-4aad-aebe-ed96fe073879",
     * }
     */

    const options: RequestInit = {
      method: 'PATCH',
      headers: {
        'Content-Type': this.contentType,
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(thing)
    }
    try {
      const response = await fetch(
        new URL(
          `${this.thingsEndpoint}/${thing.id}`,
          this.thingsUrl
        ).toString(),
        options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.thingError.HandleError(errorRes.error, response.status)
      }
      const thingData: Thing = await response.json()
      return thingData
    } catch (error) {
      throw error
    }
  }

  public async UpdateThingSecret (thing: Thing, token: string): Promise<Thing> {
    // Updates thing secret.
    /**
     * @method UpdateThingSecret - Updates thing secret when provided with a valid token,
     * thing ID and thing object.
     * @param {string} thing_id - Thing ID.
     * @param {Object} thing - Thing object.
     * @param {string} token - User token.
     * @returns {Object} - Thing object.
     * @example
     * const thing = {
     * "name": "thing3",
     * "tags": [
     * "tag1"
     * ],
     * "credentials": {
     * "identity": "thingidentity",
     * "secret":"56788912"
     * },
     * "owner": "bb7edb32-2eac-4aad-aebe-ed96fe073879",
     * "id": "bb7edb32-2eac-4aad-aebe-ed96fe073879",
     * }
     */

    const options: RequestInit = {
      method: 'PATCH',
      headers: {
        'Content-Type': this.contentType,
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ secret: thing.credentials?.secret })
    }
    try {
      const response = await fetch(
        new URL(
          `${this.thingsEndpoint}/${thing.id}/secret`,
          this.thingsUrl
        ).toString(),
        options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.thingError.HandleError(errorRes.error, response.status)
      }
      const thingData: Thing = await response.json()
      return thingData
    } catch (error) {
      throw error
    }
  }

  public async UpdateThingTags (thing: Thing, token: string): Promise<Thing> {
    // Updates thing tags.
    /**
     * @method UpdateThingTags - Updates thing tags when provided with a valid token,
     * thing ID and thing object.
     *
     * @param {string} thing_id - Thing ID.
     * @param {Object} thing - Thing object.
     * @param {string} token - User token.
     * @returns {Object} - Thing object.
     * @example
     * const thing = {
     * "name": "thing3",
     * "tags": [
     * "tag1"
     * ],
     * "credentials": {
     * "identity": "thingidentity",
     * "secret":"56788912"
     * },
     * "owner": "bb7edb32-2eac-4aad-aebe-ed96fe073879",
     * "id": "bb7edb32-2eac-4aad-aebe-ed96fe073879",
     * }
     */

    const options: RequestInit = {
      method: 'PATCH',
      headers: {
        'Content-Type': this.contentType,
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(thing)
    }

    try {
      const response = await fetch(
        new URL(
          `${this.thingsEndpoint}/${thing.id}/tags`,
          this.thingsUrl
        ).toString(),
        options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.thingError.HandleError(errorRes.error, response.status)
      }
      const thingData: Thing = await response.json()
      return thingData
    } catch (error) {
      throw error
    }
  }

  public async Thing (thingId: string, token: string): Promise<Thing> {
    // Gets a user
    /**
     * Provides information about the user with provided ID. The user is
     * retrieved using authorization user_token.
     * @method User - Gets a user.
     * @param {String} userId - User ID.
     * @param {String} token - Access token.
     * @returns {Object} - User object.
     * @example
     * const userId = "886b4266-77d1-4258-abae-2931fb4f16de"
     *
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
        new URL(`${this.thingsEndpoint}/${thingId}`, this.thingsUrl).toString(),
        options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.thingError.HandleError(errorRes.error, response.status)
      }
      const thingData: Thing = await response.json()
      return thingData
    } catch (error) {
      throw error
    }
  }

  public async IdentifyThing (thingKey: string): Promise<Thing> {
    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': this.contentType,
        Authorization: `Thing ${thingKey}`
      }
    }

    try {
      const response = await fetch(
        new URL(this.thingsEndpoint, this.thingsUrl).toString(),
        options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.thingError.HandleError(errorRes.error, response.status)
      }
      const thingData: Thing = await response.json()
      return thingData
    } catch (error) {
      throw error
    }
  }

  public async ThingsPermissions (
    thingID: string,
    token: string
  ): Promise<Permissions> {
    // Retrieves thing permissions.
    /**
     * @method Permissions - Retrieves thing permissions when provided with a valid token
     * and thing ID.
     * @param {string}
     * @param {string} token - User token.
     * @returns {Object} - Thing permissions.
     * @example
     * const thing_id = "bb7edb32-2eac-4aad-aebe-ed96fe073879"
     * const token
     * const permissions = Things.Permissions(thing_id, token)
     * console.log(permissions)
     * */

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
          `${this.thingsEndpoint}/${thingID}/permissions`,
          this.thingsUrl
        ).toString(), options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.thingError.HandleError(errorRes.error, response.status)
      }
      const thingData: Permissions = await response.json()
      return thingData
    } catch (error) {
      throw error
    }
  }

  public async Enable (thing: Thing, token: string): Promise<Thing> {
    // Enables a thing.
    /**
     * @method Enable - Enables a thing when provided with a valid token and thing ID.
     * @param {string} thing_id - Thing ID.
     * @param {string} token - User token.
     * @returns {Object} - Returns updated thing.
     */

    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': this.contentType,
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(thing)
    }

    try {
      const response = await fetch(
        new URL(
          `${this.thingsEndpoint}/${thing.id}/enable`,
          this.thingsUrl
        ).toString(),
        options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.thingError.HandleError(errorRes.error, response.status)
      }
      const enabledThing: Thing = await response.json()
      return enabledThing
    } catch (error) {
      throw error
    }
  }

  public async Things (
    queryParams: PageMetadata,
    token: string
  ): Promise<ThingsPage> {
    // Gets all things with pagination.
    /**
     * Provides information about all users. The users are retrieved using
     * authorization user_token.
     *
     * @method Things - Gets all things with pagination.
     * @param {Object} queryParams - Query parameters.
     * @param {String} token - Access token.
     * @returns {Object} - Thing object.
     * @example
     * const queryParams = {
     * "offset": 0,
     * "limit": 10
     * }
     *
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
          `${this.thingsEndpoint}?${new URLSearchParams(stringParams).toString()}`,
          this.thingsUrl
        ).toString(),
        options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.thingError.HandleError(errorRes.error, response.status)
      }
      const thingsData: ThingsPage = await response.json()
      return thingsData
    } catch (error) {
      throw error
    }
  }

  public async ListThingUsers (
    thingId: string,
    queryParams: PageMetadata,
    token: string
  ): Promise<UsersPage> {
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
          `${this.thingsEndpoint}/${thingId}/users?${new URLSearchParams(stringParams).toString()}`,
          this.usersUrl
        ).toString(),
        options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.thingError.HandleError(errorRes.error, response.status)
      }
      const userData: UsersPage = await response.json()
      return userData
    } catch (error) {
      throw error
    }
  }

  public async ShareThing (
    thingId: string,
    Relation: Relation,
    userIDs: string[],
    token: string
  ): Promise<Response> {
    // Shares a thing with a user.
    /**
     * @method ShareThing - Shares a thing with a user.
     * @param {string} thingId - Thing ID.
     * @param {string} userId - User ID.
     * @param {string} token - User token.
     * @returns {Object} - Nothing
     *
     * */
    const req = { relation: Relation, user_ids: userIDs }
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
          `${this.thingsEndpoint}/${thingId}/share`,
          this.thingsUrl
        ).toString(),
        options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.thingError.HandleError(errorRes.error, response.status)
      }
      const shareResponse: Response = { status: response.status, message: 'Thing Shared Successfully' }
      return shareResponse
    } catch (error) {
      throw error
    }
  }

  public async UnShareThing (
    thingId: string,
    Relation: string,
    userIDs: string[],
    token: string
  ): Promise<Response> {
    // Shares a thing with a user.
    /**
     * @method UnShareThing - UnShares a thing with a user.
     * @param {string} thing_id - Thing ID.
     * @param {string} user_id - User ID.
     * @param {string} token - User token.
     * @returns {Object} - Nothing
     *
     * */
    const req = { relation: Relation, user_ids: userIDs }
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
          `${this.thingsEndpoint}/${thingId}/unshare`,
          this.thingsUrl
        ).toString(),
        options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.thingError.HandleError(errorRes.error, response.status)
      }
      const unshareResponse: Response = { status: response.status, message: 'Thing UnShared Successfully' }
      return unshareResponse
    } catch (error) {
      throw error
    }
  }

  public async DeleteThing (thing: Thing, token: string): Promise<Response> {
    // Deletes a thing.
    /**
     * @method DeleteThing - Deletes a thing.
     * @param {string}
     *  */
    const options: RequestInit = {
      method: 'DELETE',
      headers: {
        'Content-Type': this.contentType,
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(thing)
    }

    try {
      const response = await fetch(
        new URL(
          `${this.thingsEndpoint}/${thing.id}`,
          this.thingsUrl
        ).toString(),
        options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.thingError.HandleError(errorRes.error, response.status)
      }
      const deleteResponse: Response = { status: response.status, message: 'Thing Deleted Successfully' }
      return deleteResponse
    } catch (error) {
      throw error
    }
  }
}
