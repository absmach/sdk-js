import Errors from './errors'
import { type Thing } from './defs'

export default class Things {
  // Things service client.
  /**
   * @class Things -
   * Things API is used for creating and managing things.
   * It is used for creating, updating, deleting and retrieving things.
   * @param {string} thingsUrl - Things service URL.
   * @returns {Object} - Things service client.
   */

  private readonly thingsUrl: URL
  private readonly contentType: string
  private readonly thingsEndpoint: string
  private readonly thingError: Errors

  public constructor (thingsUrl: string) {
    this.thingsUrl = new URL(thingsUrl)
    this.contentType = 'application/json'
    this.thingsEndpoint = 'users'
    this.thingError = new Errors()
  }

  public async Create (thing: Thing, token: string): Promise<Thing> {
    // Creates a new thing.
    /**
     * @method Create - Creates a new thing when provided with
     * the things information and a valid token.
     * @param {Object} thing - Thing object.
     * @param {string} token - User token.
     * @returns {Object} - Thing object.
     * @example
     * const thing = {
     * "name": "string",
     * "tags": [
     * "tag1",
     * "tag2"
     * ],
     * "credentials": {
     * "identity": "thingidentity",
     * "secret": "bb7edb32-2eac-4aad-aebe-ed96fe073879"
     * },
     * "owner": "bb7edb32-2eac-4aad-aebe-ed96fe073879",
     * "metadata": {
     * "domain": "example.com"
     * },
     * "status": "enabled"
     * }
     */

    const options: RequestInit = {
      method: 'post',
      headers: {
        'Content-Type': this.contentType,
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(thing)
    }

    try {
      const response = await fetch(
        new URL(this.thingsEndpoint, this.thingsUrl),
        options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.thingError.HandleError(errorRes.error, response.status)
      }
      const thingData = await response.json()
      return thingData
    } catch (error) {
      throw error
    }
  }
}
