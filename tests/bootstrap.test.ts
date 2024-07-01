import fetchMock, { enableFetchMocks } from 'jest-fetch-mock'

import SDK from '../src/sdk'
import type {
  BootstrapConfig,
  BootstrapPage,
  PageMetadata
} from '../src/sdk'
enableFetchMocks()

const bootstrapUrl = 'http://localhost'
const sdk = new SDK({ bootstrapUrl })

describe('Bootstraps', () => {
  const bootstrap: BootstrapConfig = {
    external_id: '012',
    external_key: 'aabbcc',
    thing_id: '77cbb344-7c41-47f3-a53a-a3d435b67207',
    name: 'percius'
  }
  const queryParams: PageMetadata = {
    offset: 0,
    limit: 10
  }
  const bootstrapPage: BootstrapPage = {
    configs: [bootstrap],
    total: 2,
    offset: 0,
    limit: 10
  }
  const channels = [
    'bb7edb32-2eac-4aad-aebe-ed96fe073879', 'bb7edb32-2eac-4aad-aebe-ed96fe073879'
  ]
  const thingId = '77cbb344-7c41-47f3-a53a-a3d435b67207'
  const token = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9'
  const externalKey = 'key'
  const externalId = '345'

  beforeEach(() => {
    fetchMock.resetMocks()
  })

  test('AddBootstrap should create a Bootstrap Configuration and return success', async () => {
    const createResponse = {
      status: 200,
      message: 'Bootstrap created'
    }
    fetchMock.mockResponseOnce(JSON.stringify(createResponse))

    const response = await sdk.bootstrap.AddBootstrap(bootstrap, token)
    expect(response).toEqual(createResponse)
  })

  test('Whitelist should allow a user to update a Bootstrap Configuration and return success', async () => {
    const whitelistResponse = {
      status: 200,
      message: 'Bootstrap State Updated Successfully'
    }
    fetchMock.mockResponseOnce(JSON.stringify(whitelistResponse))

    const response = await sdk.bootstrap.Whitelist(bootstrap, token)
    expect(response).toEqual(whitelistResponse)
  })

  test('UpdateBootstrap should allow a user to update a Bootstrap Configuration and return success', async () => {
    const updateResponse = {
      status: 200,
      message: 'Bootstrap Updated Successfully'
    }
    fetchMock.mockResponseOnce(JSON.stringify(updateResponse))

    const response = await sdk.bootstrap.UpdateBootstrap(bootstrap, token)
    expect(response).toEqual(updateResponse)
  })

  test('ViewBootstrap should allow a user to view a Bootstrap Configuration and return success', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(bootstrap))

    const response = await sdk.bootstrap.ViewBootstrap(thingId, token)
    expect(response).toEqual(bootstrap)
  })

  test('UpdateBootstrapCerts should update certs of a bootstrap configuration and return success', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(bootstrap))

    const response = await sdk.bootstrap.UpdateBootstrapCerts(bootstrap, token)
    expect(response).toEqual(bootstrap)
  })

  test('RemoveBootstrap should allow a user to view a Bootstrap Configuration and return success', async () => {
    const removeResponse = {
      status: 200,
      message: 'Configuration Removed'
    }
    fetchMock.mockResponseOnce(JSON.stringify(removeResponse))

    const response = await sdk.bootstrap.RemoveBootstrap(thingId, token)
    expect(response).toEqual(removeResponse)
  })

  test('Bootstrap should retrive a Bootstrap Configuration and return success', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(bootstrap))

    const response = await sdk.bootstrap.Bootstrap(externalId, externalKey)
    expect(response).toEqual(bootstrap)
  })

  test('Bootstraps should retrive all bootstraps and return success', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(bootstrapPage))

    const response = await sdk.bootstrap.Bootstraps(queryParams, token)
    expect(response).toEqual(bootstrapPage)
  })

  test('UpdateBootstrapConnection should retrive all bootstraps and return success', async () => {
    const connResponse = {
      status: 200,
      message: 'Bootstrap Connection Successful'
    }
    fetchMock.mockResponseOnce(JSON.stringify(connResponse))

    const response = await sdk.bootstrap.UpdateBootstrapConnection(thingId, channels, token)
    expect(response).toEqual(connResponse)
  })
})
