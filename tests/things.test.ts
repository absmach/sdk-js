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
    name: 'userName',
    id: 'bb7edb32-2eac-4aad-aebe-ed96fe073879',
    credentials: {
      identity: 'useridentity'
    },
    metadata: {
      domain: 'example.com'
    },
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
  const thingKey = '12345678'
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NjU3OTMwNjksImlhdCI6'

  beforeEach(() => {
    fetchMock.resetMocks()
  })

  test('Create should create a thing and return success', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(thing))

    const response = await sdk.things.Create(thing, token)
    expect(response).toEqual(thing)
  })

  test('CreateThings should create multiple things and return success', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(things))

    const response = await sdk.things.CreateThings(things, token)
    expect(response).toEqual(things)
  })

  test('Disable should update a thing and return success', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(thing))

    const response = await sdk.things.Disable(thing, token)
    expect(response).toEqual(thing)
  })

  test('Enable should update a thing and return success', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(thing))

    const response = await sdk.things.Enable(thing, token)
    expect(response).toEqual(thing)
  })

  test('UpdateThingSecret should update a thing secret and return success', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(thing))

    const response = await sdk.things.UpdateThingSecret(thing, token)
    expect(response).toEqual(thing)
  })

  test('UpdateThingTags should update a thing tags and return success', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(thing))

    const response = await sdk.things.UpdateThingTags(thing, token)
    expect(response).toEqual(thing)
  })

  test('Thing should retrieve a thing and return success', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(thing))

    const response = await sdk.things.Thing(thingId, token)
    expect(response).toEqual(thing)
  })

  test('UpdateThing should update a thing and return success', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(thing))

    const response = await sdk.things.UpdateThing(thing, token)
    expect(response).toEqual(thing)
  })

  test('ThingsByChannel should return a list of channels connected to a specific thing and return success', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(thing))

    const response = await sdk.things.ThingsByChannel(channelId, queryParams, token)
    expect(response).toEqual(thing)
  })

  test('IdentifyThing should identify a thing and a return success', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(thing))

    const response = await sdk.things.IdentifyThing(thingKey)
    expect(response).toEqual(thing)
  })

  test('ThingsPermissions should update a thing secret and return success', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(permissions))

    const response = await sdk.things.ThingsPermissions(thingId, token)
    expect(response).toEqual(permissions)
  })

  test('Things should get a list of all things and return success', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(thingsPage))

    const response = await sdk.things.Things(queryParams, token)
    expect(response).toEqual(thingsPage)
  })

  test('ListThingUsers should list users linked to a thing and return success', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(usersPage))

    const response = await sdk.things.ListThingUsers(thingId, queryParams, token)
    expect(response).toEqual(usersPage)
  })

  test('ShareThing should share a thing and return success', async () => {
    const shareResponse = {
      status: 200,
      message: 'Thing shared successfully'
    }
    fetchMock.mockResponseOnce(JSON.stringify(shareResponse))

    const response = await sdk.things.ShareThing(thingId, relation, userIds, token)
    expect(response).toEqual(shareResponse)
  })

  test('UnShareThing should unshare a thing and return success', async () => {
    const unshareResponse = {
      status: 200,
      message: 'Thing unShared successfully'
    }
    fetchMock.mockResponseOnce(JSON.stringify(unshareResponse))

    const response = await sdk.things.UnShareThing(thingId, relation, userIds, token)
    expect(response).toEqual(unshareResponse)
  })

  test('DeleteThing should delete a thing and return success', async () => {
    const deleteResponse = {
      status: 200,
      message: 'Thing deleted successfully'
    }
    fetchMock.mockResponseOnce(JSON.stringify(deleteResponse))

    const response = await sdk.things.DeleteThing(thing, token)
    expect(response).toEqual(deleteResponse)
  })
})
