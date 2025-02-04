// Copyright (c) Abstract Machines
// SPDX-License-Identifier: Apache-2.0

import SDK from "../src/sdk";

const defaultUrl = "http://localhost";

const mySdk = new SDK({
  clientsUrl: `${defaultUrl}:9006`,
});

const token = "<token>";
const domainId = "<domainId>";

mySdk.clients
  .CreateClient({ name: "<clientName>" }, domainId, token)
  .then((response: any) => {
    console.log("response:", response);
  })
  .catch((error) => {
    console.error(error);
  });

mySdk.clients
  .Disable("<clientId>", domainId, token)
  .then((response: any) => {
    console.log("response:", response);
  })
  .catch((error) => {
    console.error(error);
  });

mySdk.clients
  .Enable("<clientId>", domainId, token)
  .then((response: any) => {
    console.log("response:", response);
  })
  .catch((error) => {
    console.error(error);
  });

mySdk.clients
  .UpdateClient({ id: "<clientId>", name: "<clientName>" }, domainId, token)
  .then((response: any) => {
    console.log("response:", response);
  })
  .catch((error) => {
    console.error(error);
  });

mySdk.clients
  .UpdateClientSecret(
    { id: "<clientId>", credentials: { secret: "newSecret" } },
    domainId,
    token
  )
  .then((response: any) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });

mySdk.clients
  .UpdateClientTags(
    { id: "<clientId>", tags: ["<tag1>", "<tag2>"] },
    domainId,
    token
  )
  .then((response: any) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });

mySdk.clients
  .Clients({ offset: 0, limit: 10 }, domainId, token)
  .then((response: any) => {
    console.log("response:", response);
  })
  .catch((error) => {
    console.error(error);
  });

mySdk.clients
  .Client("<clientId>", domainId, token)
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });

mySdk.clients
  .DeleteClient("<clientId>", domainId, token)
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });

mySdk.clients
  .setClientParentGroup(domainId, "<clientId>", "<parentGroupId>", token)
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });

mySdk.clients
  .DeleteClientParentGroup(domainId, "<clientId>", token)
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });

mySdk.clients
  .CreateClients(
    [{ name: "<clientName1>" }, { name: "<clientName2>" }],
    domainId,
    token
  )
  .then((response: any) => {
    console.log("response:", response);
  })
  .catch((error) => {
    console.error(error);
  });

mySdk.clients
  .ListClientActions(domainId, token)
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });

mySdk.clients
  .CreateClientRole("<clientId>", "<roleName>", domainId, token)
  .then((response) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });

mySdk.clients
  .ListClientRoles("<clientId>", domainId, { offset: 0, limit: 10 }, token)
  .then((response) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });

mySdk.clients
  .ViewClientRole("<clientId>", domainId, "<roleId>", token)
  .then((response) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });

mySdk.clients
  .UpdateClientRole(
    "<clientId>",
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

mySdk.clients
  .DeleteClientRole("<clientId>", domainId, "<roleId>", token)
  .then((response) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });

mySdk.clients
  .AddClientRoleActions(
    "<clientId>",
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

mySdk.clients
  .ListClientRoleActions("<clientId>", domainId, "<roleId>", token)
  .then((response) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });

mySdk.clients
  .DeleteClientRoleActions(
    "<clientId>",
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

mySdk.clients
  .DeleteAllClientRoleActions("<clientId>", domainId, "<roleId>", token)
  .then((response) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });

mySdk.clients
  .AddClientRoleMembers(
    "<clientId>",
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

mySdk.clients
  .ListClientRoleMembers(
    "<clientId>",
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

mySdk.clients
  .DeleteClientRoleMembers(
    "<clientId>",
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

mySdk.clients
  .DeleteAllClientRoleMembers("<clientId>", domainId, "<roleId>", token)
  .then((response) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });

mySdk.clients
  .ListClientMembers("<clientId>", domainId, { offset: 0, limit: 10 }, token)
  .then((response) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });
