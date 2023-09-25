const axios = require('axios');
const mfsdk = require("mainflux-sdk");

jest.mock('axios');

describe('Users', () => {
  const users_url = 'http://localhost';
  const user = {
    id: '886b4266-77d1-4258-abae-2931fb4f16de',
    name: 'fkatwigs',
    tags: ['holy', 'terrain'],
    owner: 'natra@email.com',
    credentials: {
      identity: 'fkatwigs@email.com',
      secret: '12345678'
    },
    created_at: '2023-09-07T13:17:27.880558Z',
    updated_at: '2023-09-12T13:38:23.86436Z',
    updated_by: 'a725e26d-dc1f-4452-80dc-41fc654aa38b',
    status: 'enabled'
  };
  const user_id = '886b4266-77d1-4258-abae-2931fb4f16de';
  const token = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9';
  const old_secret = '12345678';
  const new_secret = '87654321';
  const payload = {
    old_secret: old_secret,
    new_secret: new_secret
  };
  const access_request = {
    "subject": user_id,
    "object": '886b4266-77d1-4258-abae-2931fb4f16de',
    "action": 'm_read',
    "entity_type": 'client'
  }


  test('Create should create a user and return success', () => {
    axios.request.mockResolvedValueOnce({ data: user });

    const expectedUrl = `${users_url}/users`;

    const sdk = new mfsdk({ usersUrl: users_url });
    return sdk.users.Create(user, token).then(result => {
      expect(axios.request).toHaveBeenCalledWith({
        url: expectedUrl,
        method: 'post',
        maxBodyLength: Infinity,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        data: JSON.stringify(user),
      });
      expect(result).toEqual(user);
    });
  });

  test('Create should handle a conflict error', () => {
    const errorResponse = {
      response: {
        status: 409,
      },
    };
    axios.request.mockRejectedValueOnce(errorResponse);

    const expectedUrl = `${users_url}/users`;

    const sdk = new mfsdk({ usersUrl: users_url });
    return sdk.users.Create(user, token).catch(result => {
      expect(axios.request).toHaveBeenCalledWith({
        url: expectedUrl,
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        data: JSON.stringify(user),
      });
      expect(result.error.status).toBe(1);
      expect(result.error.message).toBe('Failed due to using an existing identity.');
    });
  });

  test('Login should create a token for a user and return success', () => {
    axios.request.mockResolvedValueOnce({ data: user });

    const expectedUrl = `${users_url}/users/tokens/issue`;

    const sdk = new mfsdk({ usersUrl: users_url });
    return sdk.users.Login(user).then(result => {
      expect(axios.request).toHaveBeenCalledWith({
        url: expectedUrl,
        method: 'post',
        maxBodyLength: Infinity,
        headers: {
          'Content-Type': 'application/json'
        },
        data: JSON.stringify(user),
      });
      expect(result).toEqual(user);
    });
  });

  test('Get should get a user and return success', () => {
    axios.request.mockResolvedValueOnce({ data: user });

    const expectedUrl = `${users_url}/users/${user_id}`;

    const sdk = new mfsdk({ usersUrl: users_url });
    return sdk.users.Get(user_id, token).then(result => {
      expect(axios.request).toHaveBeenCalledWith({
        url: expectedUrl,
        method: 'get',
        maxBodyLength: Infinity,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        data: JSON.stringify(user),
      });
      expect(result).toEqual(user);
    });
  });

  test('Update should update a user and return success', () => {
    axios.request.mockResolvedValueOnce({ data: user });

    const expectedUrl = `${users_url}/users/${user_id}`;

    const sdk = new mfsdk({ usersUrl: users_url });
    return sdk.users.Update(user, token).then(result => {
      expect(axios.request).toHaveBeenCalledWith({
        url: expectedUrl,
        method: 'patch',
        maxBodyLength: Infinity,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        data: JSON.stringify(user),
      });
      expect(result).toEqual(user);
    });
  });

  test('Update_user_identity should update a user identity and return success', () => {
    axios.request.mockResolvedValueOnce({ data: user });

    const expectedUrl = `${users_url}/users/${user_id}/identity`;

    const sdk = new mfsdk({ usersUrl: users_url });
    return sdk.users.Update_user_identity(user, token).then(result => {
      expect(axios.request).toHaveBeenCalledWith({
        url: expectedUrl,
        method: 'patch',
        maxBodyLength: Infinity,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        data: JSON.stringify(user),
      });
      expect(result).toEqual(user);
    });
  });

  test('Update_user_tags should update a users tags and return success', () => {
    axios.request.mockResolvedValueOnce({ data: user });

    const expectedUrl = `${users_url}/users/${user_id}/tags`;

    const sdk = new mfsdk({ usersUrl: users_url });
    return sdk.users.Update_user_tags(user, token).then(result => {
      expect(axios.request).toHaveBeenCalledWith({
        url: expectedUrl,
        method: 'patch',
        maxBodyLength: Infinity,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        data: JSON.stringify(user),
      });
      expect(result).toEqual(user);
    });
  });

  test('Update_user_owner should update a user owner and return success', () => {
    axios.request.mockResolvedValueOnce({ data: user });

    const expectedUrl = `${users_url}/users/${user_id}/owner`;

    const sdk = new mfsdk({ usersUrl: users_url });
    return sdk.users.Update_user_owner(user, token).then(result => {
      expect(axios.request).toHaveBeenCalledWith({
        url: expectedUrl,
        method: 'patch',
        maxBodyLength: Infinity,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        data: JSON.stringify(user),
      });
      expect(result).toEqual(user);
    });
  });

  test('Update_user_password should update a user password and return success', () => {
    axios.request.mockResolvedValueOnce({ data: payload});

    const expectedUrl = `${users_url}/users/secret`;

    const sdk = new mfsdk({ usersUrl: users_url });
    return sdk.users.Update_user_password(old_secret, new_secret, token).then(result => {
      expect(axios.request).toHaveBeenCalledWith({
        url: expectedUrl,
        method: 'patch',
        maxBodyLength: Infinity,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        data: JSON.stringify(user),
      });
      expect(result).toEqual(user);
    });
  });

  test('Disable should disable user and return success', () => {
    axios.request.mockResolvedValueOnce({ data: user});

    const expectedUrl = `${users_url}/users/${user_id}/disable`;

    const sdk = new mfsdk({ usersUrl: users_url });
    return sdk.users.Disable(user, token).then(result => {
      expect(axios.request).toHaveBeenCalledWith({
        url: expectedUrl,
        method: 'post',
        maxBodyLength: Infinity,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        data: JSON.stringify(user),
      });
      expect(result).toEqual(user);
    });
  });

  test('Enable should enable user and return success', () => {
    axios.request.mockResolvedValueOnce({ data: user});

    const expectedUrl = `${users_url}/users/${user_id}/enable`;

    const sdk = new mfsdk({ usersUrl: users_url });
    return sdk.users.Enable(user, token).then(result => {
      expect(axios.request).toHaveBeenCalledWith({
        url: expectedUrl,
        method: 'post',
        maxBodyLength: Infinity,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        data: JSON.stringify(user),
      });
      expect(result).toEqual(user);
    });
  });

  test('Authorise User should authorise a user and return success', () => {
    axios.request.mockResolvedValueOnce({ data: access_request});

    const expectedUrl = `${users_url}/authorize`;

    const sdk = new mfsdk({ usersUrl: users_url });
    return sdk.users.Authorise_user(access_request, token).then(result => {
      expect(axios.request).toHaveBeenCalledWith({
        url: expectedUrl,
        method: 'post',
        maxBodyLength: Infinity,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        data: JSON.stringify(user),
      });
      expect(result).toEqual(user);
    });
  });

});
