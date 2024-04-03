// Import the SDK class from the mainflux-sdk package
import SDK from '../src/sdk'

const defaultUrl = 'http://localhost'

const mySdk = new SDK({
  channelsUrl: defaultUrl + ':9000'
})

const token =
  'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJkb21haW4iOiIzZTlkMTNiMy1lMTgxLTQwNjktODdjNS0yMGQ3MmJlY2M4M2YiLCJleHAiOjE3MTIwMzk5MzMsImlhdCI6MTcxMjAzNjMzMywiaXNzIjoibWFnaXN0cmFsYS5hdXRoIiwic3ViIjoiYjJmZTZhZmUtOGYwNS00NDgzLWFhY2QtN2QyMGVhMjVkOWE1IiwidHlwZSI6MCwidXNlciI6ImIyZmU2YWZlLThmMDUtNDQ4My1hYWNkLTdkMjBlYTI1ZDlhNSJ9.tA_2fGtYlT-zn316AwX_wtw0uXgE7DYFUA_ZvXKCvm1Pofl_WiAWMRt5YcqU_TbGDXmrgJxUd-Ifa9aSYMaFKA'

// mySdk.channels
//   .CreateChannel({ name: "Bees" }, token)
//   .then((response: any) => {
//     console.log("response: ", response);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// mySdk.channels
//   .Channel("f17dbcdc-7282-483b-9ffa-3396de144f7a", token)
//   .then((response: any) => {
//     console.log(response);
//   })
//   .catch((error: any) => {
//     console.log(error);
//   });

// mySdk.channels
//   .CreateChannels([{ name: "butterfly" }, { name: "fly" }], token)
//   .then((response: any) => {
//     console.log("response: ", response);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// mySdk.channels
//   .Channels({ offset: 0, limit: 10 }, token)
//   .then((response: any) => {
//     console.log("response:: ", response);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// mySdk.channels
//   .UpdateChannel(
//     { id: "6443b466-9b95-48cc-8d17-34522f2b11cb", name: "bettle" },
//     token,
//   )
//   .then((response: any) => {
//     console.log("response:: ", response);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// mySdk.channels
//   .Disable({ id: "6443b466-9b95-48cc-8d17-34522f2b11cb" }, token)
//   .then((response: any) => {
//     console.log("response:: ", response);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// mySdk.channels
//   .Enable({ id: "6443b466-9b95-48cc-8d17-34522f2b11cb" }, token)
//   .then((response: any) => {
//     console.log("response:: ", response);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// mySdk.channels
//   .ChannelsByThing(
//     "99e8a476-6bd3-4e69-9cf5-2e659a15c221",
//     { offset: 0, limit: 5 },
//     token,
//   )
//   .then((response: any) => {
//     console.log("response:: ", response);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// mySdk.channels
//   .ConnectThing(
//     "1fea953d-692f-4a42-a7ec-0dfa40a080ff",
//     "bc68fd23-5325-4ca4-9dee-6fdefab7154e",
//     ["m_read", "m_write"],
//     token,
//   )
//   .then((response: any) => {
//     console.log("response: ", response);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// mySdk.channels
//   .DisconnectThing(
//     "99e8a476-6bd3-4e69-9cf5-2e659a15c221",
//     "f17dbcdc-7282-483b-9ffa-3396de144f7a",
//     token,
//   )
//   .then((response: any) => {
//     console.log("response: ", response);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// mySdk.channels
//   .Connect(
//     ["thing1", "thing2"],
//     ["channel1", "channel2"],
//     ["m_read", "m_write"],
//     token,
//   )
//   .then((response: any) => {
//     console.log("response: ", response);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

mySdk.channels
  .Disconnect(
    ['thing1', 'thing2'],
    ['channel1', 'channel2'],
    ['m_read', 'm_write'],
    'token'
  )
  .then((response: any) => {
    console.log('response: ', response)
  })
  .catch((error) => {
    console.log(error)
  })

// mySdk.channels
//   .ListChannelUsers(
//     "f17dbcdc-7282-483b-9ffa-3396de144f7a",
//     { offset: 0, limit: 5 },
//     "token",
//   )
//   .then((response: any) => {
//     console.log("response: ", response);
//   })
//   .catch((error: any) => {
//     console.log(error);
//   });

// mySdk.channels
//   .ChannelPermissions({ id: "f17dbcdc-7282-483b-9ffa-3396de144f7a" }, token)
//   .then((response: any) => {
//     console.log("response: ", response);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// mySdk.channels
//   .AddUserToChannel(
//     "f17dbcdc-7282-483b-9ffa-3396de144f7a",
//     [
//       "385bc816-a9d1-47bf-9219-ded803565454",
//       "500261c0-1aab-43fc-bae1-ca01cceac9b7",
//     ],
//     "admin",
//     token,
//   )
//   .then((response: any) => {
//     console.log("response: ", response);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// mySdk.channels
//   .RemoveUserFromChannel(
//     "f17dbcdc-7282-483b-9ffa-3396de144f7a",
//     [
//       "385bc816-a9d1-47bf-9219-ded803565454",
//       "500261c0-1aab-43fc-bae1-ca01cceac9b7",
//     ],
//     "admin",
//     token,
//   )
//   .then((response: any) => {
//     console.log("response: ", response);
//   })
//   .catch((error) => {
//     console.log(error);
//   });
