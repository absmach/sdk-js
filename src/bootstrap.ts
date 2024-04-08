import Errors from './errors'
import * as crypto from 'crypto'

import {
  type QueryParams,
  type Bootstrap,
  type BootstrapPage,
  type Response,
  type Channel
} from './defs'

export default class Bootstraps {
  // Bootstraps API Client
  /**
   * @class Bootstrap
   * Bootstrap is used to manage bootstrap configurations.
   * It is used to create, update, view and remove bootstrap configurations.
   * It is also used to bootstrap a thing.
   * @param {string} bootstraps_url - The url of the bootstraps service.
   * @param {string} content_type - The content type of the request.
   * @param {string} bootstrapsEndpoint - The endpoint of the bootstraps service which is
   * configs.
   * @returns {Bootstrap} - Returns a Bootstrap object.
   *
   */

  private readonly bootstrapsUrl: URL
  private readonly contentType: string
  private readonly bootstrapsEndpoint: string
  private readonly bootstrapError: Errors

  public constructor (bootstrapsUrl: string) {
    this.bootstrapsUrl = new URL(bootstrapsUrl)
    this.contentType = 'application/json'
    this.bootstrapsEndpoint = 'configs'
  }
  // ValidateConfigAndToken(config, token){
  // Validate config
  //     if (typeof config !== "object" || config === null) {
  //         throw new Error('Invalid config parameter. Expected an object.');
  //     }

  //      // Validate token
  //     if (typeof token !== "string" || token === null) {
  //         throw new Error('Invalid token parameter. Expected a string.');
  //     }
  // }

  public async Create (Bootstrap: Bootstrap, token: string): Promise<Response> {
    // Create a bootstrap configuration
    /**
         * @method Create - Create a new bootstrap configuration.
         * Some of the key data needed include the external_key and external_id which must be
         * specific to the thing provided with the thing_id. Mind that every configuration
         * must have a specific thing_id.
         * @param {object} config - The configuration object.
         * @param {string} token - The token to be used for authentication.
         * @example
         * const config = {
         *      "external_id": "345",
         *      "external_key": "012",
         *      "thing_id": "3d49a42f-63fd-491b-9784-adf4b64ef347",
         *      "name": "thing_name"
         *   }
         */

    //     this.ValidateConfigAndToken(config, token);

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
        new URL('things/configs', this.bootstrapsUrl).toString(), options
        // new URL (`things/${this.bootstrapsEndpoint}`, this.bootstraps_url),
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.bootstrapError.HandleError(errorRes.error, response.status)
      }
      const shareResponse: Response = { status: response.status, message: 'Bootstrap created' }
      return shareResponse
    } catch (error) {
      throw error
    }
  }

  public async Whitelist (Bootstrap: Bootstrap, token: string): Promise<Response> {
    // Update a bootstrap configuration
    /**
    * @method Whitelist - Allows a logged in user to update a bootstrap configuration.
    * This changes the status of the config to whitelisted.
    * @param {object} config - The configuration object.
    * @param {string} token - The token to be used for authentication.
    * @example
    * const config = {
    *      "external_id": "345",
    *      "external_key": "012",
    *      "thing_id": "3d49a42f-63fd-491b-9784-adf4b64ef347",
    *      "name": "thing_name"
    * }
    */
    // if (typeof thing_id !== "string" || thing_id === null)
    //     throw new Error('Invalid thing_id parameter. Expected a string.');
    // }
    // this.ValidateConfigAndToken(config, token);

    const options: RequestInit = {
      method: 'PUT',
      headers: {
        'Content-Type': this.contentType,
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(Bootstrap.state)
    }
    try {
      const response = await fetch(
        new URL(`things/state/${Bootstrap.thing-id}`, this.bootstrapsUrl).toString(), options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.bootstrapError.HandleError(errorRes.error, response.status)
      }
      const whitelistResponse: Response = { status: response.status, message: 'Bootstrap Whitelisted Successfully' }
      return whitelistResponse
    } catch (error) {
      throw error
    }
  }

  public async UpdateBootstrap (Bootstrap: Bootstrap, token: string): Promise<Response> {
    // Update a bootstrap configuration
    /**
    * @method Update - Allows a logged in user to update a bootstrap configuration.
    * This can change the name of the config and metadata.
    * @param {object} config - The configuration object.
    * @param {string} token - The token to be used for authentication.
    * @example
    * const config = {
    *      "external_id": "345",
    *      "external_key": "012",
    *      "thing_id": "3d49a42f-63fd-491b-9784-adf4b64ef347",
    *      "name": "thing_name"
    * }
    */

    //         if (typeof thing_id !== "string" || thing_id === null) {
    //             throw new Error('Invalid thing_id parameter. Expected a string.');
    //         }

    //         this.ValidateConfigAndToken(config, token);

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
        new URL(`things/configs/${Bootstrap.thingId}`, this.bootstrapsUrl).toString(), options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.bootstrapError.HandleError(errorRes.error, response.status)
      }
      const updateResponse: Response = { status: response.status, message: 'Bootstrap Updated Successfully' }
      return updateResponse
    } catch (error) {
      throw error
    }
  }

  public async ViewBootstrap (thingId: string, token: string): Promise<Bootstrap> {
    // View a bootstrap configuration
    /**
    * @method View - Allows a logged in user to view a bootstrap configuration.
    * Once provided with the thing_id and a valid token, it returns the configuration object.
    * @param {string} thing_id - The thing_id of the configuration to be viewed.
    * @param {string} token - The token to be used for authentication.
    */

    //         if (typeof thing_id !== "string" || thing_id === null) {
    //             throw new Error('Invalid thing_id parameter. Expected a string.');
    //         }

    //         this.ValidateConfigAndToken({}, token);

    const options = {
      method: 'GET',
      maxBodyLength: 2000,
      headers: {
        'Content-Type': this.contentType,
        Authorization: `Bearer ${token}`
      }
    }
    try {
      const response = await fetch(
        new URL(`things/configs/${thingId}`, this.bootstrapsUrl).toString(), options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.bootstrapError.HandleError(errorRes.error, response.status)
      }
      const Bootstrap: Bootstrap = await response.json()
      return Bootstrap
    } catch (error) {
      throw error
    }
  }

  public async UpdateBootstrapCerts (thingId: string, clientCert: string, clientKey: string, caCert: string, token: string): Promise<Bootstrap> {
    // Update certs of a bootstrap configuration
    /**
    * @method UpdateCerts - Allows a logged in user to update the certs of a bootstrap configuration.
    * Update is performed by replacing the current certificate data with values provided in a request payload.
    * @param {string} config_id - The config_id of the configuration to be updated. This can also mean the thing_id.
    * @param {string} client_cert - The client certificate to be used.
    * @param {string} client_key - The client key to be used.
    * @param {string} ca - The certificate authority to be used.
    * @param {string} token - The token to be used for authentication.
    *
    */

    //  if (typeof config_id !== "string" ||
    //      typeof client_cert !== "string" ||
    //      typeof client_key !== "string" ||
    //      typeof ca !== "string" ||
    //      typeof token !== "string" ) {
    //      throw new Error('Invalid parameter types. Expected strings for config_id, client_cert, client_key, ca and token.');
    //  };

    const options: RequestInit = {
      method: 'PATCH',
      headers: {
        'Content-Type': this.contentType,
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ client_cert: clientCert, client_key: clientKey, ca_cert: caCert })
    }
    try {
      const response = await fetch(
        new URL(`things/configs/certs/${thingId}`, this.bootstrapsUrl).toString(), options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.bootstrapError.HandleError(errorRes.error, response.status)
      }
      const updatedBootstrap: Bootstrap = await response.json()
      return updatedBootstrap
    } catch (error) {
      throw error
    }
  }

  public async RemoveBootstrap (thingId: string, token: string): Promise<Response> {
    // Remove a bootstrap configuration
    /**
    * @method Remove - Allows a logged in user to delete a bootstrap configuration.
    * @param {string} config_id - The config_id of the configuration to be deleted.
    * This can also mean the thing_id.
    * @param {string} token - The token to be used for authentication.
    */

    //  if (typeof config_id !== "string" || config_id === null) {
    //      throw new Error('Invalid config_id parameter. Expected a string.');
    //  }

    //  this.ValidateConfigAndToken({}, token);

    const options: RequestInit = {
      method: 'DELETE',
      headers: {
        'Content-Type': this.contentType,
        Authorization: `Bearer ${token}`
      }
    }
    try {
      const response = await fetch(
        new URL(`things/configs/${thingId}`, this.bootstrapsUrl).toString(), options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.bootstrapError.HandleError(errorRes.error, response.status)
      }
      const removeResponse: Response = { status: response.status, message: 'Configuration Removed' }
      return removeResponse
    } catch (error) {
      throw error
    }
  }

  public async BootstrapSecure (externalId: string, externalKey: string, cryptoKey: string): Promise<Bootstrap> {
    // Retrive a bootstrap configuration
    /**
    * @method Bootstrap - Retrieves a configuration with given external ID and encrypted external key.
    * @param {string} external_id - The external ID of the configuration to be retrieved.
    * @param {string} external_key - The encrypted external key of the configuration to be retrieved.
    * @return {object} - Returns a config object.
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
        new URL(`things/bootstrap/secure/${externalId}`, this.bootstrapsUrl).toString(), options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.bootstrapError.HandleError(errorRes.error, response.status)
      }
      const securedBootstrap: Bootstrap = await response.json()
      return securedBootstrap
    } catch (error) {
      throw error
    }
  }

  public async Bootstrap (externalId: string, externalKey: string): Promise<Bootstrap> {
    // Retrive a bootstrap configuration
    /**
     * @method Bootstrap - Retrieves a configuration with given external ID and encrypted external key.
     * @param {string} external_id - The external ID of the configuration to be retrieved.
     * @param {string} external_key - The encrypted external key of the configuration to be retrieved.
     * @return {object} - Returns a config object.
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
        new URL(`things/bootstrap/${externalId}`, this.bootstrapsUrl).toString(), options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.bootstrapError.HandleError(errorRes.error, response.status)
      }
      const Bootstrap: Bootstrap = await response.json()
      return Bootstrap
    } catch (error) {
      throw error
    }
  }

  public async Bootstraps (queryParams: QueryParams, token: string): Promise<BootstrapPage> {
    // Retrive all bootstraps with pagination
    /**
     * @method Bootstraps - Gets all bootstraps with pagination.
     * @param {Object} queryParams - Query parameters.
     * @param {String} token - Access token.
     *  @returns {Object} - Bootstrap object.
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
        new URL(`things/config/?${new URLSearchParams(stringParams).toString()}`, this.bootstrapsUrl).toString(), options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.bootstrapError.HandleError(errorRes.error, response.status)
      }
      const Bootstraps: BootstrapPage = await response.json()
      return Bootstraps
    } catch (error) {
      throw error
    }
  }

  public async UpdateBootstrapConnection (thingId: string, channels: Channel[], token: string): Promise<Response> {
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
      body: JSON.stringify(channels)
    }
    try {
      const response = await fetch(
        new URL(`things/configs/connections/${thingId}`, this.bootstrapsUrl).toString(), options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.bootstrapError.HandleError(errorRes.error, response.status)
      }
      const connResponse: Response = { status: response.status, message: 'Bootstrap Connection Successful' }
      return connResponse
    } catch (error) {
      throw error
    }
  }
}
