// Imposrt the SDK class from the mainflux-sdk package

import SDK from '../src/sdk'

const defaultUrl = 'http://localhost'

const mySdk = new SDK({
  invitationsUrl: defaultUrl + ':9020'
})

const token = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJkb21haW4iOiIiLCJleHAiOjE3MTIxMDIzMzMsImlhdCI6MTcxMjA5ODczMywiaXNzIjoibWFnaXN0cmFsYS5hdXRoIiwic3ViIjoiIiwidHlwZSI6MCwidXNlciI6IjcwNWJjM2M2LTdmOTMtNDFkNi1iYzRjLTBhODdmODVlNDk3MyJ9.Y0xHvYjvTLpv_n1wW5c5HAoPQi9O5ZW88KhE_ekTHqBnH2SIW3LeyYBAFmocKHioaVlC7wxrd2rztCfGh1h7Fg'

mySdk.invitations.SendInvitation(
  {
    userID: '85cb7259-6d4d-412b-8735-d9792f4c34bf',
    domainID: '3dd7ab4c-599b-41c1-923b-607ad871b34c',
    relation: 'administrator'
  },
  token
)
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.invitations.Invitation(
  {
    userID: '<userId>',
    domainID: '<domainId>'
  },
  '<token>'
)
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.invitations.Invitations(
  {
    limit: 10,
    offset: 0
  },
  token
)
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.invitations.AcceptInvitation(
  {
    domainID: '<domainId>'
  },
  '<token>'
)
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.invitations.DeleteInvitation(
  {
    domainID: '<domainId>',
    userID: '<userId>'
  },
  '<token>'
)
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error) => {
    console.log(error)
  })
