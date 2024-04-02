// Import the SDK class from the mainflux-sdk package
import SDK from '../src/sdk'

const defaultUrl = 'http://localhost'

const mySdk = new SDK({
  groupsUrl: defaultUrl + ':9002',
  thingsUrl: defaultUrl + ':9000'
})

mySdk.groups
  .CreateGroup({
    name: '<name>'
  },
  '<token>'
  )
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.groups
  .Group(
    '<groupId>',
    '<token>'
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
    '<token>'
  )
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.groups
  .GetGroups(
    { offset: 0, limit: 10 },
    '<token>'
  )
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.groups
  .GroupPermissions(
    '<groupId>',
    '<token>'
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
      name: '<name>',
      id: '<groupId>'
    },
    '<token>'
  )
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.groups
  .EnableGroup(
    '<groupId>',
    '<token>'
  )
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.groups
  .DisableGroup(
    '<groupId>',
    '<token>'
  )
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.groups
  .DeleteGroup(
    '<groupId>',
    '<token>'
  )
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.groups
  .AddUserToGroup(
    '<groupId>',
    '<token>'
  )
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.groups
  .RemoveUserFromGroup(
    '<groupId>',
    '<token>'
  )
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error) => {
    console.log(error)
  })
