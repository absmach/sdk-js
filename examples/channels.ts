// Import the SDK class from the mainflux-sdk package
import SDK from "../src/sdk";

const defaultUrl = "http://localhost";

const mySdk = new SDK({
  channelsUrl: `${defaultUrl}:9005`,
  usersUrl: `${defaultUrl}:9002`,
});

// Channels.ts examples.

const token = "<token>";
const domainId = "<domainId>";

mySdk.channels
  .CreateChannel({ name: "<channelName>" }, domainId, token)
  .then((response: any) => {
    console.log("response:", response);
  })
  .catch((error) => {
    console.log(error);
  });

mySdk.channels
  .Channel("<channelID>", domainId, token)
  .then((response: any) => {
    console.log(response);
  })
  .catch((error: any) => {
    console.log(error);
  });

// mySdk.channels
//   .Channels({ offset: 0, limit: 10 }, domainId, token)
//   .then((response: any) => {
//     console.log('response:', response)
//   })
//   .catch((error) => {
//     console.log(error)
//   })

// mySdk.channels
//   .UpdateChannelNameAndMetadata(
//     { id: 'c641ccfb-5b65-4f2c-8a26-1c589f5e6c1e', name: 'Oleg', metadata: { key: 'value' } },
//     domainId,
//     token
//   )
//   .then((response: any) => {
//     console.log('response:', response)
//   })
//   .catch((error) => {
//     console.log(error)
//   })

// mySdk.channels
//   .UpdateChannelTags(
//     { id: 'c641ccfb-5b65-4f2c-8a26-1c589f5e6c1e', tags: ['tag1', 'tag2'] },
//     domainId,
//     token
//   )
//   .then((response: any) => {
//     console.log('response:', response)
//   })
//   .catch((error) => {
//     console.log(error)
//   })

mySdk.channels
  .Disable("<channelId>", domainId, token)
  .then((response: any) => {
    console.log("response:", response);
  })
  .catch((error) => {
    console.log(error);
  });

mySdk.channels
  .Enable("<channelId>", domainId, token)
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.log(error);
  });

mySdk.channels
  .ChannelsByThing(
    "<thingId>",
    { offset: 0, limit: 5 },
    domainId,
    token,
  )
  .then((response: any) => {
    console.log("response:", response);
  })
  .catch((error) => {
    console.log(error);
  });

mySdk.channels
  .ConnectThing(
    "<thingId>",
    "<channelId>",
    domainId,
    token,
  )
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.log(error);
  });

mySdk.channels
  .DisconnectThing(
    "<thingId>",
    "<channelId>",
    domainId,
    token,
  )
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.log(error);
  });

mySdk.channels
  .Connect(
    "<thingId>",
    "<channelId>",
    domainId,
    token,
  )
  .then((response: any) => {
    console.log("response:", response);
  })
  .catch((error) => {
    console.log(error);
  });

mySdk.channels
  .Disconnect(
    "<thingId>",
    "<channelId>",
    domainId,
    token,
  )
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.log(error);
  });

mySdk.channels
  .ListChannelUsers(
    "<channelId>",
    { offset: 0, limit: 5 },
    domainId,
    token,
  )
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error: any) => {
    console.log(error);
  });

mySdk.channels
  .ListChannelUserGroups(
    "<channelId>",
    { offset: 0, limit: 5 },
    domainId,
    token,
  )
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error: any) => {
    console.log(error);
  });

mySdk.channels
  .ChannelPermissions("<channelId>", domainId, token)
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.log(error);
  });

mySdk.channels
  .AddUserToChannel(
    "<channelId>",
    [
      "<userId1>", "<userId2>",
    ],
    "administrator",
    domainId,
    token,
  )
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.log(error);
  });

mySdk.channels
  .RemoveUserFromChannel(
    "<channelId>",
    [
      "<userId1>", "<userId2>",
    ],
    "administrator",
    domainId,
    token,
  )
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.log(error);
  });

mySdk.channels
  .AddUserGroupToChannel(
    "<channelId>",
    [
      "<UserGroupId1>", "<UserGroupId2>",
    ],
    domainId,
    token,
  )
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.log(error);
  });

mySdk.channels
  .RemoveUserGroupFromChannel(
    "<channelId>",
    [
      "<UserGroupId1>", "<UserGroupId2>",
    ],
    domainId,
    token,
  )
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.log(error);
  });

mySdk.channels
  .DeleteChannel(
    "<channelId>",
    domainId,
    token,
  )
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.log(error);
  });

mySdk.channels.ChannelParents(domainId, "<channelId>", "<parentId>", token)
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.log(error);
  });

mySdk.channels.DeleteChannelParents(domainId, "<channelId>", token)
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.log(error);
  });
