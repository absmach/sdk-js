// Imposrt the SDK class from the mainflux-sdk package

import SDK from '../src/sdk'

const defaultUrl = 'http://localhost'

const mySdk = new SDK({
  invitationsUrl: defaultUrl + ':9020'
})

const token = '<token>'
const domainId = '<domainId>'

mySdk.invitations.SendInvitation(
  {
    user_id: '<userID>',
    domain_id: '<domainID>',
    relation: 'administrator'
  },
  domainId,
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
  domainId,
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
