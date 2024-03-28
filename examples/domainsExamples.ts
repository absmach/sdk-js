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
  'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJkb21haW4iOiJmMjQ4ZDA1Ny0yODNjLTQzZjQtOGJhMS0xM2ZmYzU1MTRjMDciLCJleHAiOjE3MTE0NzE4MDMsImlhdCI6MTcxMTQ2ODIwMywiaXNzIjoibWFnaXN0cmFsYS5hdXRoIiwic3ViIjoiNzA1YmMzYzYtN2Y5My00MWQ2LWJjNGMtMGE4N2Y4NWU0OTczIiwidHlwZSI6MCwidXNlciI6IjcwNWJjM2M2LTdmOTMtNDFkNi1iYzRjLTBhODdmODVlNDk3MyJ9.Gjhos0VCZiDoIYKsTF6iQAxUlU8CKUz2e6l007_ICI_X9_0t2LTG0G15qbQXsqZKzo4gAPgyuW8BYJKD7SlhuA'
)
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.domains.Domains(
  { offset: 0, limit: 10 },
  'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJkb21haW4iOiJmMjQ4ZDA1Ny0yODNjLTQzZjQtOGJhMS0xM2ZmYzU1MTRjMDciLCJleHAiOjE3MTE0NzE4MDMsImlhdCI6MTcxMTQ2ODIwMywiaXNzIjoibWFnaXN0cmFsYS5hdXRoIiwic3ViIjoiNzA1YmMzYzYtN2Y5My00MWQ2LWJjNGMtMGE4N2Y4NWU0OTczIiwidHlwZSI6MCwidXNlciI6IjcwNWJjM2M2LTdmOTMtNDFkNi1iYzRjLTBhODdmODVlNDk3MyJ9.Gjhos0VCZiDoIYKsTF6iQAxUlU8CKUz2e6l007_ICI_X9_0t2LTG0G15qbQXsqZKzo4gAPgyuW8BYJKD7SlhuA'
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
  'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJkb21haW4iOiJmMjQ4ZDA1Ny0yODNjLTQzZjQtOGJhMS0xM2ZmYzU1MTRjMDciLCJleHAiOjE3MTE0NzE4MDMsImlhdCI6MTcxMTQ2ODIwMywiaXNzIjoibWFnaXN0cmFsYS5hdXRoIiwic3ViIjoiNzA1YmMzYzYtN2Y5My00MWQ2LWJjNGMtMGE4N2Y4NWU0OTczIiwidHlwZSI6MCwidXNlciI6IjcwNWJjM2M2LTdmOTMtNDFkNi1iYzRjLTBhODdmODVlNDk3MyJ9.Gjhos0VCZiDoIYKsTF6iQAxUlU8CKUz2e6l007_ICI_X9_0t2LTG0G15qbQXsqZKzo4gAPgyuW8BYJKD7SlhuA'
)
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.domains.EnableDomain(
  '<domainID>',
  'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJkb21haW4iOiJmMjQ4ZDA1Ny0yODNjLTQzZjQtOGJhMS0xM2ZmYzU1MTRjMDciLCJleHAiOjE3MTE0NzE4MDMsImlhdCI6MTcxMTQ2ODIwMywiaXNzIjoibWFnaXN0cmFsYS5hdXRoIiwic3ViIjoiNzA1YmMzYzYtN2Y5My00MWQ2LWJjNGMtMGE4N2Y4NWU0OTczIiwidHlwZSI6MCwidXNlciI6IjcwNWJjM2M2LTdmOTMtNDFkNi1iYzRjLTBhODdmODVlNDk3MyJ9.Gjhos0VCZiDoIYKsTF6iQAxUlU8CKUz2e6l007_ICI_X9_0t2LTG0G15qbQXsqZKzo4gAPgyuW8BYJKD7SlhuA'
)
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.domains.DisableDomain(
  '<domainID>',
  'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJkb21haW4iOiJmMjQ4ZDA1Ny0yODNjLTQzZjQtOGJhMS0xM2ZmYzU1MTRjMDciLCJleHAiOjE3MTE0NzE4MDMsImlhdCI6MTcxMTQ2ODIwMywiaXNzIjoibWFnaXN0cmFsYS5hdXRoIiwic3ViIjoiNzA1YmMzYzYtN2Y5My00MWQ2LWJjNGMtMGE4N2Y4NWU0OTczIiwidHlwZSI6MCwidXNlciI6IjcwNWJjM2M2LTdmOTMtNDFkNi1iYzRjLTBhODdmODVlNDk3MyJ9.Gjhos0VCZiDoIYKsTF6iQAxUlU8CKUz2e6l007_ICI_X9_0t2LTG0G15qbQXsqZKzo4gAPgyuW8BYJKD7SlhuA'
)
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.domains.AddUsertoDomain(
  '<domainID>',
  { userIDs: ['<userID>', '<userID>'], relation: '<role>' },
  'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJkb21haW4iOiJmMjQ4ZDA1Ny0yODNjLTQzZjQtOGJhMS0xM2ZmYzU1MTRjMDciLCJleHAiOjE3MTE0NzE4MDMsImlhdCI6MTcxMTQ2ODIwMywiaXNzIjoibWFnaXN0cmFsYS5hdXRoIiwic3ViIjoiNzA1YmMzYzYtN2Y5My00MWQ2LWJjNGMtMGE4N2Y4NWU0OTczIiwidHlwZSI6MCwidXNlciI6IjcwNWJjM2M2LTdmOTMtNDFkNi1iYzRjLTBhODdmODVlNDk3MyJ9.Gjhos0VCZiDoIYKsTF6iQAxUlU8CKUz2e6l007_ICI_X9_0t2LTG0G15qbQXsqZKzo4gAPgyuW8BYJKD7SlhuA'
)
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.domains.RemoveUserfromDomain(
  '<domainID>',
  { userIDs: ['<userID>', '<userID>'], relation: '<role>' },
  '<token>'
)
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error) => {
    console.log(error)
  })
