import Errors from './errors'
import {
  type Cert,
  type CertSerials,
  type Response
} from './defs'

export default class Certs {
  // Certs API Client
  /**
   *@class Certs - Certs is used to manage certificates.
   *It is used to issue, view and revoke certificates.
   * @param {string} certsUrl - The url of the certs service.
   * @param {string} contentType - The content type of the request.
   * @param {string} certsEndpoint - The endpoint of the certs service which is certs.
   * @returns {Certs} - Returns a Certs object.
   */

  private readonly certsUrl: URL
  private readonly contentType: string
  private readonly certsEndpoint: string
  private readonly certsError: Errors

  constructor (certsUrl: string) {
    this.certsUrl = new URL(certsUrl)
    this.contentType = 'application/json'
    this.certsEndpoint = 'certs'
    this.certsError = new Errors()
  }

  public async IssueCert (thingID: string, valid: string, token: string): Promise<Cert> {
    // Issue a certificate
    /**
     * @method IssueCert - Issue a certificate to a thing.
     * Requires a thingID and a valid time in hours as well as a token.
     * @param {string} thingID - The thingID of the thing to be issued a certificate.
     * @param {string} valid - The time in hours for which the certificate is valid such as '10h'
     * @example
     * const certs = {
     * "cert_serial": "22:16:df:60:c2:99:bc:c4:9b:1d:fd:71:5e:e9:07:d9:1b:3c:85:1d",
     *  "client_cert": "-----BEGIN CERTIFICATE-----\nMIIEATCCAumgAwIBAgIUIhbfYMKZvMSbHf1xXukH2Rs8hR0wDQYJKoZIhvcNAQEL1k\n-----END CERTIFICATE-----",
     * "client_key": "-----BEGIN RSA PRIVATE KEY-----\nMIIEoQIBAAKCAQEAy9gF84a5s6jlX6hkAPXrLYqvdhe6uygdr6eHfd5erdcdxfgc\n-----END RSA PRIVATE KEY-----",
     * "expiration": "2023-09-20T10:02:48Z",
     * "thingID": "3d49a42f-63fd-491b-9784-adf4b64ef347"
     *  }
     */
    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': this.contentType,
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ thing_id: thingID, ttl: valid })
    }

    try {
      const response = await fetch(
        new URL(this.certsEndpoint, this.certsUrl).toString(),
        options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.certsError.HandleError(errorRes.error, response.status)
      }
      const certsData: Cert = await response.json()
      return certsData
    } catch (error) {
      throw error
    }
  }

  public async ViewCertByThing (thingID: string, token: string): Promise<CertSerials> {
    // View certificates by thingID
    /**
     * @method ViewCertByThing - Allows a logged in user to view a certificate serial once they
     * provide a valid connected thing-id and token.
     * @param {string} thingID - The thingID of the thing whose certificate is to be viewed.
     * @param {string} token - The token to be used for authentication.
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
        new URL(`serials/${thingID}`, this.certsUrl).toString(),
        options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.certsError.HandleError(errorRes.error, response.status)
      }
      const certsData: CertSerials = await response.json()
      return certsData
    } catch (error) {
      throw error
    }
  }

  public async ViewCert (id: string, token: string): Promise<Cert> {
    // View certificate by certID
    /**
     * @method ViewCert - Allows a logged in user to view a certificate once they
     * provide a valid cert-id and token.
     * @param {string} id - The ID of the certificate to be viewed.
     * @param {string} token - The token to be used for authentication.
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
        new URL(`${this.certsEndpoint}/${id}`, this.certsUrl).toString(),
        options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.certsError.HandleError(errorRes.error, response.status)
      }
      const certsData: Cert = await response.json()
      return certsData
    } catch (error) {
      throw error
    }
  }

  public async RevokeCert (id: string, token: string): Promise<Response> {
    // Revoke a certificate
    /**
     * @method RevokeCert - Allows a logged in user to delete a certificate once they
     * provide a valid thing-id and token.
     * @param {string} id - The id of the certificate to be revoked.
     * @param {string} token - The token to be used for authentication.
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
        new URL(`${this.certsEndpoint}/${id}`, this.certsUrl).toString(),
        options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.certsError.HandleError(errorRes.error, response.status)
      }
      const revokeResponse: Response = { status: response.status, message: 'Cert Revoked Successfully' }
      return revokeResponse
    } catch (error) {
      throw error
    }
  }
}
