import fetchMock, { enableFetchMocks } from 'jest-fetch-mock'

import SDK from '../src/sdk'
import type {
  Cert,
  CertSerials
} from '../src/sdk'
enableFetchMocks()

const certsURL = 'http://localhost'
const sdk = new SDK({ certsUrl: certsURL })

describe('Certs', () => {
  const cert: Cert = {
    cert_serial: '22:16:df:60:c2:99:bc:c4:9b:1d:fd:71:5e:e9:07:d9:1b:3c:85:1d',
    client_cert: '-----BEGIN CERTIFICATE-----\nMIIEATCCAumgAwIBAgIUIhbfYMKZvMSbHf1xXukH2Rs8hR0wDQYJKoZIhvcNAQEL1k\n-----END CERTIFICATE-----',
    client_key: '-----BEGIN RSA PRIVATE KEY-----\nMIIEoQIBAAKCAQEAy9gF84a5s6jlX6hkAPXrLYqvdhe6uygdr6eHfd5erdcdxfgc\n-----END RSA PRIVATE KEY-----',
    expiration: '2023-09-20T10:02:48Z',
    thing_id: '3d49a42f-63fd-491b-9784-adf4b64ef347'
  }

  const token = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9'

  const valid = '10h'

  const thingId = '3d49a42f-63fd-491b-9784-adf4b64ef347'

  const certSerials: CertSerials = {
    certs: [cert],
    total: 1,
    offset: 0,
    limit: 1
  }

  beforeEach(() => {
    fetchMock.resetMocks()
  })

  test('issue cert should issue a user a certificate and return success', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(cert))

    const response = await sdk.certs.IssueCert(thingId, valid, token)
    expect(response).toEqual(cert)
  })

  test('view cert by thing should get a list of certificate serials for a thing and return success', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(certSerials))

    const response = await sdk.certs.ViewCertByThing(thingId, token)
    expect(response).toEqual(certSerials)
  })

  test('view cert should get a cert and return success', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(cert))

    const response = await sdk.certs.ViewCert(thingId, token)
    expect(response).toEqual(cert)
  })

  test('revoke cert sgould revoke a certificate and return success', async () => {
    const revokeCertResponse = {
      status: 200,
      message: 'Cert Revoked Successfully'
    }
    fetchMock.mockResponseOnce(JSON.stringify(revokeCertResponse))

    const response = await sdk.certs.RevokeCert(thingId, token)
    expect(response).toEqual(revokeCertResponse)
  })
})
