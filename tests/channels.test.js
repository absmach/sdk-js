const axios = require('axios');
const mfsdk = require("mainflux-sdk");

jest.mock("axios");

describe('Channels', () => {
    const channels_url = "http://localhost";
    const channel = {
        "name": "channelName",
        "description": "long channel description",
        "parent_id": "bb7edb32-2eac-4aad-aebe-ed96fe073879",
        "metadata": {
            "domain": "example.com"
        },
        "status": "enabled",
        "owner_id": "bb7edb32-2eac-4aad-aebe-ed96fe073879"
    };
    const channel_id = "290b0f49-7a57-4b8c-9e4e-fbf17c6ab7d9";
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NjU3OTMwNjksImlhdCI6";
    const query_params = {
        "offset": 0, "limit": 10
    };
    const channels = [
        { "name": "channelA", "id": "bb7edb32-2eac-4aad-aebe-ed96fe073879" },
        { "name": "channelB", "id": "bb7edb32-2eac-4aad-aebe-ed96fe073879" }
    ];

    test('Create should create a channel and return success', () => {
        axios.request.mockResolvedValueOnce({ data: group });

        const expectedUrl = `${channels_url}/channels`;

        const sdk = new mfsdk({ channelsUrl: channels_url });
        return sdk.channels.Create(channel, token).then(result => {
            expect(axios.request).toHaveBeenCalledWith({
                url: expectedUrl,
                method: 'post',
                maxBodyLength: Infinity,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                data: JSON.stringify(channel),
            });
            expect(result).toEqual(channel);
        });
    });

    test('Create should handle a conflict error', () => {
        const errorResponse = {
            response: {
                status: 401,
            },
        };
        axios.request.mockRejectedValueOnce(errorResponse);

        const expectedUrl = `${channels_url}/channels`;

        const sdk = new mfsdk({ channelsUrl: channels_url });
        return sdk.channels.Create(channel, token).then(result => {
            expect(axios.request).toHaveBeenCalledWith({
                url: expectedUrl,
                method: 'post',
                maxBodyLength: Infinity,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                data: JSON.stringify(channel),
            });
            expect(result.error.status).toBe(1);
            expect(result.error.message).toBe('Missing or invalid access token provided.');
        });
    });

    test('Get should retrieve a channel and return success', () => {
        axios.request.mockResolvedValueOnce({ data: channel });

        const expectedUrl = `${channels_url}/channels/${channel_id}`;

        const sdk = new mfsdk({ channelsUrl: channels_url });
        return sdk.channels.Get(channel_id, token).then(result => {
            expect(axios.request).toHaveBeenCalledWith({
                url: expectedUrl,
                method: 'get',
                maxBodyLength: Infinity,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            expect(result).toEqual(channel);
        });
    });

    test('Get should handle a conflict error', () => {
        const errorResponse = {
            response: {
                status: 401,
            },
        };
        axios.request.mockRejectedValueOnce(errorResponse);

        const expectedUrl = `${channels_url}/channels/${channel_id}`;
        const sdk = new mfsdk({ channelsUrl: channels_url });
        return sdk.channels.Get(channel_id, token).then(result => {
            expect(axios.request).toHaveBeenCalledWith({
                url: expectedUrl,
                method: 'get',
                maxBodyLength: Infinity,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            expect(result.error.status).toBe(1);
            expect(result.error.message).toBe('Missing or invalid access token provided.');
        });
    });

    test('Get_by_thing should retrieve a channel and return success', () => {
        axios.request.mockResolvedValueOnce({ data: channel });

        const expectedUrl = `${channels_url}/channels/${channel_id}/things?${new URLSearchParams(query_params).toString()}`;

        const sdk = new mfsdk({ channelsUrl: channels_url });
        return sdk.channels.Get_by_thing(channel_id, query_params, token).then(result => {
            expect(axios.request).toHaveBeenCalledWith({
                url: expectedUrl,
                method: 'get',
                maxBodyLength: Infinity,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                data: JSON.stringify(query_params),
            });
            expect(result).toEqual(channel);
        });
    });

    test('Get_by_thing should handle a conflict error', () => {
        const errorResponse = {
            response: {
                status: 401,
            },
        };
        axios.request.mockRejectedValueOnce(errorResponse);

        const expectedUrl = `${channels_url}/channels/${channel_id}/things?${new URLSearchParams(query_params).toString()}`;

        const sdk = new mfsdk({ channelsUrl: channels_url });
        return sdk.channels.Get_by_thing(channel_id, query_params, token).then(result => {
            expect(axios.request).toHaveBeenCalledWith({
                url: expectedUrl,
                method: 'get',
                maxBodyLength: Infinity,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                data: JSON.stringify(query_params),
            });
            expect(result.error.status).toBe(1);
            expect(result.error.message).toBe('Missing or invalid access token provided.');
        });
    });

    test('Get_all should retrieve all channels and return success', () => {
        axios.request.mockResolvedValueOnce({ data: channel });

        const expectedUrl = `${channels_url}/channels?${new URLSearchParams(query_params).toString()}`;

        const sdk = new mfsdk({ channelsUrl: channels_url });
        return sdk.channels.Get_all(query_params, token).then(result => {
            expect(axios.request).toHaveBeenCalledWith({
                url: expectedUrl,
                method: 'get',
                maxBodyLength: Infinity,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                data: JSON.stringify(query_params),
            });
            expect(result).toEqual(channel);
        });
    });

    test('Get_all should handle a conflict error', () => {
        const errorResponse = {
            response: {
                status: 401,
            },
        };
        axios.request.mockRejectedValueOnce(errorResponse);

        const expectedUrl = `${channels_url}/channels?${new URLSearchParams(query_params).toString()}`;

        const sdk = new mfsdk({ channelsUrl: channels_url });
        return sdk.channels.Get_all(query_params, token).then(result => {
            expect(axios.request).toHaveBeenCalledWith({
                url: expectedUrl,
                method: 'get',
                maxBodyLength: Infinity,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                data: JSON.stringify(query_params),
            });
            expect(result.error.status).toBe(1);
            expect(result.error.message).toBe('Missing or invalid access token provided.');
        });
    });

    test('Create_bulk should create multiple channels and return success', () => {
        axios.request.mockResolvedValueOnce({ data: channel });

        const expectedUrl = `${channels_url}/channels/bulk`;

        const sdk = new mfsdk({ channelsUrl: channels_url });
        return sdk.channels.Create_bulk(channels, token).then(result => {
            expect(axios.request).toHaveBeenCalledWith({
                url: expectedUrl,
                method: 'post',
                maxBodyLength: Infinity,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                data: JSON.stringify(channels),
            });
            expect(result).toEqual(channels);
        });
    });

    test('Create_bulk should handle a conflict error', () => {
        const errorResponse = {
            response: {
                status: 401,
            },
        };
        axios.request.mockRejectedValueOnce(errorResponse);
        const expectedUrl = `${channels_url}/channels/bulk`;

        const sdk = new mfsdk({ channelsUrl: channels_url });
        return sdk.channels.Create_bulk(channels, token).then(result => {
            expect(axios.request).toHaveBeenCalledWith({
                url: expectedUrl,
                method: 'post',
                maxBodyLength: Infinity,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                data: JSON.stringify(channels),
            });
            expect(result.error.status).toBe(1);
            expect(result.error.message).toBe('Missing or invalid access token provided.');
        });
    });

    test('Update should handle a conflict error', () => {
        const errorResponse = {
            response: {
                status: 401,
            },
        };
        axios.request.mockRejectedValueOnce(errorResponse);

        const expectedUrl = `${channels_url}/channels/${channel["id"]}`;

        const sdk = new mfsdk({ channelsUrl: channels_url });
        return sdk.channels.Update(channel, token).then(result => {
            expect(axios.request).toHaveBeenCalledWith({
                url: expectedUrl,
                method: 'put',
                maxBodyLength: Infinity,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                data: JSON.stringify(channel),
            });
            expect(result.error.status).toBe(1);
            expect(result.error.message).toBe('Missing or invalid access token provided.');
        });
    });

    test('Update should update a channel and return success', () => {
        axios.request.mockResolvedValueOnce({ data: channel });

        const expectedUrl = `${channels_url}/channels/${channel["id"]}`;

        const sdk = new mfsdk({ channelsUrl: channels_url });
        return sdk.channels.Update(channel, token).then(result => {
            expect(axios.request).toHaveBeenCalledWith({
                url: expectedUrl,
                method: 'put',
                maxBodyLength: Infinity,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                data: JSON.stringify(channel),
            });
            expect(result).toEqual(channel);
        });
    });

    test('Disable should delete a channel and return success', () => {
        axios.request.mockResolvedValueOnce({ data: channel });

        const expectedUrl = `${channels_url}/channels/${channel["id"]}/disable`;

        const sdk = new mfsdk({ channelsUrl: channels_url });
        return sdk.channels.Disable(channel, token).then(result => {
            expect(axios.request).toHaveBeenCalledWith({
                url: expectedUrl,
                method: 'post',
                maxBodyLength: Infinity,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            expect(result).toEqual(channel);
        });
    });

    test('Disable should handle a conflict error', () => {
        const errorResponse = {
            response: {
                status: 401,
            },
        };
        axios.request.mockRejectedValueOnce(errorResponse);

        const expectedUrl = `${channels_url}/channels/${channel["id"]}/disable`;

        const sdk = new mfsdk({ channelsUrl: channels_url });
        return sdk.channels.Disable(channel, token).then(result => {
            expect(axios.request).toHaveBeenCalledWith({
                url: expectedUrl,
                method: 'post',
                maxBodyLength: Infinity,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            expect(result.error.status).toBe(1);
            expect(result.error.message).toBe('Missing or invalid access token provided.');
        });
    });

});
