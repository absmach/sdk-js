// Imposrt the SDK class from the mainflux-sdk package

import SDK from '../src/sdk'

const defaultUrl = 'http://localhost'

const mySdk = new SDK({
  invitationsUrl: defaultUrl + ':9020'
})

const token = '<token>'

mySdk.invitations.SendInvitation(
  {
    user_id: '<userID>',
    domain_id: '<domainID>',
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
  '<userID>',
  '<domainID>',
  token
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
  '<domainID>',
  token
)
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.invitations.DeleteInvitation(
  '<domainID>',
  '<userID>',
  token
)
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error) => {
    console.log(error)
  })
