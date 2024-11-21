import fetchMock, { enableFetchMocks } from "jest-fetch-mock";

import SDK from "../src/sdk";
import type {
  Client, ClientsPage, UsersPage, User,
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
  const clients = [
    { name: "client1", id: "bb7edb32-2eac-4aad-aebe-ed96fe073879" },
    { name: "client2", id: "bb7edb32-2eac-4aad-aebe-ed96fe073879" },
  ];
  const queryParams = {
    offset: 0,
    limit: 10,
  };
  const usersPage: UsersPage = {
    users: [user],
    total: 2,
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

  test("ListUserClients should list users linked to a client and return success", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(usersPage));

    const response = await sdk.clients.ListUserClients(
      userId,
      queryParams,
      domainId,
      token,
    );
    expect(response).toEqual(usersPage);
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
});
