// Imposrt the SDK class from the mainflux-sdk package

import SDK from '../src/sdk'

const defaultUrl = 'http://localhost'

const mySdk = new SDK({
  invitationsUrl: defaultUrl + ':9003'
})

mySdk.invitations.SendInvitation(
  {
    UserID: '<userId>',
    DomainID: '<domainId>'
  },
  '<token>'
)
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.invitations.Invitation(
  {
    UserID: '<userId>',
    DomainID: '<domainId>'
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
  '<token>'
)
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.invitations.AcceptInvitation(
  {
    DomainID: '<domainId>'
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
    DomainID: '<domainId>',
    UserID: '<userId>'
  },
  '<token>'
)
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error) => {
    console.log(error)
  })
