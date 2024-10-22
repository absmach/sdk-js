import Errors from './errors'
import * as crypto from 'crypto'

import {
  type PageMetadata,
  type BootstrapConfig,
  type BootstrapPage,
  type Response
} from './defs'

export default class Bootstrap {
  // Bootstraps API Client
  /**
   * @class Bootstrap
   * Bootstrap is used to create, update, view and remove bootstrap configurations.
   * @param {string} bootstraps_url - The url of the bootstraps service.
   * @param {string} content_type - The content type of the request.
   * @param {string} bootstrapEndpoint - The endpoint of the bootstraps service which is
   * configs.
   * @returns {Bootstrap} - Returns a Bootstrap object.
   *
   */

  private readonly bootstrapUrl: URL
  private readonly contentType: string
  private readonly bootstrapEndpoint: string
  private readonly bootstrapError: Errors
  private readonly configsEndpoint: string
  private readonly whitelistEndpoint: string
  private readonly bootstrapCertsEndpoint: string
  private readonly bootstrapConnEndpoint: string
  private readonly domainsEndpoint: string
  private readonly secureEndpoint: string

  public constructor (bootstrapUrl: string) {
    this.bootstrapUrl = new URL(bootstrapUrl)
    this.contentType = 'application/json'
    this.bootstrapEndpoint = 'things/bootstrap'
    this.configsEndpoint = 'things/configs'
    this.whitelistEndpoint = 'things/state'
    this.bootstrapCertsEndpoint = 'things/configs/certs'
    this.bootstrapConnEndpoint = 'things/configs/connections'
    this.secureEndpoint = 'secure'
    this.domainsEndpoint = 'domains'
    this.bootstrapError = new Errors()
  }

  public async AddBootstrap (Bootstrap: BootstrapConfig, domainId: string, token: string): Promise<Response> {
    // Create a bootstrap configuration
    /**
         * @method Create - Create a new bootstrap configuration.
         * @param {object} config - The configuration object.
         * @param {string} domainId - The Domain ID.
         * @param {string} token - Authentication Token.
         * @example
         * const config = {
         *      "external_id": "345",
         *      "external_key": "012",
         *      "thing_id": "3d49a42f-63fd-491b-9784-adf4b64ef347",
         *   }
         */

    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': this.contentType,
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(Bootstrap)
    }
    try {
      const response = await fetch(
        new URL(`${this.domainsEndpoint}/${domainId}/${this.configsEndpoint}`, this.bootstrapUrl).toString(), options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.bootstrapError.HandleError(errorRes.message, response.status)
      }
      const createResponse: Response = { status: response.status, message: 'Bootstrap configuration created' }
      return createResponse
    } catch (error) {
      throw error
    }
  }

  public async Whitelist (Bootstrap: BootstrapConfig, domainId: string, token: string): Promise<Response> {
    // Update a bootstrap configuration
    /**
    * @method Whitelist - Allows a logged in user to update a bootstrap configuration.
    * This changes the status of the config to whitelisted.
    * @param {object} config - The configuration object.
    * @param {string} domainId - The Domain ID.
    * @param {string} token - Authentication Token.
    * @example
    * const config = {
    *      "external_id": "345",
    *      "external_key": "012",
    *      "thing_id": "3d49a42f-63fd-491b-9784-adf4b64ef347",
    *      "name": "thing_name"
    * }
    */
    const options: RequestInit = {
      method: 'PUT',
      headers: {
        'Content-Type': this.contentType,
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ state: Bootstrap.state })
    }
    try {
      const response = await fetch(
        new URL(`${this.domainsEndpoint}/${domainId}/${this.whitelistEndpoint}/${Bootstrap.thing_id}`, this.bootstrapUrl).toString(), options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.bootstrapError.HandleError(errorRes.message, response.status)
      }
      const whitelistResponse: Response = { status: response.status, message: 'Bootstrap configuration state updated successfully' }
      return whitelistResponse
    } catch (error) {
      throw error
    }
  }

  public async UpdateBootstrap (Bootstrap: BootstrapConfig, domainId: string, token: string): Promise<Response> {
    // Update a bootstrap configuration
    /**
    * @method Update - Allows a logged in user to update a bootstrap configuration.
    * This can change the name of the config and metadata.
    * @param {object} config - The configuration object.
    * @param {string} domainId - The Domain ID.
    * @param {string} token - The token to be used for authentication.
    * @example
    * const config = {
    *      "external_id": "345",
    *      "external_key": "012",
    *      "thing_id": "3d49a42f-63fd-491b-9784-adf4b64ef347",
    *      "name": "thing_name"
    * }
    */
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': this.contentType,
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(Bootstrap)
    }
    try {
      const response = await fetch(
        new URL(`${this.domainsEndpoint}/${domainId}/${this.configsEndpoint}/${Bootstrap.thing_id}`, this.bootstrapUrl).toString(), options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.bootstrapError.HandleError(errorRes.message, response.status)
      }
      const updateResponse: Response = { status: response.status, message: 'Bootstrap configuration updated successfully' }
      return updateResponse
    } catch (error) {
      throw error
    }
  }

  public async ViewBootstrap (thingId: string, domainId: string, token: string): Promise<BootstrapConfig> {
    // View a bootstrap configuration
    /**
    * @method View - Allows a logged in user to view a bootstrap configuration.
    * Once provided with the thingId and a valid token, it returns the configuration object.
    * @param {string} thingId - The thingId of the configuration to be viewed.
    * @param {string} domainId - The Domain ID.
    * @param {string} token - Authentication Token.
    */

    const options = {
      method: 'GET',
      headers: {
        'Content-Type': this.contentType,
        Authorization: `Bearer ${token}`
      }
    }
    try {
      const response = await fetch(
        new URL(`${this.domainsEndpoint}/${domainId}/${this.configsEndpoint}/${thingId}`, this.bootstrapUrl).toString(), options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.bootstrapError.HandleError(errorRes.message, response.status)
      }
      const Bootstrap: BootstrapConfig = await response.json()
      return Bootstrap
    } catch (error) {
      throw error
    }
  }

  public async UpdateBootstrapCerts (configs: BootstrapConfig, domainId: string, token: string): Promise<BootstrapConfig> {
    // Update certs of a bootstrap configuration
    /**
    * @method UpdateCerts - Allows a logged in user to update the certs of a bootstrap configuration.
    * Update is performed by replacing the current certificate data with values provided in a request payload.
    * @param {string} configId - The config_id of the configuration to be updated. This can also mean the thing_id.
    * @param {string} client_cert - The client certificate to be used.
    * @param {string} client_key - The client key to be used.
    * @param {string} ca - The certificate authority to be used.
    * @param {string} domainId - The Domain ID.
    * @param {string} token - Authentication Token.
    *
    */
    const options: RequestInit = {
      method: 'PATCH',
      headers: {
        'Content-Type': this.contentType,
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(configs)
    }
    try {
      const response = await fetch(
        new URL(`${this.domainsEndpoint}/${domainId}/${this.bootstrapCertsEndpoint}/${configs.thing_id}`, this.bootstrapUrl).toString(), options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.bootstrapError.HandleError(errorRes.message, response.status)
      }
      const updatedBootstrap: BootstrapConfig = await response.json()
      return updatedBootstrap
    } catch (error) {
      throw error
    }
  }

  public async RemoveBootstrap (thingId: string, domainId: string, token: string): Promise<Response> {
    // Remove a bootstrap configuration
    /**
    * @method Remove - Allows a logged in user to delete a bootstrap configuration.
    * @param {string} configId - The config ID of the configuration to be deleted.
    * This can also mean the thing ID.
    * @param {string} domainId - The Domain ID.
    * @param {string} token - Authentication Token.
    */
    const options: RequestInit = {
      method: 'DELETE',
      headers: {
        'Content-Type': this.contentType,
        Authorization: `Bearer ${token}`
      }
    }
    try {
      const response = await fetch(
        new URL(`${this.domainsEndpoint}/${domainId}/${this.configsEndpoint}/${thingId}`, this.bootstrapUrl).toString(), options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.bootstrapError.HandleError(errorRes.message, response.status)
      }
      const removeResponse: Response = { status: response.status, message: 'Bootstrap configuration deleted' }
      return removeResponse
    } catch (error) {
      throw error
    }
  }

  public async Bootstrap (externalId: string, externalKey: string): Promise<BootstrapConfig> {
    // Retrive a bootstrap configuration
    /**
     * @method Bootstrap - Retrieves a configuration with given external ID and encrypted external key.
     * @param {string} external_id - The external ID of the configuration to be retrieved.
     * @param {string} external_key - The encrypted external key of the configuration to be retrieved.
     * @return {object} - Returns a Bootstrap Configuration.
     */
    const options: RequestInit = {
      method: 'GET',
      headers: {
        'Content-Type': this.contentType,
        Authorization: `Thing ${externalKey}`
      }
    }
    try {
      const response = await fetch(
        new URL(`${this.bootstrapEndpoint}/${externalId}`, this.bootstrapUrl).toString(), options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.bootstrapError.HandleError(errorRes.message, response.status)
      }
      const Bootstrap: BootstrapConfig = await response.json()
      return Bootstrap
    } catch (error) {
      throw error
    }
  }

  public async Bootstraps (queryParams: PageMetadata, domainId: string, token: string): Promise<BootstrapPage> {
    // Retrive all bootstraps with pagination
    /**
     * @method Bootstraps - Gets all bootstraps with pagination.
     * @param {Object} queryParams - Query parameters.
     * @param {string} domainId - The Domain ID.
     * @param {String} token - Authentication token.
     *  @returns {Object} - Bootstrap Page.
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
        new URL(`${this.domainsEndpoint}/${domainId}/${this.configsEndpoint}?${new URLSearchParams(stringParams).toString()}`, this.bootstrapUrl).toString(), options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.bootstrapError.HandleError(errorRes.message, response.status)
      }
      const Bootstraps: BootstrapPage = await response.json()
      return Bootstraps
    } catch (error) {
      throw error
    }
  }

  public async UpdateBootstrapConnection (thingId: string, domainId: string, channels: string[], token: string): Promise<Response> {
    // Update a bootstrap connection
    /**
    * @method UpdateConnection - Allows a logged in user to update the connection of a bootstrap configuration.
    * @param {string} thing_id - The thing_id of the configuration to be updated.
    * @param {object} channels - The channels object to be used for the update.
    * @param {string} token - The token to be used for authentication.
    * */
    const options: RequestInit = {
      method: 'PUT',
      headers: {
        'Content-Type': this.contentType,
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ channels })
    }
    try {
      const response = await fetch(
        new URL(`${this.domainsEndpoint}/${domainId}/${this.bootstrapConnEndpoint}/${thingId}`, this.bootstrapUrl).toString(), options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.bootstrapError.HandleError(errorRes.message, response.status)
      }
      const connResponse: Response = { status: response.status, message: 'Bootstrap connection successful' }
      return connResponse
    } catch (error) {
      throw error
    }
  }

  public async SecureBootstrap (externalId: string, externalKey: string, cryptoKey: string): Promise<BootstrapConfig> {
    const encryptedKey = await this.bootstrapEncrypt(externalKey, cryptoKey)
    const options: RequestInit = {
      method: 'GET',
      headers: {
        'Content-Type': this.contentType,
        Authorization: `Thing ${encryptedKey}`
      }
    }
    try {
      const response = await fetch(
        new URL(`${this.bootstrapEndpoint}/${this.secureEndpoint}/${externalId}`, this.bootstrapUrl).toString(), options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.bootstrapError.HandleError(errorRes.message, response.status)
      }
      const decryptedData = await this.bootstrapDecrypt(JSON.stringify(options.body), cryptoKey)
      const secureBootstrap: BootstrapConfig = decryptedData
      return secureBootstrap
    } catch (error) {
      throw error
    }
  }

  async bootstrapEncrypt (text: string, cryptoKey: string): Promise<string> {
    const bufferText = Buffer.from(text, 'utf8')
    const iv = crypto.randomBytes(16)
    const cipher = crypto.createCipheriv('aes-256-cfb', Buffer.from(cryptoKey), iv)
    const encrypted = cipher.update(bufferText)
    const encryptedData = Buffer.concat([iv, encrypted])
    return encryptedData.toString('hex')
  }

  async bootstrapDecrypt (encryptedData: string, cryptoKey: string): Promise<BootstrapConfig> {
    const encryptedBuffer = Buffer.from(encryptedData, 'hex')
    const iv = crypto.randomBytes(16)
    const decipher = crypto.createDecipheriv('aes-256-cfb', Buffer.from(cryptoKey), iv)
    let decrypted = decipher.update(encryptedBuffer)
    decrypted = Buffer.concat([decrypted, decipher.final()])
    const decryptedText = decrypted.toString('utf8')
    return JSON.parse(decryptedText)
  }
}
