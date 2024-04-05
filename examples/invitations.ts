// Imposrt the SDK class from the mainflux-sdk package

import SDK from '../src/sdk'

const defaultUrl = 'http://localhost'

const mySdk = new SDK({
  invitationsUrl: defaultUrl + ':9020'
})

const token = '<token>'

mySdk.invitations.SendInvitation(
  {
    user_id: '<user_id>',
    domain_id: '<domain_id>',
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
  {
    domain_id: '<domain_id>'
  },
  token
)
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.invitations.DeleteInvitation(
  {
    domain_id: '<domain_id>',
    user_id: '<user_id>'
  },
  token
)
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error) => {
    console.log(error)
  })
