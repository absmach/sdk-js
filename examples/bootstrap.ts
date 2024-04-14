import SDK from '../src/sdk'

const defaultUrl = 'http://localhost'

const mySdk = new SDK({
  bootstrapUrl: defaultUrl + ':9013'
})

const token = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJkb21haW4iOiIzZTlkMTNiMy1lMTgxLTQwNjktODdjNS0yMGQ3MmJlY2M4M2YiLCJleHAiOjE3MTMxMTI5NzAsImlhdCI6MTcxMzEwOTM3MCwiaXNzIjoibWFnaXN0cmFsYS5hdXRoIiwic3ViIjoiM2U4YWE5NDAtN2UwOC00MTExLTgzZjgtZmM1MmFiZTQ3OGY1IiwidHlwZSI6MCwidXNlciI6IjNlOGFhOTQwLTdlMDgtNDExMS04M2Y4LWZjNTJhYmU0NzhmNSJ9.PKf1NXtWKiTq6hL6awcg3-Ngr3tdHtg5Xx0Ig2r9BPedhc-D2fvLEOM9hGtSWaERDWq1xhRwYrlGZ5wSD_Thxg'

mySdk.bootstrap.AddBootstrap(
  {
    external_id: '<externalId>',
    external_key: 'externalKey',
    thing_id: '<thingId>',
    name: '<bootstrapName>'
  },
  token
)
  .then((response: any) => {
    console.log('response:', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.bootstrap.Whitelist(
  {
    external_id: '<externalId>',
    external_key: '<externalKey>',
    thing_id: '<thingId>',
    name: '<bootstrapName>'
  },
  token)
  .then((response: any) => {
    console.log('response:', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.bootstrap.UpdateBootstrap(
  {
    name: 'Bootstrap1',
    thing_id: '<thingId>'
  },
  token)
  .then((response: any) => {
    console.log('response:', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.bootstrap.ViewBootstrap(
  '<thingId>',
  token)
  .then((response: any) => {
    console.log('response:', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.bootstrap.UpdateBootstrapCerts(
  {
    thing_id: '<thingId>',
    client_cert: '<clientCert>',
    client_key: '<clientKey>',
    ca_cert: '<caCert>'
  },
  token
)
  .then((response: any) => {
    console.log('response:', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.bootstrap.RemoveBootstrap(
  '<thingId>',
  token)
  .then((response: any) => {
    console.log('response:', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.bootstrap.Bootstrap(
  'externalId',
  'externalKey'
)
  .then((response: any) => {
    console.log('response:', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.bootstrap.Bootstraps(
  { offset: 0, limit: 10 },
  token
)
  .then((response: any) => {
    console.log('response:', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.bootstrap.UpdateBootstrapConnection(
  '<thingId>',
  ['<channelId>', '<channelId2>'],
  token)
  .then((response: any) => {
    console.log('response:', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.bootstrap.SecureBootstrap(
  '<externalId>',
  '<externalKey>',
  '<cryptoKay>')
  .then((response: any) => {
    console.log('response:', response)
  })
  .catch((error) => {
    console.log(error)
  })
