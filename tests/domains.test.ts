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

  test("create should create a domain and return success", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(domain));

    const response = await sdk.domains.CreateDomain(domain, token);
    expect(response).toEqual(domain);
  });

  test("domains should return a list of domains and return success", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(domainsPage));

    const response = await sdk.domains.Domains(queryParams, token);
    expect(response).toEqual(domainsPage);
  });

  test("domain should return a domain and return success", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(domain));

    const response = await sdk.domains.Domain(domainId, token);
    expect(response).toEqual(domain);
  });

  test("update should update a domain name and metadata and return success", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(domain));

    const response = await sdk.domains.UpdateDomain(domain, token);
    expect(response).toEqual(domain);
  });

  test("list user domains should return a list of user domains and return success", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(domainsPage));

    const response = await sdk.domains.ListUserDomains(
      userId,
      queryParams,
      token,
    );
    expect(response).toEqual(domainsPage);
  });

  test("list domain users should return a list of domain users and return success", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(usersPage));

    const response = await sdk.domains.ListDomainUsers(
      domainId,
      queryParams,
      token,
    );
    expect(response).toEqual(usersPage);
  });

  test("enable domain should enable a domain and return success", async () => {
    const enableDomainResponse = {
      status: 200,
      message: "Domain enabled successfully",
    };
    fetchMock.mockResponseOnce(JSON.stringify(enableDomainResponse));

    const response = await sdk.domains.EnableDomain(domainId, token);
    expect(response).toEqual(enableDomainResponse);
  });

  test("disable domain should disable a domain and return success", async () => {
    const disableDomainResponse = {
      status: 200,
      message: "Domain disabled successfully",
    };
    fetchMock.mockResponseOnce(JSON.stringify(disableDomainResponse));

    const response = await sdk.domains.DisableDomain(domainId, token);
    expect(response).toEqual(disableDomainResponse);
  });

  test("freeze domain should freeze a domain and return success", async () => {
    const freezeDomainResponse = {
      status: 200,
      message: "Domain frozen successfully",
    };

    fetchMock.mockResponseOnce(JSON.stringify(freezeDomainResponse));

    const response = await sdk.domains.FreezeDomain(domainId, token);
    expect(response).toEqual(freezeDomainResponse);
  });
});
