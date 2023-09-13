import Users from '../mainflux/users.js';
import fetch from 'node-fetch';

// Mock the fetch function
jest.mock('node-fetch');

describe('Users', () => {
  const users_url = 'http://localhost:9002';
  const user = {
    id: '886b4266-77d1-4258-abae-2931fb4f16de',
    name: 'fkatwigs',
    tags: [ 'holy', 'terrain' ],
    owner: 'natra@email.com',
    credentials: {
      identity: 'fkatwigs@email.com',
      secret: '$2a$10$aeoKUFvMJkk6ax.4L.hygO6DBx/XlI0W8pxadTKA457wL1/2uz/xm'
    },
    created_at: '2023-09-07T13:17:27.880558Z',
    updated_at: '2023-09-12T13:38:23.86436Z',
    updated_by: 'a725e26d-dc1f-4452-80dc-41fc654aa38b',
    status: 'enabled'
  };
  const token = '"eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTQ2NDI2MjIsImlhdCI6MTY5NDU4ODYyMiwiaWRlbnRpdHkiOiJhZG1pbkBleGFtcGxlLmNvbSIsImlzcyI6ImNsaWVudHMuYXV0aCIsInN1YiI6ImE3MjVlMjZkLWRjMWYtNDQ1Mi04MGRjLTQxZmM2NTRhYTM4YiIsInR5cGUiOiJhY2Nlc3MifQ.0KWMwABznvZ8Lc_gKINKst4Uqmia63iXsMvStvQqYhnYt9E-HIIc7weODdOsh11iXe7NdXqMjIVNAykSZiy3Dg';

  afterEach(() => {
    jest.clearAllMocks(); // Clear any fetch mocks after each test
  });

  test('Create should create a user and return success', () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(user),
    });

    const expectedUrl = `${users_url}/users`;
    const expectedOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(user),
    };

    const users = new Users(users_url);
    return users.Create(user, token).then(result => {
      expect(fetch).toHaveBeenCalledWith(expectedUrl, expectedOptions);
      expect(result.error.status).toBe(0);
      expect(result.value).toEqual(user);
    });
  });

  test('Create should handle a conflict error', () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 409,
    });

    const expectedUrl = `${users_url}/users`;

    const users = new Users(users_url);
    return users.Create(user, token).then(result => {
      expect(fetch).toHaveBeenCalledWith(expectedUrl, expect.any(Object));
      expect(result.error.status).toBe(1);
      expect(result.error.message).toBe('Failed due to using an existing identity.');
    });
  });
});
