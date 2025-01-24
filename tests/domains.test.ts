// Copyright (c) Abstract Machines
// SPDX-License-Identifier: Apache-2.0

import fetchMock, { enableFetchMocks } from "jest-fetch-mock";

import SDK from "../src/sdk";
import type { Domain, DomainsPage, User, UsersPage } from "../src/sdk";

enableFetchMocks();

const domainsUrl = "http://localhost";
const sdk = new SDK({ domainsUrl });

describe("Domains", () => {
  const domain: Domain = {
    id: "886b4266-77d1-4258-abae-2931fb4f16de",
    name: "fkatwigs",
    alias: "music",
    permission: "admin",
    status: "enabled",
  };

  const token = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9";

  const domainId = "886b4266-77d1-4258-abae-2931fb4f16de";

  const userId = "886b4266-77d1-4258-abae-2931fb4f16de";

  const roleName = "editor";
  const actions = ["read", "write"];
  const members = ["user1", "user2"];
  const role = { name: roleName, actions, members };

  const domainsPage: DomainsPage = {
    domains: [domain],
    total: 1,
    offset: 0,
    limit: 10,
  };

  const queryParams = {
    offset: 0,
    limit: 10,
  };

  const user: User = {
    id: "886b4266-77d1-4258-abae-2931fb4f16de",
    first_name: "tahliah",
    last_name: "barnett",
    tags: ["holy", "terrain"],
    email: "fkatwigs@email.com",
    credentials: {
      username: "fkatwigs@email.com",
      secret: "12345678",
    },
    role: "administrator",
    status: "enabled",
  };

  const usersPage: UsersPage = {
    users: [user],
    total: 1,
    offset: 0,
    limit: 10,
  };

  beforeEach(() => {
    fetchMock.resetMocks();
  });

  test("Create should create a domain", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(domain));

    const response = await sdk.domains.CreateDomain(domain, token);
    expect(response).toEqual(domain);
  });

  test("Domains should return a list of domains", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(domainsPage));

    const response = await sdk.domains.Domains(queryParams, token);
    expect(response).toEqual(domainsPage);
  });

  test("Domain should return a domain", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(domain));

    const response = await sdk.domains.Domain(domainId, token);
    expect(response).toEqual(domain);
  });

  test("Update should update a domain name and metadata", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(domain));

    const response = await sdk.domains.UpdateDomain(domain, token);
    expect(response).toEqual(domain);
  });

  test("List user domains should return a list of user domains", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(domainsPage));

    const response = await sdk.domains.ListUserDomains(
      userId,
      queryParams,
      token
    );
    expect(response).toEqual(domainsPage);
  });

  test("List domain users should return a list of domain users", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(usersPage));

    const response = await sdk.domains.ListDomainUsers(
      domainId,
      queryParams,
      token
    );
    expect(response).toEqual(usersPage);
  });

  test("Enable domain should enable a domain", async () => {
    const enableDomainResponse = {
      status: 200,
      message: "Domain enabled successfully",
    };
    fetchMock.mockResponseOnce(JSON.stringify(enableDomainResponse));

    const response = await sdk.domains.EnableDomain(domainId, token);
    expect(response).toEqual(enableDomainResponse);
  });

  test("Disable domain should disable a domain", async () => {
    const disableDomainResponse = {
      status: 200,
      message: "Domain disabled successfully",
    };
    fetchMock.mockResponseOnce(JSON.stringify(disableDomainResponse));

    const response = await sdk.domains.DisableDomain(domainId, token);
    expect(response).toEqual(disableDomainResponse);
  });

  test("Freeze domain should freeze a domain", async () => {
    const freezeDomainResponse = {
      status: 200,
      message: "Domain frozen successfully",
    };

    fetchMock.mockResponseOnce(JSON.stringify(freezeDomainResponse));

    const response = await sdk.domains.FreezeDomain(domainId, token);
    expect(response).toEqual(freezeDomainResponse);
  });

  test("ListDomainActions should return available actions", async () => {
    const availableActions = ["read", "write", "delete"];
    fetchMock.mockResponseOnce(JSON.stringify({ available_actions: availableActions }));

    const response = await sdk.domains.ListDomainActions(token);
    expect(response).toEqual(availableActions);
  });

  test("CreateDomainRole should create a new role and return it", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(role));

    const response = await sdk.domains.CreateDomainRole(
      domainId,
      roleName,
      token,
      actions,
      members
    );
    expect(response).toEqual(role);
  });

  test("ListDomainRoles should return a page of roles", async () => {
    const rolesPage = { roles: [role], total: 1, offset: 0, limit: 10 };
    fetchMock.mockResponseOnce(JSON.stringify(rolesPage));

    const response = await sdk.domains.ListDomainRoles(
      domainId,
      { offset: 0, limit: 10 },
      token
    );
    expect(response).toEqual(rolesPage);
  });

  test("ViewDomainRole should return details of a specific role", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(role));

    const response = await sdk.domains.ViewDomainRole(
      domainId,
      roleName,
      token
    );
    expect(response).toEqual(role);
  });

  test("UpdateDomainRole should update a role and return the updated role", async () => {
    const updatedRole = { ...role, actions: [...role.actions, "execute"] };
    fetchMock.mockResponseOnce(JSON.stringify(updatedRole));

    const response = await sdk.domains.UpdateDomainRole(
      domainId,
      roleName,
      updatedRole,
      token
    );
    expect(response).toEqual(updatedRole);
  });

  test("DeleteDomainRole should delete a role response", async () => {
    const successResponse = {
      status: 200,
      message: "Role deleted successfully",
    };
    fetchMock.mockResponseOnce(JSON.stringify(successResponse));

    const response = await sdk.domains.DeleteDomainRole(
      domainId,
      roleName,
      token
    );
    expect(response).toEqual(successResponse);
  });

  test("AddDomainRoleActions should add actions to a role and return updated actions", async () => {
    const updatedActions = [...actions, "execute"];
    fetchMock.mockResponseOnce(JSON.stringify({ actions: updatedActions }));

    const response = await sdk.domains.AddDomainRoleActions(
      domainId,
      roleName,
      ["execute"],
      token
    );
    expect(response).toEqual(updatedActions);
  });

  test("ListDomainRoleActions should return actions of a specific role", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ actions }));

    const response = await sdk.domains.ListDomainRoleActions(
      domainId,
      roleName,
      token
    );
    expect(response).toEqual(actions);
  });

  test("DeleteDomainRoleActions should remove actions from a role response", async () => {
    const successResponse = {
      status: 200,
      message: "Role actions deleted successfully",
    };
    fetchMock.mockResponseOnce(JSON.stringify(successResponse));

    const response = await sdk.domains.DeleteDomainRoleActions(
      domainId,
      roleName,
      ["write"],
      token
    );
    expect(response).toEqual(successResponse);
  });

  test("DeleteAllDomainRoleActions should remove all actions from a role response", async () => {
    const successResponse = {
      status: 200,
      message: "Role actions deleted successfully",
    };
    fetchMock.mockResponseOnce(JSON.stringify(successResponse));

    const response = await sdk.domains.DeleteAllDomainRoleActions(
      domainId,
      roleName,
      token
    );
    expect(response).toEqual(successResponse);
  });

  test("AddDomainRoleMembers should add members to a role and return updated members", async () => {
    const updatedMembers = [...members, "user3"];
    fetchMock.mockResponseOnce(JSON.stringify({ members: updatedMembers }));

    const response = await sdk.domains.AddDomainRoleMembers(
      domainId,
      roleName,
      ["user3"],
      token
    );
    expect(response).toEqual(updatedMembers);
  });

  test("ListDomainRoleMembers should return members of a specific role", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ members }));

    const response = await sdk.domains.ListDomainRoleMembers(
      domainId,
      roleName,
      { offset: 0, limit: 10 },
      token
    );
    expect(response).toEqual(members);
  });

  test("DeleteDomainRoleMembers should remove members from a role response", async () => {
    const successResponse = {
      status: 200,
      message: "Role members deleted successfully",
    };
    fetchMock.mockResponseOnce(JSON.stringify(successResponse));

    const response = await sdk.domains.DeleteDomainRoleMembers(
      domainId,
      roleName,
      ["user1"],
      token
    );
    expect(response).toEqual(successResponse);
  });

  test("DeleteAllDomainRoleMembers should remove all members from a role response", async () => {
    const successResponse = {
      status: 200,
      message: "Role members deleted successfully",
    };
    fetchMock.mockResponseOnce(JSON.stringify(successResponse));

    const response = await sdk.domains.DeleteAllDomainRoleMembers(
      domainId,
      roleName,
      token
    );
    expect(response).toEqual(successResponse);
  });
});
