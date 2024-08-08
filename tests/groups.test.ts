import fetchMock, { enableFetchMocks } from 'jest-fetch-mock'

import SDK from '../src/sdk'
import type {
  Group,
  GroupsPage,
  Relation,
  User,
  UsersPage,
  Channel
} from '../src/sdk'
enableFetchMocks()

const usersUrl = 'http://localhost'
const sdk = new SDK({ usersUrl })

describe('Groups', () => {
  const group: Group = {
    id: '886b4266-77d1-4258-abae-2931fb4f16de',
    domain_id: '886b4266-77d1-4258-abae-2931fb4f16de',
    parent_id: '886b4266-77d1-4258-abae-2931fb4f16de',
    name: 'fkatwigs',
    description: 'holy terrain',
    level: 1,
    path: 'holy terrain',
    status: 'enabled'
  }

  const token = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9'

  const groupId = '886b4266-77d1-4258-abae-2931fb4f16de'

  const groupsPage: GroupsPage = {
    groups: [group],
    total: 1,
    offset: 0,
    limit: 10
  }

  const queryParams = {
    offset: 0,
    limit: 10
  }

  const permissions = ['m_read', 'm_write']

  const userIds = ['886b4266-77d1-4258-abae-2931fb4f16de', '886b4266-77d1-4258-abae-2931fb4f16de']

  const relation: Relation = 'administrator'

  const user: User = {
    id: '886b4266-77d1-4258-abae-2931fb4f16de',
    name: 'fkatwigs',
    tags: ['holy', 'terrain'],
    credentials: {
      identity: 'fkatwigs@email.com',
      secret: '12345678'
    },
    role: 'administrator',
    status: 'enabled'
  }

  const usersPage: UsersPage = {
    users: [user],
    total: 1,
    offset: 0,
    limit: 10
  }

  const channel: Channel = {
    id: '886b4266-77d1-4258-abae-2931fb4f16de',
    name: 'fkatwigs',
    domain_id: '886b4266-77d1-4258-abae-2931fb4f16de'
  }

  const channelsPage = {
    channels: [channel],
    total: 1,
    offset: 0
  }

  beforeEach(() => {
    fetchMock.resetMocks()
  })

  test('create group should create a group and return success', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(group))

    const response = await sdk.groups.CreateGroup(group, token)
    expect(response).toEqual(group)
  })

  test('group should get a group and return success', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(group))

    const response = await sdk.groups.Group(groupId, token)
    expect(response).toEqual(group)
  })

  test('groups should get all groups and return success', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(groupsPage))

    const response = await sdk.groups.Groups(queryParams, token)
    expect(response).toEqual(groupsPage)
  })

  test('group permissions should get a groups permissions and return success', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(permissions))

    const response = await sdk.groups.GroupPermissions(groupId, token)
    expect(response).toEqual(permissions)
  })

  test('update group should update a groups name and metadata and return sucess', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(group))

    const response = await sdk.groups.UpdateGroup(group, token)
    expect(response).toEqual(group)
  })

  test('enable group should enable a group and return success', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(group))

    const response = await sdk.groups.EnableGroup(groupId, token)
    expect(response).toEqual(group)
  })

  test('disable group should disable a group and return success', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(group))

    const response = await sdk.groups.DisableGroup(groupId, token)
    expect(response).toEqual(group)
  })

  test('delete group should delete a group and return success', async () => {
    const deleteGroupResponse = {
      status: 200,
      message: 'Group deleted successfully'
    }
    fetchMock.mockResponseOnce(JSON.stringify(deleteGroupResponse))

    const response = await sdk.groups.DeleteGroup(groupId, token)
    expect(response).toEqual(deleteGroupResponse)
  })

  test('add user to group should add a user to a group and return success', async () => {
    const addUserResponse = {
      status: 200,
      message: 'User added successfully'
    }
    fetchMock.mockResponseOnce(JSON.stringify(addUserResponse))

    const response = await sdk.groups.AddUserToGroup(groupId, userIds, relation, token)
    expect(response).toEqual(addUserResponse)
  })

  test('remove user from group should remove a user from a group and return success', async () => {
    const removeUserResponse = {
      status: 200,
      message: 'User removed successfully'
    }
    fetchMock.mockResponseOnce(JSON.stringify(removeUserResponse))

    const response = await sdk.groups.RemoveUserFromGroup(groupId, userIds, relation, token)
    expect(response).toEqual(removeUserResponse)
  })

  test('group users should get all users in a group and return success', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(usersPage))

    const response = await sdk.groups.ListGroupUsers(groupId, queryParams, token)
    expect(response).toEqual(usersPage)
  })

  test('list group channels should get all the channels in a group and return success', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(channelsPage))

    const response = await sdk.groups.ListGroupChannels(groupId, queryParams, token)
    expect(response).toEqual(channelsPage)
  })

  test('parents should get all of a groups parents and return success', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(groupsPage))

    const response = await sdk.groups.Parents(groupId, queryParams, token)
    expect(response).toEqual(groupsPage)
  })

  test('children should get all of a groups children and return success', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(groupsPage))

    const response = await sdk.groups.Children(groupId, queryParams, token)
    expect(response).toEqual(groupsPage)
  })
})
