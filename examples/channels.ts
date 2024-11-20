// Import the SDK class from the mainflux-sdk package
import SDK from "../src/sdk";

const defaultUrl = "http://localhost";

const mySdk = new SDK({
  channelsUrl: `${defaultUrl}:9005`,
});

// Channels.ts examples.

const token = "token";
const domainId = "<domainId>";

mySdk.channels
  .CreateChannel({ name: "<channelName>" }, domainId, token)
  .then((response: any) => {
    console.log("response:", response);
  })
  .catch((error) => {
    console.error(error);
  });

mySdk.channels
  .Channel("<channelId>", domainId, token)
  .then((response: any) => {
    console.log(response);
  })
  .catch((error: any) => {
    console.error(error);
  });

mySdk.channels
  .CreateChannels([{ name: "<channelName1>" }, { name: "<channelName2>" }], domainId, token)
  .then((response: any) => {
    console.log("response:", response);
  })
  .catch((error) => {
    console.error(error);
  });

mySdk.channels
  .Channels({ offset: 0, limit: 10 }, domainId, token)
  .then((response: any) => {
    console.log("response:", response);
  })
  .catch((error) => {
    console.error(error);
  });

mySdk.channels
  .UpdateChannelNameAndMetadata(
    { id: "<channelId>", name: "<channelName>", metadata: { key: "value" } },
    domainId,
    token
  )
  .then((response: any) => {
    console.log("response:", response);
  })
  .catch((error) => {
    console.error(error);
  });

mySdk.channels
  .UpdateChannelTags(
    { id: "<channelId>", tags: ["tag1", "tag2"] },
    domainId,
    token
  )
  .then((response: any) => {
    console.log("response:", response);
  })
  .catch((error) => {
    console.error(error);
  });

mySdk.channels
  .DisableChannel("<channelId>", domainId, token)
  .then((response: any) => {
    console.log("response:", response);
  })
  .catch((error) => {
    console.error(error);
  });

mySdk.channels
  .EnableChannel("<channelId>", domainId, token)
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });

mySdk.channels
  .ConnectClient(
    ["<clientId1>", "<clientId2>"],
    "<channelId>",
    ["publish"],
    domainId,
    token,
  )
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });

mySdk.channels
  .DisconnectClient(
    ["<clientId1>", "<clientId2>"],
    "<channelId>",
    ["publish"],
    domainId,
    token,
  )
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });

mySdk.channels
  .Connect(
    ["<clientId1>", "<clientId2>"],
    ["<channelId1>", "<channelId1>"],
    ["publish"],
    domainId,
    token,
  )
  .then((response: any) => {
    console.log("response:", response);
  })
  .catch((error) => {
    console.error(error);
  });

mySdk.channels
  .Disconnect(
    ["<clientId1>", "<clientId2>"],
    ["<channelId1>", "<channelId1>"],
    ["publish"],
    domainId,
    token,
  )
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });

mySdk.channels.ChannelParents(domainId, "<channelId>", "<groupParentId>", token)
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });

mySdk.channels.DeleteChannelParents(domainId, "<channelId>", token)
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
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
    console.error(error);
  });
