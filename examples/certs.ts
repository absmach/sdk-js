import SDK from '../src/sdk'

const defaultUrl = 'http://localhost'

const mySdk = new SDK({
  certsUrl: defaultUrl + ':9019'
})

mySdk.certs
  .IssueCert(
    '<thingID>',
    '<valid>',
    '<token>'
  )
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.certs
  .ViewCertByThing(
    '<thingID>',
    '<token>'
  )
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.certs
  .ViewCert(
    '<certID>',
    '<token>'
  )
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.certs
  .RevokeCert(
    '<thingID>',
    '<token>'
  )
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error) => {
    console.log(error)
  })
