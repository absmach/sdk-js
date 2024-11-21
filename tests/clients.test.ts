import fetchMock, { enableFetchMocks } from "jest-fetch-mock";

import SDK from "../src/sdk";
import type {
  Client, ClientsPage
} from "../src/sdk";

enableFetchMocks();

const clientsUrl = "http://localhost";
const usersUrl = "http://localhost";
const sdk = new SDK({ clientsUrl, usersUrl });

describe("Clients", () => {
  const client: Client = {
    id: "bb7edb32-2eac-4aad-aebe-ed96fe073879",
    name: "clientName",
    tags: ["tag1", "tag2"],
    credentials: {
      identity: "clientIdentity",
      secret: "bb7edb32-2eac-4aad-aebe-ed96fe073879",
    },
    metadata: {
      domain: "example.com",
    },
    status: "enabled",
  };
  const clients = [
    { name: "client1", id: "bb7edb32-2eac-4aad-aebe-ed96fe073879" },
    { name: "client2", id: "bb7edb32-2eac-4aad-aebe-ed96fe073879" },
  ];
  const queryParams = {
    offset: 0,
    limit: 10,
  };
  const clientsPage: ClientsPage = {
    clients: [client],
    total: 2,
    offset: 10,
    limit: 0,
  };
  const clientId = "bb7edb32-2eac-4aad-aebe-ed96fe073879";
  const userId = "bb7edb32-2eac-4aad-aebe-ed96fe073879";
  const domainId = "886b4266-77d1-4258-abae-2931fb4f16de";
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NjU3OTMwNjksImlhdCI6";
  const roleName = "editor";
  const actions = ["read", "write"];
  const members = ["user1", "user2"];
  const role = { name: roleName, actions, members };

  beforeEach(() => {
    fetchMock.resetMocks();
  });

  test("Create should create a client and return success", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(client));

    const response = await sdk.clients.CreateClient(client, domainId, token);
    expect(response).toEqual(client);
  });

  test("CreateClients should create multiple clients and return success", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(clients));

    const response = await sdk.clients.CreateClients(clients, domainId, token);
    expect(response).toEqual(clients);
  });

  test("Disable should disable a client and return success", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(client));

    const response = await sdk.clients.Disable(clientId, domainId, token);
    expect(response).toEqual(client);
  });

  test("Enable should enable a client and return success", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(client));

    const response = await sdk.clients.Enable(clientId, domainId, token);
    expect(response).toEqual(client);
  });

  test("UpdateClientSecret should update a client secret and return success", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(client));

    const response = await sdk.clients.UpdateClientSecret(client, domainId, token);
    expect(response).toEqual(client);
  });

  test("UpdateClientTags should update a client tags and return success", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(client));

    const response = await sdk.clients.UpdateClientTags(client, domainId, token);
    expect(response).toEqual(client);
  });

  test("Client should retrieve a client and return success", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(client));

    const response = await sdk.clients.Client(clientId, domainId, token);
    expect(response).toEqual(client);
  });

  test("UpdateClient should update a client and return success", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(client));

    const response = await sdk.clients.UpdateClient(client, domainId, token);
    expect(response).toEqual(client);
  });

  test("Clients should get a list of all clients and return success", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(clientsPage));

    const response = await sdk.clients.Clients(queryParams, domainId, token);
    expect(response).toEqual(clientsPage);
  });

  test("ListUserClients should list clients linked to a client and return success", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(clientsPage));

    const response = await sdk.clients.ListUserClients(
      userId,
      queryParams,
      domainId,
      token,
    );
    expect(response).toEqual(clientsPage);
  });

  test("DeleteClient should delete a client and return success", async () => {
    const deleteResponse = {
      status: 200,
      message: "Client deleted successfully",
    };
    fetchMock.mockResponseOnce(JSON.stringify(deleteResponse));

    const response = await sdk.clients.DeleteClient(clientId, domainId, token);
    expect(response).toEqual(deleteResponse);
  });

  test("ListClientActions should return available actions", async () => {
    const availableActions = ["read", "write", "delete"];
    fetchMock.mockResponseOnce(JSON.stringify(availableActions));

    const response = await sdk.clients.ListClientActions(domainId, token);
    expect(response).toEqual(availableActions);
  });

  test("CreateClientRole should create a new role and return it", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(role));

    const response = await sdk.clients.CreateClientRole(
      clientId,
      roleName,
      domainId,
      token,
      actions,
      members
    );
    expect(response).toEqual(role);
  });

  test("ListClientRoles should return a page of roles", async () => {
    const rolesPage = { roles: [role], total: 1, offset: 0, limit: 10 };
    fetchMock.mockResponseOnce(JSON.stringify(rolesPage));

    const response = await sdk.clients.ListClientRoles(
      clientId,
      domainId,
      { offset: 0, limit: 10 },
      token
    );
    expect(response).toEqual(rolesPage);
  });

  test("ViewClientRole should return details of a specific role", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(role));

    const response = await sdk.clients.ViewClientRole(
      clientId,
      domainId,
      roleName,
      token
    );
    expect(response).toEqual(role);
  });

  test("UpdateClientRole should update a role and return the updated role", async () => {
    const updatedRole = { ...role, actions: [...role.actions, "execute"] };
    fetchMock.mockResponseOnce(JSON.stringify(updatedRole));

    const response = await sdk.clients.UpdateClientRole(
      clientId,
      domainId,
      roleName,
      updatedRole,
      token
    );
    expect(response).toEqual(updatedRole);
  });

  test("DeleteClientRole should delete a role and return success response", async () => {
    const successResponse = {
      status: 200,
      message: "Role deleted successfully",
    };
    fetchMock.mockResponseOnce(JSON.stringify(successResponse));

    const response = await sdk.clients.DeleteClientRole(
      clientId,
      domainId,
      roleName,
      token
    );
    expect(response).toEqual(successResponse);
  });

  test("AddClientRoleActions should add actions to a role and return updated actions", async () => {
    const updatedActions = [...actions, "execute"];
    fetchMock.mockResponseOnce(JSON.stringify(updatedActions));

    const response = await sdk.clients.AddClientRoleActions(
      clientId,
      domainId,
      roleName,
      ["execute"],
      token
    );
    expect(response).toEqual(updatedActions);
  });

  test("ListClientRoleActions should return actions of a specific role", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(actions));

    const response = await sdk.clients.ListClientRoleActions(
      clientId,
      domainId,
      roleName,
      token
    );
    expect(response).toEqual(actions);
  });

  test("DeleteClientRoleActions should remove actions from a role and return success response", async () => {
    const successResponse = {
      status: 200,
      message: "Role actions deleted successfully",
    };
    fetchMock.mockResponseOnce(JSON.stringify(successResponse));

    const response = await sdk.clients.DeleteClientRoleActions(
      clientId,
      domainId,
      roleName,
      ["write"],
      token
    );
    expect(response).toEqual(successResponse);
  });

  test("DeleteAllClientRoleActions should remove all actions from a role and return success response", async () => {
    const successResponse = {
      status: 200,
      message: "Role actions deleted successfully",
    };
    fetchMock.mockResponseOnce(JSON.stringify(successResponse));

    const response = await sdk.clients.DeleteAllClientRoleActions(
      clientId,
      domainId,
      roleName,
      token
    );
    expect(response).toEqual(successResponse);
  });

  test("AddClientRoleMembers should add members to a role and return updated members", async () => {
    const updatedMembers = [...members, "user3"];
    fetchMock.mockResponseOnce(JSON.stringify(updatedMembers));

    const response = await sdk.clients.AddClientRoleMembers(
      clientId,
      domainId,
      roleName,
      ["user3"],
      token
    );
    expect(response).toEqual(updatedMembers);
  });

  test("ListClientRoleMembers should return members of a specific role", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(members));

    const response = await sdk.clients.ListClientRoleMembers(
      clientId,
      domainId,
      roleName,
      { offset: 0, limit: 10 },
      token
    );
    expect(response).toEqual(members);
  });

  test("DeleteClientRoleMembers should remove members from a role and return success response", async () => {
    const successResponse = {
      status: 200,
      message: "Role members deleted successfully",
    };
    fetchMock.mockResponseOnce(JSON.stringify(successResponse));

    const response = await sdk.clients.DeleteClientRoleMembers(
      clientId,
      domainId,
      roleName,
      ["user1"],
      token
    );
    expect(response).toEqual(successResponse);
  });

  test("DeleteAllClientRoleMembers should remove all members from a role and return success response", async () => {
    const successResponse = {
      status: 200,
      message: "Role members deleted successfully",
    };
    fetchMock.mockResponseOnce(JSON.stringify(successResponse));

    const response = await sdk.clients.DeleteAllClientRoleMembers(
      clientId,
      domainId,
      roleName,
      token
    );
    expect(response).toEqual(successResponse);
  });
});
