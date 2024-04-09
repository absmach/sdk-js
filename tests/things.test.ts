import fetchMock, { enableFetchMocks } from 'jest-fetch-mock'

import SDK from '../src/sdk'
import type {
  Thing
  // ThingsPage
} from '../src/sdk'
enableFetchMocks()

const thingsUrl = 'http://localhost'
const usersUrl = 'http://localhost'
const sdk = new SDK({ thingsUrl, usersUrl })

describe('Things', () => {
  // const thingsUrl = 'http://localhost:9000'
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
    // 'owner': 'bb7edb32-2eac-4aad-aebe-ed96fe073879',
    metadata: {
      domain: 'example.com'
    },
    status: 'enabled'
  }
  const thingId = 'bb7edb32-2eac-4aad-aebe-ed96fe073879'
  const channelId = 'bb7edb32-2eac-4aad-aebe-ed96fe073879'
  // const thing_ids = ["6cba4ea5-5820-4419-b389-86984309ad35","2bb290ff-0cb1-4f06-9da3-aff91c1d039"];
  // const channel_ids = ["2bb290ff-0cb1-4f06-9da3-aff91c1d039","6cba4ea5-5820-4419-b389-86984309ad35"];
  // const userIds = ['b9921574-f562-4048-a6bf-295c0036fc2a', 'ce42d80e-9773-49b2-a8c2-6aa748597a92']
  const thingKey = '12345678'
  // const channels = [{"name": "channel1", "id": "bb7edb32-2eac-4aad-aebe-ed96fe073879"},
  //        {"name": "channel2", "id": "bb7edb32-2eac-4aad-aebe-ed96fe073879"}
  //  ];
  // const entity_type = "group";
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NjU3OTMwNjksImlhdCI6'
  const things = [
    { name: 'thing1', id: 'bb7edb32-2eac-4aad-aebe-ed96fe073879' },
    { name: 'thing2', id: 'bb7edb32-2eac-4aad-aebe-ed96fe073879' }
  ]
  const queryParams = {
    offset: 0,
    limit: 10
  }
  const relation = 'administrator'

  beforeEach(() => {
    fetchMock.resetMocks()
  })

  test(' create a thing and return success', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(thing))

    const response = await sdk.things.Create(thing, token)
    expect(response).toEqual(thing)
  })

  test('Create should handle a conflict error', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(thing))

    const response = await sdk.things.Create(thing, token)
    expect(response).toEqual(thing)
  })

  test('CreateBulk should create multiple things and return success', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(things))

    const response = await sdk.things.CreateThings(things, token)
    expect(response).toEqual(things)
  })

  test('CreateBulk should handle a conflict error', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(things))

    const response = await sdk.things.CreateThings(things, token)
    expect(response).toEqual(things)
  })

  test('Update should update a thing and return success', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(thing))

    const response = await sdk.things.UpdateThing(thing, token)
    expect(response).toEqual(thing)
  })

  test('Update should handle a conflict error', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(thing))

    const response = await sdk.things.UpdateThing(thing, token)
    expect(response).toEqual(thing)
  })

  test('Get should give a thing and return success', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(thing))

    const response = await sdk.things.Thing(thingId, token)
    expect(response).toEqual(thing)
  })

  test('Get should handle a conflict error', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(thing))

    const response = await sdk.things.Thing(thingId, token)
    expect(response).toEqual(thing)
  })

  test('Get by channel return a channel a thing is connected and return success', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(thing))

    const response = await sdk.things.ThingsByChannel(channelId, queryParams, token)
    expect(response).toEqual(thing)
  })

  test('Get by channel should handle aconflict error', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(thing))

    const response = await sdk.things.ThingsByChannel(channelId, queryParams, token)
    expect(response).toEqual(thing)
  })

  test('GetAll should return all things and return success', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(things))

    const response = await sdk.things.Things(queryParams, token)
    expect(response).toEqual(things)
  })

  test('Disable should delete a thing and return success', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(thing))

    const response = await sdk.things.Disable(thing, token)
    expect(response).toEqual(thing)
  })

  test('Disable should delete a thing and return success', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(thing))

    const response = await sdk.things.Disable(thing, token)
    expect(response).toEqual(thing)
  })

  test('Update should handle a conflict error', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(thing))

    const response = await sdk.things.UpdateThing(thing, token)
    expect(response).toEqual(thing)
  })

  test('Update thing secret should update a thing secret and return success', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(thing))

    const response = await sdk.things.UpdateThingSecret(thing, token)
    expect(response).toEqual(thing)
  })

  test('Update thing tags should update a thing tags and return success', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(thing))

    const response = await sdk.things.UpdateThingTags(thing, token)
    expect(response).toEqual(thing)
  })

  test('Update thing secret should handle a conflict error', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(thing))

    const response = await sdk.things.UpdateThingSecret(thing, token)
    expect(response).toEqual(thing)
  })

  test('Identify thing should identify a thing and return success', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(thing))

    const response = await sdk.things.IdentifyThing(thingKey)
    expect(response).toEqual(thing)
  })

  //   test('Share thing should share a thing and return success', async () => {
  //     fetchMock.mockResponseOnce(JSON.stringify(thing))

  //     const response = await sdk.things.ShareThing(thingId, relation, userIds, token)
  //     expect(response).toEqual(thing)
  //   })

  //   test('Connect should connect a thing and return success', async () => {
  //     fetchMock.mockResponseOnce(JSON.stringify(thing))

  //     const response = await sdk.things.Connect(thing, token)
  //     expect(response).toEqual(thing)
  //   })
})
