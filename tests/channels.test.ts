import fetchMock, { enableFetchMocks } from 'jest-fetch-mock'

import SDK from '../src/sdk'
import type {
  Channel,
  GroupsPage,
  UsersPage,
  User,
  ChannelsPage,
  Group
} from '../src/sdk'
enableFetchMocks()

const thingsUrl = 'http://localhost'
const usersUrl = 'http://localhost'
const sdk = new SDK({ thingsUrl, usersUrl })

describe('Channels', () => {
  const channel: Channel = {
    id: 'bb7edb32-2eac-4aad-aebe-ed96fe073879',
    name: 'channelName',
    domain_id: 'bb7edb32-2eac-4aad-aebe-ed96fe073879',
    description: ''
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
  const group: Group = {
    id: 'bb7edb32-2eac-4aad-aebe-ed96fe073879',
    domain_id: 'bb7edb32-2eac-4aad-aebe-ed96fe073879',
    parent_id: 'bb7edb32-2eac-4aad-aebe-ed96fe073879',
    name: 'groupName',
    description: '',
    level: 1,
    path: '',
    status: 'enabled'
  }
  const queryParams = {
    offset: 0,
    limit: 10
  }
  const groupsPage: GroupsPage = {
    groups: [group],
    total: 2,
    offset: 0,
    limit: 10
  }

  const usersPage: UsersPage = {
    users: [user],
    total: 2,
    offset: 0,
    limit: 10
  }
  const channelsPage: ChannelsPage = {
    channels: [channel],
    total: 2,
    offset: 10,
    limit: 0
  }
  const channelId = '290b0f49-7a57-4b8c-9e4e-fbf17c6ab7d9'
  const thingId = 'bb7edb32-2eac-4aad-aebe-ed96fe073879'
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NjU3OTMwNjksImlhdCI6'
  const userIds = ['b9921574-f562-4048-a6bf-295c0036fc2a', 'ce42d80e-9773-49b2-a8c2-6aa748597a92']
  const userGroupIds = ['b9921574-f562-4048-a6bf-295c0036fc2a', 'ce42d80e-9773-49b2-a8c2-6aa748597a92']
  const permissions = 'admin'
  const relation = 'administrator'

  beforeEach(() => {
    fetchMock.resetMocks()
  })

  test('Channel should retrieve a channel and return success', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(channel))

    const response = await sdk.channels.Channel(channelId, token)
    expect(response).toEqual(channel)
  })

  test('CreateChannel should create a channel and return success', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(channel))

    const response = await sdk.channels.CreateChannel(channel, token)
    expect(response).toEqual(channel)
  })

  test('UpdateChannel should retrieve a channel and return success', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(channel))

    const response = await sdk.channels.UpdateChannel(channel, token)
    expect(response).toEqual(channel)
  })

  test('Enable should enable a channel and return success', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(channel))

    const response = await sdk.channels.Enable(channel, token)
    expect(response).toEqual(channel)
  })

  test('Disable should disable a channel and return success', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(channel))

    const response = await sdk.channels.Disable(channel, token)
    expect(response).toEqual(channel)
  })

  test('Delete should delete a channel and return success', async () => {
    const deleteResponse = {
      status: 200,
      message: 'Channel Deleted'
    }
    fetchMock.mockResponseOnce(JSON.stringify(deleteResponse))

    const response = await sdk.channels.Delete(channel, token)
    expect(response).toEqual(deleteResponse)
  })

  test('ConnectThing should connect a thing to a channel and return success', async () => {
    const connectThingResponse = {
      status: 200,
      message: 'Thing Connected Successfully'
    }
    fetchMock.mockResponseOnce(JSON.stringify(connectThingResponse))

    const response = await sdk.channels.ConnectThing(thingId, channelId, token)
    expect(response).toEqual(connectThingResponse)
  })

  test('DisconnectThing should Disconnect a thing from a channel and return success', async () => {
    const DisconnectThingResponse = {
      status: 200,
      message: 'Thing Disconnected Successfully'
    }
    fetchMock.mockResponseOnce(JSON.stringify(DisconnectThingResponse))

    const response = await sdk.channels.DisconnectThing(thingId, channelId, token)
    expect(response).toEqual(DisconnectThingResponse)
  })

  test('Connect should connect a thing to a channel and return success', async () => {
    const connectResponse = {
      status: 200,
      message: 'Thing Connected Successfully'
    }
    fetchMock.mockResponseOnce(JSON.stringify(connectResponse))

    const response = await sdk.channels.Connect(thingId, channelId, token)
    expect(response).toEqual(connectResponse)
  })

  test('Disconnect should Disconnect a thing to a channel and return success', async () => {
    const DisconnectResponse = {
      status: 200,
      message: 'Thing Disconnected Successfully'
    }
    fetchMock.mockResponseOnce(JSON.stringify(DisconnectResponse))

    const response = await sdk.channels.Disconnect(thingId, channelId, token)
    expect(response).toEqual(DisconnectResponse)
  })

  test('ListChannelUsers should list users in a channel and return success', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(usersPage))

    const response = await sdk.channels.ListChannelUsers(channelId, queryParams, token)
    expect(response).toEqual(usersPage)
  })

  test('AddUserToChannel should add users to a channel and return success', async () => {
    const addUserResponse = {
      status: 200,
      message: 'User Added Successfully'
    }
    fetchMock.mockResponseOnce(JSON.stringify(addUserResponse))

    const response = await sdk.channels.AddUserToChannel(channelId, userIds, relation, token)
    expect(response).toEqual(addUserResponse)
  })

  test('RemoveUserFromChannel should remove a user from a channel and return success', async () => {
    const removeUserResponse = {
      status: 200,
      message: 'User Removed Successfully'
    }
    fetchMock.mockResponseOnce(JSON.stringify(removeUserResponse))

    const response = await sdk.channels.RemoveUserFromChannel(channelId, userIds, relation, token)
    expect(response).toEqual(removeUserResponse)
  })

  test('Channels should return alist of channels and return success', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(channelsPage))

    const response = await sdk.users.Users(queryParams, token)
    expect(response).toEqual(channelsPage)
  })

  test('ChannelsByThing should retrieve things a channel is connected to and return success', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(channelsPage))

    const response = await sdk.channels.ChannelsByThing(channelId, queryParams, token)
    expect(response).toEqual(channelsPage)
  })

  test('ChannelPermissions should retrieve channel permissions and return success', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(permissions))

    const response = await sdk.channels.ChannelPermissions(channelId, token)
    expect(response).toEqual(permissions)
  })

  test('ListChannelUsersGroups list user groups in a channel and return success', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(groupsPage))

    const response = await sdk.channels.ListChannelUsersGroups(channelId, queryParams, token)
    expect(response).toEqual(groupsPage)
  })

  test('AddUserGroupToChannel should add a user group to a channel and return success', async () => {
    const addUserGroupResponse = {
      status: 200,
      message: 'User Group Added Successfully'
    }
    fetchMock.mockResponseOnce(JSON.stringify(addUserGroupResponse))

    const response = await sdk.channels.AddUserGroupToChannel(channelId, userGroupIds, token)
    expect(response).toEqual(addUserGroupResponse)
  })

  test('RemoveUserGroupFromChannel should remove a user group from a channel and return success', async () => {
    const removeUserGroupResponse = {
      status: 200,
      message: 'User Group Removed Successfully'
    }
    fetchMock.mockResponseOnce(JSON.stringify(removeUserGroupResponse))

    const response = await sdk.channels.RemoveUserGroupFromChannel(channelId, userGroupIds, token)
    expect(response).toEqual(removeUserGroupResponse)
  })
})
