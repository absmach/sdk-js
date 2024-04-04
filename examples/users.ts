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
    name: '<name>',
    credentials: {
      identity: '<useremail>',
      secret: '<password>'
    }
  })
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error) => {
    console.log(error)
  })

<<<<<<< HEAD
<<<<<<< HEAD
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
=======
// mySdk.users.User(
//   '<userId>',
//   '<token>'
// )
//   .then((response: any) => {
//     console.log('response: ', response)
//   })
//   .catch((error) => {
//     console.log(error)
//   })

// mySdk.users.UserProfile(
//   '<token>'
// )
//   .then((response: any) => {
//     console.log('response: ', response)
//   })
//   .catch((error) => {
//     console.log(error)
//   })
>>>>>>> c880932 (resolving comments)

mySdk.users.CreateToken(
  { identity: 'admin@example.com', secret: '12345678', domain_id: '3e9d13b3-e181-4069-87c5-20d72becc83f' }
=======
mySdk.users.User(
  '<userId>',
  '<token>'
>>>>>>> eeeb014 (Fixing Cl failing issues)
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

<<<<<<< HEAD
<<<<<<< HEAD
mySdk.users.Update(
  { id: '<userId>', name: '<userName>' },
  token
=======
mySdk.users.CreateToken(
  { identity: '<identity>', secret: '<password>', domain_id: '<domainID>' }
>>>>>>> eeeb014 (Fixing Cl failing issues)
)
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error) => {
    console.log(error)
  })
<<<<<<< HEAD

mySdk.users.UpdateUserIdentity(
  { id: '<userId>', credentials: { identity: '<userIdentity>' } },
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
  { offset: 0, limit: 10 },
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
  { offset: 0, limit: 10 },
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
  { offset: 0, limit: 10 },
  token
)
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error) => {
    console.log(error)
  })
=======
// mySdk.users.Update(
//   { id: '<userId>', name: '<userName>' },
//   '<token>'
// )
//   .then((response: any) => {
//     console.log('response: ', response)
//   })
//   .catch((error) => {
//     console.log(error)
//   })
=======
>>>>>>> eeeb014 (Fixing Cl failing issues)

mySdk.users.RefreshToken(
  { identity: '<identity>' },
  '<token>'
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
  { id: '<userId>', role: '<userRole>' },
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

<<<<<<< HEAD
// mySdk.users.ListUserGroups(
//   '<userId>',
//   { offset: 0, limit: 10 },
//   '<token>'
// )
//   .then((response: any) => {
//     console.log('response: ', response)
//   })
//   .catch((error) => {
//     console.log(error)
//   })
>>>>>>> c880932 (resolving comments)
=======
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
>>>>>>> eeeb014 (Fixing Cl failing issues)

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

<<<<<<< HEAD
<<<<<<< HEAD
mySdk.users.ResetPassword(
  '<password>',
  '<confPass>',
  token
=======
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
>>>>>>> eeeb014 (Fixing Cl failing issues)
)
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error) => {
    console.log(error)
  })
<<<<<<< HEAD
=======
// mySdk.users.ResetPassword(
//   '<password>',
//   '<confPass>',
//   '<token>'
// )
//   .then((response: any) => {
//     console.log('response: ', response)
//   })
//   .catch((error) => {
//     console.log(error)
//   })
>>>>>>> c880932 (resolving comments)
=======
>>>>>>> eeeb014 (Fixing Cl failing issues)
