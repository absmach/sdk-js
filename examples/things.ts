// Import the SDK class from the mainflux-sdk package
import SDK from '../src/sdk'

const defaultUrl = 'http://localhost'

const mySdk = new SDK({
  thingsUrl: defaultUrl + ':9000',
  usersUrl: defaultUrl + ':9002'
})

// Things.ts examples.

const domainId = '<domainId>'
const token = '<token>'

mySdk.things
  .Create(
    { name: '<thingName>' }, domainId, token
  )
  .then((response: any) => {
    console.log('response:', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.things
  .Disable('<thingId>', domainId, token)
  .then((response: any) => {
    console.log('response:', response)
  })
  .catch((error) => {
    console.error(error)
  })

mySdk.things
  .Enable('<thingId>', domainId, token)
  .then((response: any) => {
    console.log('response:', response)
  })
  .catch((error) => {
    console.error(error)
  })

mySdk.things
  .UpdateThing(
    { id: '<thingId>', name: '<thingName>' }, domainId, token)
  .then((response: any) => {
    console.log('response:', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.things
  .UpdateThingSecret({ id: '<thingId>', credentials: { secret: 'newSecret' } }, domainId, token
  )
  .then((response: any) => {
    console.log(response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.things
  .UpdateThingTags(
    { id: '<thingId>', tags: ['<tag1>', '<tag2>'] },
    domainId,
    token
  )
  .then((response: any) => {
    console.log(response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.things
  .ThingsByChannel('<channelId>', { offset: 0, limit: 5 }, domainId, token)
  .then((response: any) => {
    console.log(response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.things
  .Things({ offset: 0, limit: 10 }, domainId, token)
  .then((response: any) => {
    console.log('response:', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.things
  .Thing('<thingId>', domainId, token)
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.things
  .ThingsPermissions('<thingId>', domainId, token)
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.things
  .ShareThing(
    '<thingId>',

    'administrator',
    [
      '<userId1>', '<userId2>'
    ], domainId, token)
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.things
  .UnShareThing(
    '<thingId>',
    '<relation>',

    [
      '<userId1>', '<userId2>'
    ], domainId, token)
  .then((response: any) => {
    console.log('response:', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.things
  .ListThingUsers(
    '<thingId>',
    { offset: 0, limit: 10 },
    domainId,
    token
  )
  .then((response: any) => {
    console.log('response:', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.things
  .DeleteThing('<thingId>', domainId, token)
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.things
  .CreateThings([{ name: '<thingName>' }, { name: '<thingName>' }], domainId, token)
  .then((response: any) => {
    console.log('response:', response)
  })
  .catch((error) => {
    console.log(error)
  })
