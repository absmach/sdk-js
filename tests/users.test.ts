import fetchMock, { enableFetchMocks } from 'jest-fetch-mock'

import SDK from '../src/sdk'
import type {
  User,
  UsersPage,
  Login,
  Group,
  GroupsPage,
  Thing,
  ThingsPage,
  Channel,
  ChannelsPage
} from '../src/sdk'
enableFetchMocks()

const usersURL = 'http://localhost'
const sdk = new SDK({ usersUrl: usersURL })

describe('Users', () => {
  const user: User = {
    id: '886b4266-77d1-4258-abae-2931fb4f16de',
    name: 'fkatwigs',
    tags: ['holy', 'terrain'],
    credentials: {
      identity: 'fkatwigs@email.com',
      secret: '12345678'
    },
    role: 'administrator',
    created_at: '2023-09-07T13:17:27.880558Z',
    updated_at: '2023-09-12T13:38:23.86436Z',
    status: 'enabled'
  }

  const UsersPage: UsersPage = {
    users: [user],
    total: 1,
    offset: 0,
    limit: 10
  }

  const login: Login = {
    identity: 'twigs@email.com',
    secret: '12345678',
    domain_id: '886b4266-77d1-4258-abae-2931fb4f16de'
  }

  const token = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9'

  const queryParams = {
    offset: 0,
    limit: 10
  }

  const userId = '886b4266-77d1-4258-abae-2931fb4f16de'

  const group: Group = {
    id: '886b4266-77d1-4258-abae-2931fb4f16de',
    domain_id: '886b4266-77d1-4258-abae-2931fb4f16de',
    parent_id: '886b4266-77d1-4258-abae-2931fb4f16de',
    name: 'fkatwigs',
    description: 'holy terrain',
    level: 1,
    path: 'holy terrain',
    status: 'enabled',
    created_at: '2023-09-07T13:17:27.880558Z',
    updated_at: '2023-09-12T13:38:23.86436Z'
  }

  const GroupsPage: GroupsPage = {
    groups: [group],
    total: 1,
    offset: 0,
    limit: 10
  }

  const thing: Thing = {
    id: '886b4266-77d1-4258-abae-2931fb4f16de',
    name: 'fkatwigs',
    domain_id: '886b4266-77d1-4258-abae-2931fb4f16de'
  }

  const ThingsPage: ThingsPage = {
    things: [thing],
    total: 1,
    offset: 0,
    limit: 10
  }

  const channel: Channel = {
    id: '886b4266-77d1-4258-abae-2931fb4f16de',
    name: 'fkatwigs',
    domain_id: '886b4266-77d1-4258-abae-2931fb4f16de'
  }

  const ChannelsPage: ChannelsPage = {
    channels: [channel],
    total: 1,
    offset: 0,
    limit: 10
  }

  const email = 'admin@gmail.com'

  const password = '12345678'
  const confPass = '12345678'

  const invalidToken = ''

  beforeEach(() => {
    fetchMock.resetMocks()
  })

  test(' create a user and return success', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(user))

    const response = await sdk.users.Create(user)
    expect(response).toEqual(user)
  })

  test('create token should create a token for a user and return success', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(login))

    const response = await sdk.users.CreateToken(login)
    expect(response).toEqual(login)
  })

  test('create token should return error', async () => {
    const errorResponse = {
      status: 404,
      error: 'A non-existent request.'
    }
    fetchMock.mockResponseOnce(JSON.stringify(errorResponse), { status: 404 })
    console.log('errorResponse', errorResponse)

    try {
      await sdk.users.CreateToken(login)
    } catch (error) {
      if (Boolean(error) && typeof error === 'object') {
        const typedError = error as { status: number, error: string }
        expect(typedError.status).toEqual(errorResponse.status)
        expect(typedError.error).toEqual(errorResponse.error)
      }
      console.log('typedError', error)
    }
  })

  test('create token should fail and return a non-existent entity error', async () => {
    const errorResponse = {
      status: 404,
      error: 'A non-existent entity request.'
    }
    fetchMock.mockResponseOnce(JSON.stringify({ error: errorResponse.error }), { status: 404 })
    console.log('errorResponse', errorResponse)

    try {
      await sdk.users.CreateToken(login)
      expect(true).toBe(false)
    } catch (error) {
      expect(error).toEqual(errorResponse)
      console.log('error', error)
    }
  })

  test('create token should fail and return a processing error', async () => {
    const errorResponse = {
      status: 422,
      message: "Database can't process request."
    }
    fetchMock.mockResponseOnce(JSON.stringify({ error: errorResponse.message }), { status: 422 })

    try {
      await sdk.users.CreateToken(login)
      expect(true).toBe(false)
    } catch (error) {
      expect(error).toEqual(expect.objectContaining({
        status: 422,
        error: errorResponse.message
      }))
    }
  })

  test('create token should fail and return a server side error', async () => {
    const errorResponse = {
      status: 500,
      message: 'Unexpected server-side error occurred.'
    }
    fetchMock.mockResponseOnce(JSON.stringify({ error: errorResponse.message }), { status: 500 })
    console.log('errorResponse', errorResponse.message)

    try {
      const response = await sdk.users.CreateToken(login)
      console.log('response', response)
      expect(true).toBe(false)
    } catch (error) {
      console.log('error', error)
      expect(error).toEqual(expect.objectContaining({
        status: 500,
        error: errorResponse.message
      }))
    }
  })

  test("refresh token should refresh a user's token and return success", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(login))

    const response = await sdk.users.RefreshToken(login, token)
    expect(response).toEqual(login)
  })

  test('user should return alist of users and return success', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(UsersPage))

    const response = await sdk.users.Users(queryParams, token)
    expect(response).toEqual(UsersPage)
  })

  test('update should update a user metadata and return success', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(user))

    const response = await sdk.users.Update(user, token)
    expect(response).toEqual(user)
  })

  test('update user identity should update a user identity and return success', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(user))

    const response = await sdk.users.UpdateUserIdentity(user, token)
    expect(response).toEqual(user)
  })

  test('update user tags should update a user tags and return success', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(user))

    const response = await sdk.users.UpdateUserTags(user, token)
    expect(response).toEqual(user)
  })

  test('update user role should update a user role and return success', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(user))

    const response = await sdk.users.UpdateUserRole(user, token)
    expect(response).toEqual(user)
  })

  test('get user should get a user and return success', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(user))

    const response = await sdk.users.User(userId, token)
    expect(response).toEqual(user)
  })

  test('get user should be able to handle a conflict', async () => {
    const invalidResponse = {
      status: 401,
      error: 'Missing  invalid token provided'
    }
    fetchMock.mockResponseOnce(JSON.stringify(invalidResponse))
    const response = await sdk.users.User(userId, invalidToken)
    console.log('response', response)
    expect(response).toEqual(invalidResponse)
  })

  test('user profile should return a user profile and return success', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(user))

    const response = await sdk.users.UserProfile(token)
    expect(response).toEqual(user)
  })

  test('disable user should disable a user and return success', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(user))

    const response = await sdk.users.Disable(user, token)
    expect(response).toEqual(user)
  })

  test('enable user should enable a user and return success', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(user))

    const response = await sdk.users.Enable(user, token)
    expect(response).toEqual(user)
  })

  test('list user groups should return a list of groups associated with a user and return success', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(GroupsPage))

    const response = await sdk.users.ListUserGroups(userId, queryParams, token)
    expect(response).toEqual(GroupsPage)
  })

  test('list user things should return a list of things associated with a user and return success', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(ThingsPage))

    const response = await sdk.users.ListUserThings(userId, queryParams, token)
    expect(response).toEqual(ThingsPage)
  })

  test('list user channels should return a list of channels associated with a user and return success', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(ChannelsPage))

    const response = await sdk.users.ListUserChannels(userId, queryParams, token)
    expect(response).toEqual(ChannelsPage)
  })

  test('reset user password request should send a password reset request and return success', async () => {
    const resetPasswordRequestResponse = {
      status: 200,
      message: 'Email with reset link sent successfully'
    }
    fetchMock.mockResponseOnce(JSON.stringify(resetPasswordRequestResponse))

    const response = await sdk.users.ResetPasswordRequest(email)
    expect(response).toEqual(resetPasswordRequestResponse)
  })

  test('reset user password should reset a user password and return success', async () => {
    const resetPasswordResponse = {
      status: 200,
      message: 'Password reset successfully'
    }
    fetchMock.mockResponseOnce(JSON.stringify(resetPasswordResponse))

    const response = await sdk.users.ResetPassword(password, confPass, token)
    expect(response).toEqual(resetPasswordResponse)
  })
})
