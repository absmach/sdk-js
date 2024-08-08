import fetchMock, { enableFetchMocks } from 'jest-fetch-mock'

import SDK from '../src/sdk'
import type {
  Domain,
  DomainsPage,
  User,
  UsersPage,
  Relation
} from '../src/sdk'
enableFetchMocks()

const domainsUrl = 'http://localhost'
const sdk = new SDK({ domainsUrl })

describe('Domains', () => {
  const domain: Domain = {
    id: '886b4266-77d1-4258-abae-2931fb4f16de',
    name: 'fkatwigs',
    alias: 'music',
    permission: 'admin',
    status: 'enabled'
  }

  const token = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9'

  const domainId = '886b4266-77d1-4258-abae-2931fb4f16de'

  const permissions = ['admin', 'editor', 'viewer']

  const userId = '886b4266-77d1-4258-abae-2931fb4f16de'

  const userIds = ['886b4266-77d1-4258-abae-2931fb4f16de', '886b4266-77d1-4258-abae-2931fb4f16de']

  const relation: Relation = 'administrator'

  const domainsPage: DomainsPage = {
    domains: [domain],
    total: 1,
    offset: 0,
    limit: 10
  }

  const queryParams = {
    offset: 0,
    limit: 10
  }

  const user: User = {
    id: '886b4266-77d1-4258-abae-2931fb4f16de',
    name: 'fkatwigs',
    tags: ['holy', 'terrain'],
    credentials: {
      identity: 'fkatwigs@email.com',
      secret: '12345678'
    },
    role: 'administrator'
  }

  const usersPage: UsersPage = {
    users: [user],
    total: 1,
    offset: 0,
    limit: 10
  }

  beforeEach(() => {
    fetchMock.resetMocks()
  })

  test('create should create a domain and return success', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(domain))

    const response = await sdk.domains.CreateDomain(domain, token)
    expect(response).toEqual(domain)
  })

  test('domains should return a list of domains and return success', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(domainsPage))

    const response = await sdk.domains.Domains(queryParams, token)
    expect(response).toEqual(domainsPage)
  })

  test('domain should return a domain and return success', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(domain))

    const response = await sdk.domains.Domain(domainId, token)
    expect(response).toEqual(domain)
  })

  test('update should update a domain name and metadata and return success', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(domain))

    const response = await sdk.domains.UpdateDomain(domain, token)
    expect(response).toEqual(domain)
  })

  test('domain permissions should return a list of permissions and return success', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(permissions))

    const response = await sdk.domains.DomainPermissions(domainId, token)
    expect(response).toEqual(permissions)
  })

  test('list user domains should return a list of user domains and return success', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(domainsPage))

    const response = await sdk.domains.ListUserDomains(userId, queryParams, token)
    expect(response).toEqual(domainsPage)
  })

  test('list domain users should return a list of domain users and return success', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(usersPage))

    const response = await sdk.domains.ListDomainUsers(domainId, queryParams, token)
    expect(response).toEqual(usersPage)
  })

  test('enable domain should enable a domain and return success', async () => {
    const enableDomainResponse = {
      status: 200,
      message: 'Domain enabled successfully'
    }
    fetchMock.mockResponseOnce(JSON.stringify(enableDomainResponse))

    const response = await sdk.domains.EnableDomain(domainId, token)
    expect(response).toEqual(enableDomainResponse)
  })

  test('disable domain should disable a domain and return success', async () => {
    const disableDomainResponse = {
      status: 200,
      message: 'Domain disabled successfully'
    }
    fetchMock.mockResponseOnce(JSON.stringify(disableDomainResponse))

    const response = await sdk.domains.DisableDomain(domainId, token)
    expect(response).toEqual(disableDomainResponse)
  })

  test('add user to domain should add a user to a domain and return success', async () => {
    const addUsertoDomainResponse = {
      status: 200,
      message: 'User added successfully'
    }
    fetchMock.mockResponseOnce(JSON.stringify(addUsertoDomainResponse))

    const response = await sdk.domains.AddUsertoDomain(domainId, userIds, relation, token)
    expect(response).toEqual(addUsertoDomainResponse)
  })

  test('remove user from domain should remove a user from a domain and return success', async () => {
    const removeUserfromDomainResponse = {
      status: 200,
      message: 'User removed successfully'
    }
    fetchMock.mockResponseOnce(JSON.stringify(removeUserfromDomainResponse))

    const response = await sdk.domains.RemoveUserfromDomain(domainId, userId, token)
    expect(response).toEqual(removeUserfromDomainResponse)
  })
})
