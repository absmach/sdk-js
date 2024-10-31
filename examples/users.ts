// Import the SDK class from the mainflux-sdk package
import SDK from '../src/sdk'

const defaultUrl = 'http://localhost'

const mySdk = new SDK({
  usersUrl: defaultUrl + ':9002',
  thingsUrl: defaultUrl + ':9000'
})
const token = '<token>'

mySdk.users
  .Create({
    first_name: '<first_name>',
    last_name: '<last_name>',
    email: '<email>',
    credentials: {
      username: '<username>',
      secret: '<password>'
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
  token
)
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.users.UserProfile(
  token
)
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.users.CreateToken(
  { email: '<userEmail>', secret: '<password>' }
)
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.users.CreateToken(
  { username: '<username>', secret: '<password>' }
)
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.users.RefreshToken(
  '<refreshToken>'
)
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.users.Update(
  { id: '<userId>', first_name: '<first_name>', last_name: '<last_name>' },
  token
)
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.users.UpdateEmail(
  { id: '<userId>', email: '<email>' },
  token
)
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.users.UpdateUsername(
  { id: '<userId>', credentials: { username: '<username>' } },
  token
)
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.users.UpdateProfilePicture(
  { id: '<userId>', profile_picture: '<profile_picture>' },
  token
)
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.users.UpdateUserTags(
  { id: '<userId>', tags: ['foo', 'bar'] },
  token
)
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.users.UpdateUserRole(
  { id: '<userId>', role: '<userRole>' },
  token
)
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.users.Disable(
  { id: '<userId>' },
  token
)
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.users.Enable(
  { id: '<userId>' },
  token
)
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.users.Users(
  { offset: 0, limit: 10 },
  token
)
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.users.UpdateUserPassword(
  '<oldSecret>', '<newSecret>',
  token
)
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.users.ListUserChannels(
  '<userId>',
  { domain_id: '<domainId>', offset: 0, limit: 10 },
  token
)
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.users.ListUserThings(
  '<userId>',
  { domain_id: '<domainId>', offset: 0, limit: 10 },
  token
)
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.users.ListUserGroups(
  '<userId>',
  { domain_id: '<domainId>', offset: 0, limit: 10 },
  token
)
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.users.ResetPasswordRequest(
  '<email>', '<hostUrl>'
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
  token
)
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.users.DeleteUser(
  '<userId>',
  token
)
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error) => {
    console.log(error)
  })

mySdk.users.SearchUsers(
  { username: '<username>', id: '<userId>' },
  token
)
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error) => {
    console.log(error)
  })
