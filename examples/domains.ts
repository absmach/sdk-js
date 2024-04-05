import SDK from '../src/sdk'

const defaultUrl = 'http://localhost'

const mySdk = new SDK({
  domainsUrl: defaultUrl + ':8189',
  usersUrl: defaultUrl + ':9002'
})

const token: string = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJkb21haW4iOiIiLCJleHAiOjE3MTIzMDg5MjYsImlhdCI6MTcxMjMwNTMyNiwiaXNzIjoibWFnaXN0cmFsYS5hdXRoIiwic3ViIjoiIiwidHlwZSI6MCwidXNlciI6Ijc1MDgxMTAyLWZkNGUtNDFlOS1iOTc0LTRjNGY4NzZjNDRkNyJ9.DzUl6VnMfouCjaz9EspYuI3FvrRsE7tzxclrFxdqW_nUz1QvIHo3MuClrzsLsGz9SeK-x8fALDU4gNR5uwjezA'

mySdk.domains
  .CreateDomain(
    { name: 'domain today' },
    token
  )
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error) => {
    console.log(error)
  })

// mySdk.domains.UpdateDomain(
//   { name: '<domainName>', id: '<domainID>' },
//   token
// )
//   .then((response: any) => {
//     console.log('response: ', response)
//   })
//   .catch((error) => {
//     console.log(error)
//   })

// mySdk.domains.Domain(
//   '<domainID>',
//   token
// )
//   .then((response: any) => {
//     console.log('response: ', response)
//   })
//   .catch((error) => {
//     console.log(error)
//   })

// mySdk.domains.DomainPermissions(
//   '<domainID>',
//   token
// )
//   .then((response: any) => {
//     console.log('response: ', response)
//   })
//   .catch((error) => {
//     console.log(error)
//   })

// mySdk.domains.Domains(
//   { offset: 0, limit: 10 },
//   token
// )
//   .then((response: any) => {
//     console.log('response: ', response)
//   })
//   .catch((error) => {
//     console.log(error)
//   })

// mySdk.domains.ListUserDomains(
//   '<userID>',
//   { offset: 0, limit: 10 },
//   token
// )
//   .then((response: any) => {
//     console.log('response: ', response)
//   })
//   .catch((error) => {
//     console.log(error)
//   })

// mySdk.domains.ListDomainUsers(
//   '<domainID>',
//   { offset: 0, limit: 10 },
//   token
// )
//   .then((response: any) => {
//     console.log('response: ', response)
//   })
//   .catch((error) => {
//     console.log(error)
//   })

// mySdk.domains.EnableDomain(
//   '<domainID>',
//   token
// )
//   .then((response: any) => {
//     console.log('response: ', response)
//   })
//   .catch((error) => {
//     console.log(error)
//   })

// mySdk.domains.DisableDomain(
//   '<domainID>',
//   token
// )
//   .then((response: any) => {
//     console.log('response: ', response)
//   })
//   .catch((error) => {
//     console.log(error)
//   })

// mySdk.domains.AddUsertoDomain(
//   '<domainID>',
//   ['<userID>', '<userID>'],
//   'administrator',
//   token
// )
//   .then((response: any) => {
//     console.log('response: ', response)
//   })
//   .catch((error) => {
//     console.log(error)
//   })

// mySdk.domains.RemoveUserfromDomain(
//   '<domainID>',
//   ['<userID>', '<userID>'],
//   'administrator',
//   token
// )
//   .then((response: any) => {
//     console.log('response: ', response)
//   })
//   .catch((error) => {
//     console.log(error)
//   })
