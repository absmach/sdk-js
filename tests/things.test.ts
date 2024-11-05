import fetchMock, { enableFetchMocks } from 'jest-fetch-mock'

import SDK from '../src/sdk'
import type {
  Thing,
  ThingsPage,
  UsersPage,
  User
} from '../src/sdk'
enableFetchMocks()

const thingsUrl = 'http://localhost'
const usersUrl = 'http://localhost'
const sdk = new SDK({ thingsUrl, usersUrl })

describe('Things', () => {
  const thing: Thing = {
    id: 'bb7edb32-2eac-4aad-aebe-ed96fe073879',
    name: 'thingName',
    tags: [
      'tag1',
      'tag2'
    ],
    credentials: {
      identity: 'thingidentity',
      secret: 'bb7edb32-2eac-4aad-aebe-ed96fe073879'
    },
    metadata: {
      domain: 'example.com'
    },
    status: 'enabled'
  }
  const user: User = {
    id: '886b4266-77d1-4258-abae-2931fb4f16de',
    first_name: 'tahliah',
    last_name: 'barnett',
    tags: ['holy', 'terrain'],
    email: 'fkatwigs@email.com',
    credentials: {
      username: 'fkatwigs@email.com',
      secret: '12345678'
    },
    role: 'administrator',
    status: 'enabled'
  }
  const things = [
    { name: 'thing1', id: 'bb7edb32-2eac-4aad-aebe-ed96fe073879' },
    { name: 'thing2', id: 'bb7edb32-2eac-4aad-aebe-ed96fe073879' }
  ]
  const queryParams = {
    offset: 0,
    limit: 10
  }
  const usersPage: UsersPage = {
    users: [user],
    total: 2,
    offset: 0,
    limit: 10
  }
  const thingsPage: ThingsPage = {
    things: [thing],
    total: 2,
    offset: 10,
    limit: 0
  }
  const thingId = 'bb7edb32-2eac-4aad-aebe-ed96fe073879'
  const channelId = 'bb7edb32-2eac-4aad-aebe-ed96fe073879'
  const permissions = 'admin'
  const relation = 'administrator'
  const userIds = ['b9921574-f562-4048-a6bf-295c0036fc2a', 'ce42d80e-9773-49b2-a8c2-6aa748597a92']
  const domainId = '886b4266-77d1-4258-abae-2931fb4f16de'
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NjU3OTMwNjksImlhdCI6'

  beforeEach(() => {
    fetchMock.resetMocks()
  })

  test('Create should create a thing and return success', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(thing))

    const response = await sdk.things.Create(thing, domainId, token)
    expect(response).toEqual(thing)
  })

  test('CreateThings should create multiple things and return success', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(things))

    const response = await sdk.things.CreateThings(things, domainId, token)
    expect(response).toEqual(things)
  })

  test('Disable should update a thing and return success', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(thing))

    const response = await sdk.things.Disable(thingId, domainId, token)
    expect(response).toEqual(thing)
  })

  test('Enable should update a thing and return success', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(thing))

    const response = await sdk.things.Enable(thingId, domainId, token)
    expect(response).toEqual(thing)
  })

  test('UpdateThingSecret should update a thing secret and return success', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(thing))

    const response = await sdk.things.UpdateThingSecret(thing, domainId, token)
    expect(response).toEqual(thing)
  })

  test('UpdateThingTags should update a thing tags and return success', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(thing))

    const response = await sdk.things.UpdateThingTags(thing, domainId, token)
    expect(response).toEqual(thing)
  })

  test('Thing should retrieve a thing and return success', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(thing))

    const response = await sdk.things.Thing(thingId, domainId, token)
    expect(response).toEqual(thing)
  })

  test('UpdateThing should update a thing and return success', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(thing))

    const response = await sdk.things.UpdateThing(thing, domainId, token)
    expect(response).toEqual(thing)
  })

  test('ThingsByChannel should return a list of channels connected to a specific thing and return success', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(thing))

    const response = await sdk.things.ThingsByChannel(channelId, queryParams, domainId, token)
    expect(response).toEqual(thing)
  })

  test('ThingsPermissions should update a thing secret and return success', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(permissions))

    const response = await sdk.things.ThingsPermissions(thingId, domainId, token)
    expect(response).toEqual(permissions)
  })

  test('Things should get a list of all things and return success', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(thingsPage))

    const response = await sdk.things.Things(queryParams, domainId, token)
    expect(response).toEqual(thingsPage)
  })

  test('ListThingUsers should list users linked to a thing and return success', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(usersPage))

    const response = await sdk.things.ListThingUsers(thingId, queryParams, domainId, token)
    expect(response).toEqual(usersPage)
  })

  test('ShareThing should share a thing and return success', async () => {
    const shareResponse = {
      status: 200,
      message: 'Thing shared successfully'
    }
    fetchMock.mockResponseOnce(JSON.stringify(shareResponse))

    const response = await sdk.things.ShareThing(thingId, relation, userIds, domainId, token)
    expect(response).toEqual(shareResponse)
  })

  test('UnShareThing should unshare a thing and return success', async () => {
    const unshareResponse = {
      status: 200,
      message: 'Thing unShared successfully'
    }
    fetchMock.mockResponseOnce(JSON.stringify(unshareResponse))

    const response = await sdk.things.UnShareThing(thingId, relation, userIds, domainId, token)
    expect(response).toEqual(unshareResponse)
  })

  test('DeleteThing should delete a thing and return success', async () => {
    const deleteResponse = {
      status: 200,
      message: 'Thing deleted successfully'
    }
    fetchMock.mockResponseOnce(JSON.stringify(deleteResponse))

    const response = await sdk.things.DeleteThing(thingId, domainId, token)
    expect(response).toEqual(deleteResponse)
  })
})
