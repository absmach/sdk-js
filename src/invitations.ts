// Copyright (c) Abstract Machines
// SPDX-License-Identifier: Apache-2.0

import Errors from "./errors";
import type {
  Response,
  Invitation,
  InvitationsPage,
  PageMetadata,
  InvitationPageMeta,
} from "./defs";

export default class Invitations {
  private readonly domainsUrl: URL;

  private readonly contentType: string;

  private readonly invitationsEndpoint: string;

  private readonly domainsEndpoint: string;
  /**
   * @constructor
   * Initializes the Invitations API client.
   * @param {object} config - Configuration object.
   * @param {string} config.domainsUrl - Base URL for the domains API.
   */

  public constructor({ domainsUrl }: { domainsUrl: string }) {
    this.domainsUrl = new URL(domainsUrl);
    this.contentType = "application/json";
    this.domainsEndpoint = "domains";
    this.invitationsEndpoint = "invitations";
  }

  /**
   * @method SendInvitation - Sends an invitation to the email address associated with the given user.
   * @param {string} userId - The unique ID of the user.
   * @param {string} domainId - The unique ID of the domain.
   * @param {string} token - Authorization token.
   * @returns {Promise<Response>} response - A promise that resolves when the invitations are sent.
   * @throws {Error} - If the invitations cannot be sent.
  */
  public async SendInvitation(
    userId: string,
    domainId: string,
    roleId: string,
    token: string
  ): Promise<Response> {
    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": this.contentType,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ invitee_user_id: userId, role_id: roleId }),
    };

    try {
      const response = await fetch(
        new URL(`${this.domainsEndpoint}/${domainId}/${this.invitationsEndpoint}`, this.domainsUrl).toString(),
        options
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const inviteResponse: Response = {
        status: response.status,
        message: "Invitation sent successfully",
      };
      return inviteResponse;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @method ViewInvitation - Retrieves all the invitation for the given user.
   * @param {string} userId - The unique ID of the user.
   * @param {string} domainId - The unique ID of the domain.
   * @param {string} token - Authorization token.
   * @returns {Promise<Invitation>} invitation - The invitation object.
   * @throws {Error} - If the invitation cannot be fetched.
  */
  public async ViewInvitation(
    userId: string,
    domainId: string,
    token: string
  ): Promise<Invitation> {
    const options: RequestInit = {
      method: "GET",
      headers: {
        "Content-Type": this.contentType,
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await fetch(
        new URL(`${this.domainsEndpoint}/${domainId}/${this.invitationsEndpoint}/${userId}`, this.domainsUrl).toString(),
        options
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const invitation: Invitation = await response.json();
      return invitation;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @method ListDomainInvitations - Retrieves all domain invitations matching the provided query parameters.
   * @param {InvitationPageMeta} queryParams - Query parameters for the request.
   * @param {string} domainId - The unique ID of the domain.
   * @param {string} token - Authorization token.
   * @returns {Promise<InvitationsPage>} invitationsPage - A page of domain invitations.
   * @throws {Error} - If the domain invitations cannot be fetched.
  */
  public async ListDomainInvitations(
    queryParams: InvitationPageMeta,
    domainId: string,
    token: string
  ): Promise<InvitationsPage> {
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
        new URL(`${this.domainsEndpoint}/${domainId}/${this.invitationsEndpoint}?${new URLSearchParams(
          stringParams
        ).toString()}`, this.domainsUrl).toString(),
        options
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const invitationsPage: InvitationsPage = await response.json();
      return invitationsPage;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @method ListUserInvitations - Retrieves all user invitations matching the provided query parameters.
   * @param {PageMetadata} queryParams - Query parameters for the request.
   * @param {string} token - Authorization token.
   * @returns {Promise<InvitationsPage>} invitationsPage - A page of user invitations.
   * @throws {Error} - If the user invitations cannot be fetched.
  */
  public async ListUserInvitations(
    queryParams: PageMetadata,
    token: string
  ): Promise<InvitationsPage> {
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
        new URL(`${this.invitationsEndpoint}?${new URLSearchParams(
          stringParams
        ).toString()}`, this.domainsUrl).toString(),
        options
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const invitationsPage: InvitationsPage = await response.json();
      return invitationsPage;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @method AcceptInvitation - Accepts an invitation by adding the user to the domain that they were invited to.
   *  @param {string} domainId - The unique ID of the domain.
   * @param {string} token - Authorization token.
   * @returns {Promise<Response>} response - A promise that resolves when the invitation is accepted.
   * @throws {Error} - If the invitations cannot be accepted.
  */
  public async AcceptInvitation(
    domainId: string,
    token: string
  ): Promise<Response> {
    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": this.contentType,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ domain_id: domainId }),
    };

    try {
      const response = await fetch(
        new URL(
          `${this.invitationsEndpoint}/accept`,
          this.domainsUrl
        ).toString(),
        options
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const acceptResponse: Response = {
        status: response.status,
        message: "Invitation accepted successfully",
      };
      return acceptResponse;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @method RejectInvitation - Rejects an invitation.
   *  @param {string} domainId - The unique ID of the domain.
   * @param {string} token - Authorization token.
   * @returns {Promise<Response>} response - A promise that resolves when the invitation is rejected.
   * @throws {Error} - If the invitations cannot be rejected.
  */
  public async RejectInvitation(
    domainId: string,
    token: string
  ): Promise<Response> {
    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": this.contentType,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ domain_id: domainId }),
    };

    try {
      const response = await fetch(
        new URL(
          `${this.invitationsEndpoint}/reject`,
          this.domainsUrl
        ).toString(),
        options
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const rejectResponse: Response = {
        status: response.status,
        message: "Invitation rejected successfully",
      };
      return rejectResponse;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @method DeleteInvitation - Deletes an invitation.
   * @param {string} userId - The unique ID of the user.
   * @param {string} domainId - The unique ID of the domain.
   * @param {string} token - Authorization token.
   * @returns {Promise<Response>} response - A promise that resolves when the invitation is deleted.
   * @throws {Error} - If the invitations cannot be deleted.
  */
  public async DeleteInvitation(
    userId: string,
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
        new URL(`${this.domainsEndpoint}/${domainId}/${this.invitationsEndpoint}/${userId}`, this.domainsUrl).toString(),
        options
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const deleteResponse: Response = {
        status: response.status,
        message: "Invitation deleted successfully",
      };
      return deleteResponse;
    } catch (error) {
      throw error;
    }
  }
}
