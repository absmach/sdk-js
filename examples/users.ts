// Import the SDK class from the mainflux-sdk package
import SDK from '../src/sdk'

const defaultUrl = 'http://localhost'

const mySdk = new SDK({
  usersUrl: defaultUrl + ':9002',
  thingsUrl: defaultUrl + ':9000'
})

mySdk.users
  .Create({
    name: '<name>',
    credentials: {
      identity: 'James@email.com',
      secret: '12345678'
    }
  })
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.users.User(
  '<userId>',
  '<token>'
)
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.users.UserProfile(
  '<token>'
)
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.users.CreateToken(
  { identity: 'admin@example.com', secret: '12345678' }
)
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.users.RefreshToken(
  { identity: 'userId' },
  '<refreshToken>'
)
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.users.Update(
  { id: '<userId>', name: '<userName>' },
  '<token>'
)
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.users.UpdateUserIdentity(
  { id: '<userId>', credentials: { identity: '<userIdentity>' } },
  '<token>'
)
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.users.UpdateUserTags(
  { id: '<userId>', tags: ['foo', 'bar'] },
  '<token>'
)
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.users.UpdateUserRole(
  { id: '<userId>', role: '<user_role>' },
  '<token>'
)
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.users.Disable(
  { id: '<userId>' },
  '<token>'
)
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.users.Enable(
  { id: '<userId>' },
  '<token>'
)
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.users.Users(
  { offset: 0, limit: 10 },
  '<token>'
)
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.users.UpdateUserPassword(
  '<oldSecret>', '<newSecret>',
  '<token>'
)
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.users.ListUserChannels(
  '<userId>',
  { offset: 0, limit: 10 },
  '<token>'
)
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.users.ListUserThings(
  '<userId>',
  { offset: 0, limit: 10 },
  '<token>'
)
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.users.ListUserGroups(
  '<userId>',
  { offset: 0, limit: 10 },
  '<token>'
)
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.users.ResetPasswordRequest(
  '<email>'
)
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.users.ResetPassword(
  '<password>',
  '<confPass>',
  '<token>'
)
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error) => {
    console.log(error)
  })
