import SDK from '../src/sdk'

const defaultUrl = 'http://localhost'

const mySdk = new SDK({
  domainsUrl: defaultUrl + ':8189'
})

mySdk.domains
  .CreateDomain(
    { name: '<domainName>', email: '<domainEmail>' },
    '<token>'
  )
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.domains.UpdateDomain(
  { name: '<domainName>', id: '<domainID>' },
  '<token>'
)
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.domains.Domain(
  '<domainID>',
  '<token>'
)
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.domains.DomainPermissions(
  '<domainID>',
  '<token>'
)
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.domains.Domains(
  { offset: 0, limit: 10 },
  '<token>'
)
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.domains.ListUserDomains(
  '<userID>',
  { offset: 0, limit: 10 },
  '<token>'
)
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.domains.EnableDomain(
  '<domainID>',
  '<token>'
)
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.domains.DisableDomain(
  '<domainID>',
  '<token>'
)
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.domains.AddUsertoDomain(
  '<domainID>',
  ['<userID>', '<userID>'],
  '<role>',
  '<token>'
)
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.domains.RemoveUserfromDomain(
  '<domainID>',
  ['<userID>', '<userID>'],
  '<role>',
  '<token>'
)
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error) => {
    console.log(error)
  })
