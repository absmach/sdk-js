// Import the SDK class from the mainflux-sdk package
import SDK from '../src/sdk'

const defaultUrl = 'http://localhost'

const mySdk = new SDK({
  usersUrl: defaultUrl + ':9002',
  thingsUrl: defaultUrl + ':9000'
})

const token = '<token>'

mySdk.groups
  .CreateGroup({
    name: '<groupName>'
  },
  token
  )
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.groups
  .Group(
    '<groupID>',
    token
  )
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.groups
  .Groups(
    { offset: 0, limit: 10 },
    token
  )
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.groups
  .GroupPermissions(
    '<groupID>',
    token
  )
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.groups
  .UpdateGroup(
    {
      name: '<groupName>',
      id: '<groupID>'
    },
    token
  )
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.groups
  .EnableGroup(
    '<groupID>',
    token
  )
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.groups
  .DisableGroup(
    '<groupID>',
    token
  )
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.groups
  .DeleteGroup(
    '<groupID>',
    token
  )
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.groups
  .AddUserToGroup(
    '<groupID>',
    ['<userID>', '<userID>'],
    'administrator',
    token
  )
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.groups
  .RemoveUserFromGroup(
    '<groupID>',
    ['<userID>', '<userID>'],
    'administrator',
    token
  )
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.groups
  .ListGroupUsers(
    '<groupID>',
    { offset: 0, limit: 10 },
    token
  )
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.groups
  .ListGroupChannels(
    '<groupID>',
    { offset: 0, limit: 10 },
    token
  )
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.groups
  .Children(
    '<groupID>',
    { offset: 0, limit: 10, level: 2 },
    token
  )
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.groups
  .Parents(
    '<groupID>',
    { offset: 0, limit: 10, level: 2 },
    token
  )
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error) => {
    console.log(error)
  })
