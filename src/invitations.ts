import Errors from "./errors";
import type {
  Response,
  Invitation,
  InvitationsPage,
  PageMetadata,
} from "./defs";

export default class Invitations {
  // Invitations API client
  /**
   * @class Invitations - Invitations API client
   * Invitations is used to send, accept, and delete invitations.
   * @param {string} invitationsUrl - The URL of the invitations service.
   * @returns {Object} - The Invitations object.
   */
  private readonly invitationsUrl: URL;

  private readonly contentType: string;

  private readonly invitationsEndpoint: string;

  public constructor(invitationsUrl: string) {
    this.invitationsUrl = new URL(invitationsUrl);
    this.contentType = "application/json";
    this.invitationsEndpoint = "invitations";
  }

  public async SendInvitation(
    invitation: Invitation,
    token: string
  ): Promise<Response> {
    // SendInvitation sends an invitation to the email address associated with the given user.
    /**
     * @method SendInvitation - sends an invitation to the email address associated with the given user.
     * @param {Object} invitation - The invitation object.
     * @param {string} token - The user's access token.
     * @returns {Object} - The response object which has a status and a message.
     * @example
     * const invitation = {
     *  userID: '<userID>',
     *  domainID: '<domainID>',
     * relation: '<role>' // available options: 'administrator', 'editor','contributor','member'
     * }
     */
    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": this.contentType,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(invitation),
    };

    try {
      const response = await fetch(
        new URL(`${this.invitationsEndpoint}`, this.invitationsUrl).toString(),
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

  public async Invitation(
    userId: string,
    domainId: string,
    token: string
  ): Promise<Invitation> {
    // Invitation returns the invitation for the given user and domain.
    /**
     * @method Invitation - returns the invitation for the given user and domain.
     * @param {Object} invitation - The invitation object.
     * @param {string} userId - The User ID.
     * @param {string} domainId - The Domain ID.
     * @param {string} token - The user's access token.
     * @returns {Object} - The invitation object.
     */
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
          `${this.invitationsEndpoint}/${userId}/${domainId}`,
          this.invitationsUrl
        ).toString(),
        options
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const invitationData: Invitation = await response.json();
      return invitationData;
    } catch (error) {
      throw error;
    }
  }

  public async Invitations(
    queryParams: PageMetadata,
    token: string
  ): Promise<InvitationsPage> {
    // Invitations returns a list of invitations.
    /**
     * @method Invitations - returns a list of invitations.
     * @param {Object} queryParams - The query parameters such as limit and offset.
     * @param {string} token - The user's access token.
     * @returns {Object} - The invitations page object that has a list of invitations and pagination information.
     */
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
        new URL(
          `${this.invitationsEndpoint}?${new URLSearchParams(
            stringParams
          ).toString()}`,
          this.invitationsUrl
        ).toString(),
        options
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const invitationData: InvitationsPage = await response.json();
      return invitationData;
    } catch (error) {
      throw error;
    }
  }

  public async AcceptInvitation(
    domainId: string,
    token: string
  ): Promise<Response> {
    // AcceptInvitation accepts an invitation by adding the user to the domain that they were invited to.
    /**
     * @method AcceptInvitation - accepts an invitation by adding the user to the domain that they were invited to.
     * @param {String} domainId - The Domain ID.
     * @param {string} token - The invited user's access token.
     * @returns {Object} - The response object which has a status and a message.
     */
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
          this.invitationsUrl
        ).toString(),
        options
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const inviteResponse: Response = {
        status: response.status,
        message: "Invitation accepted successfully",
      };
      return inviteResponse;
    } catch (error) {
      throw error;
    }
  }

  public async RejectInvitation(
    domainId: string,
    token: string
  ): Promise<Response> {
    // RejectInvitation rejects an invitation by declining an invitation a user was sent to join a domain.
    /**
     * @method RejectInvitation - rejects an invitation by declining an invitation a user was sent to join a domain.
     * @param {String} domainId - The Domain ID.
     * @param {string} token - The invited user's access token.
     * @returns {Object} - The response object which has a status and a message.
     */
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
          this.invitationsUrl
        ).toString(),
        options
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const inviteResponse: Response = {
        status: response.status,
        message: "Invitation rejected successfully",
      };
      return inviteResponse;
    } catch (error) {
      throw error;
    }
  }

  public async DeleteInvitation(
    userId: string,
    domainId: string,
    token: string
  ): Promise<Response> {
    // DeleteInvitation deletes an invitation.
    /**
     * @method DeleteInvitation - deletes an invitation.
     * @param {string} userId - The Users ID.
     * @param {string} domainId - The Domain ID.
     * @param {string} token - The user's access token.
     * @returns {Object} - The response object which has a status and a message.
     */
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
          `${this.invitationsEndpoint}/${userId}/${domainId}`,
          this.invitationsUrl
        ).toString(),
        options
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const inviteResponse: Response = {
        status: response.status,
        message: "Invitation deleted successfully",
      };
      return inviteResponse;
    } catch (error) {
      throw error;
    }
  }
}
