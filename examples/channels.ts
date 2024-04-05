// Import the SDK class from the mainflux-sdk package
import SDK from '../src/sdk'

const defaultUrl = 'http://localhost'

const mySdk = new SDK({
  thingsUrl: defaultUrl + ':9000',
  usersUrl: defaultUrl + ':9002'
})

// Channels.ts examples.

const token = '<token>'

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
  .ListChannelUsersGroups(
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
