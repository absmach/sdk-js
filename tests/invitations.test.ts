// Copyright (c) Abstract Machines
// SPDX-License-Identifier: Apache-2.0

import fetchMock, { enableFetchMocks } from "jest-fetch-mock";

import SDK from "../src/sdk";
import type { Invitation, InvitationsPage } from "../src/sdk";

enableFetchMocks();

const domainsUrl = "http://localhost";
const sdk = new SDK({ domainsUrl });

describe("Invitations", () => {
  const invitation: Invitation = {
    invited_by: "6a422a33-f849-4631-aa8f-92132037c84a",
    invitee_user_id: "99419100-b577-4d1a-a4d0-4383be3f4aef",
    domain_id: "3ca9a205-fc34-4c64-b21a-cd48a8c6d380",
    role_id: "domain_h7QSXUqR6a7he9eRE3HmDcbt",
  };

  const token = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9";

  const userId = "886b4266-77d1-4258-abae-2931fb4f16de";

  const domainId = "886b4266-77d1-4258-abae-2931fb4f16de";

  const roleId = "domain_qSTQnPldHH7Qgu3xckTD5NEX";

  const queryParams = {
    offset: 0,
    limit: 10,
  };

  const invitationsPage: InvitationsPage = {
    invitations: [invitation],
    total: 1,
    offset: 0,
    limit: 10,
  };

  beforeEach(() => {
    fetchMock.resetMocks();
  });

  test("Send invitation should send an invitation", async () => {
    const SendInvitationResponse = {
      status: 200,
      message: "Invitation sent successfully",
    };
    fetchMock.mockResponseOnce(JSON.stringify(SendInvitationResponse));

    const response = await sdk.invitations.SendInvitation(userId, domainId, roleId, token);
    expect(response).toEqual(SendInvitationResponse);
  });

  test("Invitation should return an invitation", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(invitation));

    const response = await sdk.invitations.ViewInvitation(userId, domainId, token);
    expect(response).toEqual(invitation);
  });

  test("ListDomainInvitations should return a list of domain invitations", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(invitationsPage));

    const response = await sdk.invitations.ListDomainInvitations(queryParams, domainId, token);
    expect(response).toEqual(invitationsPage);
  });

  test("ListUserInvitations should return a list of user invitations", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(invitationsPage));

    const response = await sdk.invitations.ListUserInvitations(queryParams, token);
    expect(response).toEqual(invitationsPage);
  });

  test("Accept invitation should accept an invitation", async () => {
    const AcceptInvitationResponse = {
      status: 200,
      message: "Invitation accepted successfully",
    };
    fetchMock.mockResponseOnce(JSON.stringify(AcceptInvitationResponse));

    const response = await sdk.invitations.AcceptInvitation(domainId, token);
    expect(response).toEqual(AcceptInvitationResponse);
  });

  test("Reject invitation should reject an invitation", async () => {
    const RejectInvitationResponse = {
      status: 200,
      message: "Invitation rejected successfully",
    };
    fetchMock.mockResponseOnce(JSON.stringify(RejectInvitationResponse));

    const response = await sdk.invitations.RejectInvitation(domainId, token);
    expect(response).toEqual(RejectInvitationResponse);
  });

  test("Delete invitation should delete an invitation", async () => {
    const DeleteInvitationResponse = {
      status: 200,
      message: "Invitation deleted successfully",
    };
    fetchMock.mockResponseOnce(JSON.stringify(DeleteInvitationResponse));

    const response = await sdk.invitations.DeleteInvitation(
      userId,
      domainId,
      token,
    );
    expect(response).toEqual(DeleteInvitationResponse);
  });
});
