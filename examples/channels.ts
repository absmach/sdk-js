// Copyright (c) Abstract Machines
// SPDX-License-Identifier: Apache-2.0

import SDK from "../src/sdk";

const defaultUrl = "http://localhost";

const mySdk = new SDK({
  channelsUrl: `${defaultUrl}:9005`,
});

const token = "<token>";
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
  .CreateChannels(
    [{ name: "<channelName1>" }, { name: "<channelName2>" }],
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
    token
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
    token
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
    token
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
    token
  )
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });

mySdk.channels
  .SetChannelParentGroup(domainId, "<channelId>", "<parentGroupId>", token)
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });

mySdk.channels
  .DeleteChannelParentGroup(domainId, "<channelId>", token)
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });

mySdk.channels
  .DeleteChannel("<channelId>", domainId, token)
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });

mySdk.channels
  .ListChannelActions(domainId, token)
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });

mySdk.channels
  .CreateChannelRole("<channelId>", "<roleName>", domainId, token)
  .then((response) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });

mySdk.channels
  .ListChannelRoles("<channelId>", domainId, { offset: 0, limit: 10 }, token)
  .then((response) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });

mySdk.channels
  .ViewChannelRole("<channelId>", domainId, "<roleId>", token)
  .then((response) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });

mySdk.channels
  .UpdateChannelRole(
    "<channelId>",
    domainId,
    "<roleId>",
    { name: "<updatedRoleName>" },
    token
  )
  .then((response) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });

mySdk.channels
  .DeleteChannelRole("<channelId>", domainId, "<roleId>", token)
  .then((response) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });

mySdk.channels
  .AddChannelRoleActions(
    "<channelId>",
    domainId,
    "<roleId>",
    ["<action>", "<action>"],
    token
  )
  .then((response) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });

mySdk.channels
  .ListChannelRoleActions("<channelId>", domainId, "<roleId>", token)
  .then((response) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });

mySdk.channels
  .DeleteChannelRoleActions(
    "<channelId>",
    domainId,
    "<roleId>",
    ["<action>", "<action>"],
    token
  )
  .then((response) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });

mySdk.channels
  .DeleteAllChannelRoleActions("<channelId>", domainId, "<roleId>", token)
  .then((response) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });

mySdk.channels
  .AddChannelRoleMembers(
    "<channelId>",
    domainId,
    "<roleId>",
    ["<userId>", "<userId>"],
    token
  )
  .then((response) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });

mySdk.channels
  .ListChannelRoleMembers(
    "<channelId>",
    domainId,
    "<roleId>",
    { offset: 0, limit: 10 },
    token
  )
  .then((response) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });

mySdk.channels
  .DeleteChannelRoleMembers(
    "<channelId>",
    domainId,
    "<roleId>",
    ["<userId>", "<userId>"],
    token
  )
  .then((response) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });

mySdk.channels
  .DeleteAllChannelRoleMembers("<channelId>", domainId, "<roleId>", token)
  .then((response) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });

mySdk.channels
  .ListChannelMembers("<channelId>", domainId, { offset: 0, limit: 10 }, token)
  .then((response) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });
