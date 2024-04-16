import SDK from '../src/sdk'

const defaultUrl = 'http://localhost'

const mySdk = new SDK({
  bootstrapUrl: defaultUrl + ':9013'
})

const token = '<token>'

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
  '<cryptoKey>')
  .then((response: any) => {
    console.log('response:', response)
  })
  .catch((error) => {
    console.log(error)
  })
