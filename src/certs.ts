import Errors from "./errors";
import { type Cert, type CertSerials, type Response } from "./defs";

/**
*@class Certs
* Handles interactions with certs API, including issuing, viewing, revoking certificates and manage certificates.
*/
export default class Certs {
  private readonly certsUrl: URL;

  private readonly contentType: string;

  private readonly certsEndpoint: string;

  constructor(certsUrl: string) {
    this.certsUrl = new URL(certsUrl);
    this.contentType = "application/json";
    this.certsEndpoint = "certs";
  }

  /**
  * @method IssueCert - Issue a certificate to a client.
  * Requires a clientId and a valid time in hours as well as a token.
  * @param {string} clientId - The clientId of the client to be issued a certificate.
  * @param {string} valid - The time in hours for which the certificate is valid such as '10h'
  * @param {string} domainId - The  unique ID of the domain.
  * @param {String} token - Authorization token.
  */
  public async IssueCert(
    clientId: string,
    valid: string,
    domainId: string,
    token: string
  ): Promise<Cert> {
    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": this.contentType,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ client_id: clientId, ttl: valid }),
    };

    try {
      const response = await fetch(
        new URL(`${domainId}/${this.certsEndpoint}`, this.certsUrl).toString(),
        options
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const cert: Cert = await response.json();
      return cert;
    } catch (error) {
      throw error;
    }
  }

  /**
  * @method ViewCertByClient - Allows a logged in user to view a certificate serial once they
  * provide a valid connected client-id and token.
  * @param {string} clientId - The clientId of the client whose certificate is to be viewed.
  * @param {string} domainId - The  unique ID of the domain.
  * @param {string} token - Authorization token.
  */
  public async ViewCertByClient(
    clientId: string,
    domainId: string,
    token: string
  ): Promise<CertSerials> {
    const options: RequestInit = {
      method: "GET",
      headers: {
        "Content-Type": this.contentType,
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await fetch(
        new URL(`${domainId}/serials/${clientId}`, this.certsUrl).toString(),
        options
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const certsPage: CertSerials = await response.json();
      return certsPage;
    } catch (error) {
      throw error;
    }
  }

  /**
  * @method ViewCert - Allows a logged in user to view a certificate once they
  * provide a valid cert-id and token.
  * @param {string} id - The ID of the certificate to be viewed.
  * @param {string} domainId - The  unique ID of the domain.
  * @param {string} token - Authorization token.
  */
  public async ViewCert(
    id: string,
    domainId: string,
    token: string
  ): Promise<Cert> {
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
          `${domainId}/${this.certsEndpoint}/${id}`,
          this.certsUrl
        ).toString(),
        options
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const cert: Cert = await response.json();
      return cert;
    } catch (error) {
      throw error;
    }
  }

  /**
  * @method RevokeCert - Allows a logged in user to delete a certificate once they
  * provide a valid client-id and token.
  * @param {string} id - The id of the certificate to be revoked.
  * @param {string} domainId - The  unique ID of the domain.
  * @param {string} token - Authorization token.
  */
  public async RevokeCert(
    id: string,
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
        new URL(
          `${domainId}/${this.certsEndpoint}/${id}`,
          this.certsUrl
        ).toString(),
        options
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const revokeResponse: Response = {
        status: response.status,
        message: "Cert revoked successfully",
      };
      return revokeResponse;
    } catch (error) {
      throw error;
    }
  }
}
