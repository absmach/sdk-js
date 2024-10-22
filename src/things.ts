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
  private readonly domainsEndpoint: string
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
    this.domainsEndpoint = 'domains'
    this.thingError = new Errors()
  }

  public async Create (thing: Thing, domainId: string, token: string): Promise<Thing> {
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
        new URL(`${this.domainsEndpoint}/${domainId}/${this.thingsEndpoint}`, this.thingsUrl).toString(),
        options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.thingError.HandleError(errorRes.message, response.status)
      }
      const thingData: Thing = await response.json()
      return thingData
    } catch (error) {
      throw error
    }
  }

  public async CreateThings (
    things: Thing[],
    domainId: string,
    token: string
  ): Promise<ThingsPage> {
    // Creates multiple things.
    /**
     * @method CreateThings - Creates multiple things.
     * @param {Object} things - Array of things.
     * @param {string} domainId - Id of the domain.
     * @param {string} token - User token.
     * @returns {Object} - Thing object.
     * @example
     * const things = [
     * {
     * "name": "thing3",
     * "tags": [
     * "tag1"
     * ],
     * }
     * ]
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
        new URL(`${this.domainsEndpoint}/${domainId}/${this.thingsEndpoint}/bulk`, this.thingsUrl).toString(),
        options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.thingError.HandleError(errorRes.message, response.status)
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
    domainId: string,
    token: string
  ): Promise<ThingsPage> {
    // Retrieves list of things connected to specified channel with pagination metadata.
    /**
     * @method ThingsByChannel - Retrieves list of things connected to specified channel
     * with pagination metadata.
     * @param {string} channelID - channel ID.
     * @param {Object} queryParams - Query parameters such as offset and limit.
     * @param {string} domainId - Id of the domain.
     * @param {string} token - User token.
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
          `${this.domainsEndpoint}/${domainId}/channels/${channelID}/${this.thingsEndpoint}?${new URLSearchParams(
            stringParams
          ).toString()}`,
          this.thingsUrl
        ).toString(),
        options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.thingError.HandleError(errorRes.message, response.status)
      }
      const ThingsData: ThingsPage = await response.json()
      return ThingsData
    } catch (error) {
      throw error
    }
  }

  public async Enable (thingId: string, domainId: string, token: string): Promise<Thing> {
    // Enables a thing.
    /**
     * @method Enable - Enables a thing when provided with a valid token and thing ID.
     * @param {string} thingID - Thing ID.
     * @param {string} domainId - Id of the domain.
     * @param {string} token - User token.
     * @returns {Object} - Returns updated thing.
     */

    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': this.contentType,
        Authorization: `Bearer ${token}`
      }
    }

    try {
      const response = await fetch(
        new URL(
          `${this.domainsEndpoint}/${domainId}/${this.thingsEndpoint}/${thingId}/enable`,
          this.thingsUrl
        ).toString(),
        options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.thingError.HandleError(errorRes.message, response.status)
      }
      const enabledThing: Thing = await response.json()
      return enabledThing
    } catch (error) {
      throw error
    }
  }

  public async Disable (thingId: string, domainId: string, token: string): Promise<Thing> {
    // Disables thing.
    /**
     * @method Disable - Disables a thing when provided with a valid token, domain ID and thing ID.
     * @param {string} thingId - Thing ID.
     * @param {string} domainId - Id of the domain.
     * @param {string} token - User token.
     * @returns {Object} - Returns disabled thing
     */

    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': this.contentType,
        Authorization: `Bearer ${token}`
      }
    }
    try {
      const response = await fetch(
        new URL(
          `${this.domainsEndpoint}/${domainId}/${this.thingsEndpoint}/${thingId}/disable`,
          this.thingsUrl
        ).toString(),
        options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.thingError.HandleError(errorRes.message, response.status)
      }
      const disabledThing: Thing = await response.json()
      return disabledThing
    } catch (error) {
      throw error
    }
  }

  public async UpdateThing (thing: Thing, domainId: string, token: string): Promise<Thing> {
    // Updates thing.
    /**
     * @method Update - Updates thing when provided with a valid token,
     * domain ID and thing object.
     * @param {Object} thing - Thing object.
     * @param {string} domainId - Id of the domain.
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
          `${this.domainsEndpoint}/${domainId}/${this.thingsEndpoint}/${thing.id}`,
          this.thingsUrl
        ).toString(),
        options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.thingError.HandleError(errorRes.message, response.status)
      }
      const thingData: Thing = await response.json()
      return thingData
    } catch (error) {
      throw error
    }
  }

  public async UpdateThingSecret (thing: Thing, domainId: string, token: string): Promise<Thing> {
    // Updates thing secret.
    /**
     * @method UpdateThingSecret - Updates thing secret when provided with a valid token and domain ID,
     * domain ID and thing object.
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
          `${this.domainsEndpoint}/${domainId}/${this.thingsEndpoint}/${thing.id}/secret`,
          this.thingsUrl
        ).toString(),
        options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.thingError.HandleError(errorRes.message, response.status)
      }
      const thingData: Thing = await response.json()
      return thingData
    } catch (error) {
      throw error
    }
  }

  public async UpdateThingTags (thing: Thing, domainId: string, token: string): Promise<Thing> {
    // Updates thing tags.
    /**
     * @method UpdateThingTags - Updates thing tags when provided with a valid token,
     * domain ID and thing object.
     *
     * @param {Object} thing - Thing object.
     * @param {string} domainId - Id of the domain.
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
          `${this.domainsEndpoint}/${domainId}/${this.thingsEndpoint}/${thing.id}/tags`,
          this.thingsUrl
        ).toString(),
        options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.thingError.HandleError(errorRes.message, response.status)
      }
      const thingData: Thing = await response.json()
      return thingData
    } catch (error) {
      throw error
    }
  }

  public async Thing (thingId: string, domainId: string, token: string): Promise<Thing> {
    // Gets a thing
    /**
     * Provides information about the thing with provided ID. The thing is
     * retrieved using authorization token.
     * @method Thing - Gets a Thing.
     * @param {String} thingId - Thing ID.
     * @param {string} domainId - Id of the domain.
     * @param {String} token - Access token.
     * @returns {Object} - Thing object.
     * @example
     * const thingId = "886b4266-77d1-4258-abae-2931fb4f16de"
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
        new URL(`${this.domainsEndpoint}/${domainId}/${this.thingsEndpoint}/${thingId}`, this.thingsUrl).toString(),
        options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.thingError.HandleError(errorRes.message, response.status)
      }
      const thingData: Thing = await response.json()
      return thingData
    } catch (error) {
      throw error
    }
  }

  public async ThingsPermissions (
    thingId: string,
    domainId: string,
    token: string
  ): Promise<Permissions> {
    // Retrieves thing permissions.
    /**
     * @method Permissions - Retrieves thing permissions when provided with a valid token
     * and thing ID.
     * @param {string} thingId - Thing ID.
     * @param {string} domainId - Id of the domain.
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
          `${this.domainsEndpoint}/${domainId}/${this.thingsEndpoint}/${thingId}/permissions`,
          this.thingsUrl
        ).toString(), options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.thingError.HandleError(errorRes.message, response.status)
      }
      const thingData: Permissions = await response.json()
      return thingData
    } catch (error) {
      throw error
    }
  }

  public async Things (
    queryParams: PageMetadata,
    domainId: string,
    token: string
  ): Promise<ThingsPage> {
    // Gets all things with pagination.
    /**
     * Provides information about all users. The users are retrieved using
     * authorization user_token.
     *
     * @method Things - Gets all things with pagination.
     * @param {Object} queryParams - Query parameters.
     * @param {string} domainId - Id of the domain.
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
          `${this.domainsEndpoint}/${domainId}/${this.thingsEndpoint}?${new URLSearchParams(stringParams).toString()}`,
          this.thingsUrl
        ).toString(),
        options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.thingError.HandleError(errorRes.message, response.status)
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
    domainId: string,
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
          `${this.domainsEndpoint}/${domainId}/${this.thingsEndpoint}/${thingId}/users?${new URLSearchParams(stringParams).toString()}`,
          this.usersUrl
        ).toString(),
        options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.thingError.HandleError(errorRes.message, response.status)
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
    domainId: string,
    token: string
  ): Promise<Response> {
    // Shares a thing with a user.
    /**
     * @method ShareThing - Shares a thing with a user.
     * @param {string} thingId - Thing ID.
     * @param {Relation} Relation - User relation to the thing.
     * @param {string} domainId - Id of the domain.
     * @param {string[]} userIDs - Array of user ID's.
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
          `${this.domainsEndpoint}/${domainId}/${this.thingsEndpoint}/${thingId}/share`,
          this.thingsUrl
        ).toString(),
        options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.thingError.HandleError(errorRes.message, response.status)
      }
      const shareResponse: Response = { status: response.status, message: 'Thing shared successfully' }
      return shareResponse
    } catch (error) {
      throw error
    }
  }

  public async UnShareThing (
    thingId: string,
    Relation: string,
    userIDs: string[],
    domainId: string,
    token: string
  ): Promise<Response> {
    // Shares a thing with a user.
    /**
     * @method UnShareThing - UnShares a thing with a user.
     * @param {string} thingId - Thing ID.
     * @param {string[]} userIDs - Array of user ID's.
     * @param {string} Relation - User relation to the thing.
     * @param {string} domainId - Id of the domain.
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
          `${this.domainsEndpoint}/${domainId}/${this.thingsEndpoint}/${thingId}/unshare`,
          this.thingsUrl
        ).toString(),
        options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.thingError.HandleError(errorRes.message, response.status)
      }
      const unshareResponse: Response = { status: response.status, message: 'Thing unShared successfully' }
      return unshareResponse
    } catch (error) {
      throw error
    }
  }

  public async DeleteThing (thingId: string, domainId: string, token: string): Promise<Response> {
    // Deletes a thing.
    /**
     * @method DeleteThing - Deletes a thing.
     * @param {string} thingId - Thing ID.
     * @param {string} domainId - Id of the domain.
     * @param {string} token - User token.
     * @returns {Object} - Nothing
     *  */
    const options: RequestInit = {
      method: 'DELETE',
      headers: {
        'Content-Type': this.contentType,
        Authorization: `Bearer ${token}`
      }
    }

    try {
      const response = await fetch(
        new URL(
          `${this.domainsEndpoint}/${domainId}/${this.thingsEndpoint}/${thingId}`,
          this.thingsUrl
        ).toString(),
        options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.thingError.HandleError(errorRes.message, response.status)
      }
      const deleteResponse: Response = { status: response.status, message: 'Thing deleted successfully' }
      return deleteResponse
    } catch (error) {
      throw error
    }
  }
}
