// Import the SDK class from the mainflux-sdk package
import SDK from '../src/sdk'

const defaultUrl = 'http://localhost'

const mySdk = new SDK({
  thingsUrl: defaultUrl + ':9000',
  usersUrl: defaultUrl + ':9002'
})

// Channels.ts examples.

const token = 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJkb21haW4iOiJhZDVhMjdjNy1lNjc3LTRjZjQtODU0ZC00ZWY4MDZhOWE1NjIiLCJleHAiOjE3MTMxOTI5MzUsImlhdCI6MTcxMzE4OTMzNSwiaXNzIjoibWFnaXN0cmFsYS5hdXRoIiwic3ViIjoiMTVmMTc0MDQtYWVkOS00YjhhLTljYTEtNDc3MTVlOTMyZDZiIiwidHlwZSI6MCwidXNlciI6IjE1ZjE3NDA0LWFlZDktNGI4YS05Y2ExLTQ3NzE1ZTkzMmQ2YiJ9.MOgaXSzG-EcMfc4ZeTwD7UctMkmYy2fNQnLokVX86Yf-7Hi7iP60i_0EA9_CdX1qB-S9NKZBFeJSSJH5UgDCEQ'

mySdk.channels
  .CreateChannel(
    { name: '<channelName>' }, token)
  .then((response: any) => {
    console.log('response:', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.channels
  .Channel('<channelID>', token)
  .then((response: any) => {
    console.log(response)
  })
  .catch((error: any) => {
    console.log(error)
  })

mySdk.channels
  .Channels({ offset: 0, limit: 10 }, token)
  .then((response: any) => {
    console.log('response:', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.channels
  .UpdateChannel(
    { id: '<channelId>', name: '<channelName>' },
    token
  )
  .then((response: any) => {
    console.log('response:', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.channels
  .Disable({ id: '<channelId>' }, token)
  .then((response: any) => {
    console.log('response:', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.channels
  .Enable({ id: '<channelId>' }, token)
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.channels
  .ChannelsByThing(
    '<thingId>',
    { offset: 0, limit: 5 },
    token
  )
  .then((response: any) => {
    console.log('response:', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.channels
  .ConnectThing(
    '<thingId>',
    '<channelId>',
    token
  )
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.channels
  .DisconnectThing(
    '<thingId>',
    '<channelId>',
    token
  )
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.channels
  .Connect(
    '<thingId>',
    '<channelId>',
    token
  )
  .then((response: any) => {
    console.log('response:', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.channels
  .Disconnect(
    '<thingId>',
    '<channelId>',
    token
  )
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.channels
  .ListChannelUsers(
    '<channelId>',
    { offset: 0, limit: 5 },
    token
  )
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error: any) => {
    console.log(error)
  })

mySdk.channels
  .ListChannelUserGroups(
    '<channelId>',
    { offset: 0, limit: 5 },
    token
  )
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error: any) => {
    console.log(error)
  })

mySdk.channels
  .ChannelPermissions('<channelId>', token)
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.channels
  .AddUserToChannel(
    '<channelId>',
    [
      '<userId1>', '<userId2>'
    ],
    'administrator',
    token
  )
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.channels
  .RemoveUserFromChannel(
    '<channelId>',
    [
      '<userId1>', '<userId2>'
    ],
    'administrator',
    token
  )
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.channels
  .AddUserGroupToChannel(
    '<channelId>',
    [
      '<UserGroupId1>', '<UserGroupId2>'
    ],
    token
  )
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.channels
  .RemoveUserGroupFromChannel(
    '<channelId>',
    [
      '<UserGroupId1>', '<UserGroupId2>'
    ],
    token
  )
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.channels
  .DeleteChannel(
    { id: '<channelId>' },
    token
  )
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error) => {
    console.log(error)
  })
