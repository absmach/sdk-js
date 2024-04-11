import SDK from '../src/sdk'

const defaultUrl = 'http://localhost'

const mySdk = new SDK({
  bootstrapUrl: defaultUrl + ':9013'
})

const token = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJkb21haW4iOiJlYzhmNTkzMy0yZTI5LTRhNGYtOTc3Yi01MjBmNjYzZGY1ZjUiLCJleHAiOjE3MTI4NDgyODksImlhdCI6MTcxMjg0NDY4OSwiaXNzIjoibWFnaXN0cmFsYS5hdXRoIiwic3ViIjoiZWM4ZjU5MzMtMmUyOS00YTRmLTk3N2ItNTIwZjY2M2RmNWY1XzEzMGE1NDAxLTMyMjYtNDEzMS1hNTllLTE0Y2UwZDU0YWE0NCIsInR5cGUiOjAsInVzZXIiOiIxMzBhNTQwMS0zMjI2LTQxMzEtYTU5ZS0xNGNlMGQ1NGFhNDQifQ.ZO5YUcc6yvxbpj4D8u8vx64LIjOBEFecSYzNj4wi1Rd59UVLb823YaLA8URHIWSeyLKZbi_A92ViD0f8qbzoVw'

mySdk.bootstrap.AddBootstrap(
  {
    external_id: '<externalId>',
    external_key: '<externalKey>',
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

mySdk.bootstrap.bootstrapEncrypt(
  '<externalId>',
  '<externalKey>',
  '<cryptoKey>')
  .then((response: any) => {
    console.log('response:', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.bootstrap.bootstrapDecrypt(
  '<encrypted_data>',
  'cryptoKey')
  .then((response: any) => {
    console.log('response:', response)
  })
  .catch((error) => {
    console.log(error)
  })
