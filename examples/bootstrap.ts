import SDK from '../src/sdk'

const defaultUrl = 'http://localhost'

const mySdk = new SDK({
  thingsUrl: defaultUrl + ':9000'
})

const token = '<token>'

mySdk.bootstrap.Create(
  {
    external_id: '<externalId>',
    external_key: '<externalKey>',
    thing_id: '<thingId>',
    name: '<name>'
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
    external_id: '<external_id>',
    external_key: '<external_key>',
    thing_id: '<thing_id>',
    name: '<name>'
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
    name: '<config_name>',
    thing_id: '<thing_id>'
  },
  token)
  .then((response: any) => {
    console.log('response:', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.bootstrap.ViewBootstrap(
  '<thing_id>',
  token)
  .then((response: any) => {
    console.log('response:', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.bootstrap.UpdateBootstrapCerts(
  '<thing_id>',
  '<client_cert>',
  '<client_key>',
  '<caCert>',
  token
)
  .then((response: any) => {
    console.log('response:', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.bootstrap.RemoveBootstrap(
  '<thing_id>',
  token)
  .then((response: any) => {
    console.log('response:', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.bootstrap.BootstrapSecure(
  '<external_id>',
  '<external_key>',
  '<crypto_key>'
)
  .then((response: any) => {
    console.log('response:', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.bootstrap.Bootstrap(
  '<external_id>',
  '<external_key>'
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
  '<thing_id>',
  [{ id: '<channelID>' }, { id: '<channelID>' }],
  token)
  .then((response: any) => {
    console.log('response:', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.bootstrap.BootstrapEncrypt(
  Buffer.from('<external_id>', 'utf8'),
  '<external_key>')
  .then((response: any) => {
    console.log('response:', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.bootstrap.BootstrapDecrypt(
  '<encrypted_data>',
  '<crypto_key>')
  .then((response: any) => {
    console.log('response:', response)
  })
  .catch((error) => {
    console.log(error)
  })
