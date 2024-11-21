// Import the SDK class from the mainflux-sdk package
import SDK from "../src/sdk";

const defaultUrl = "http://localhost";

const mySdk = new SDK({
  clientsUrl: `${defaultUrl}:9006`,
  usersUrl: `${defaultUrl}:9002`,
});

// clients.ts examples.

const domainId = "f86fe07c-90dd-4bfc-95b7-6311e2d908ba";
const token = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MzIxNDg3ODIsImlhdCI6MTczMjE0NTE4MiwiaXNzIjoibWFnaXN0cmFsYS5hdXRoIiwidHlwZSI6MCwidXNlciI6IjcyYjcyMTZiLWNmODktNDdlNS04ZDlhLWJlNGYwMzkyNTJmZiJ9.baSQ_lRLUsrP6jqF1AZHk_ryxxe7org3txWg90_sSG2_SrybaYxFxU4Ygp19lNXs52NgNuL6ln_fLkvazEOR6A";

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
  .UpdateClient({ id: "<clientId>", name: "Client 1" }, domainId, token)
  .then((response: any) => {
    console.log("response:", response);
  })
  .catch((error) => {
    console.error(error);
  });

mySdk.clients
  .UpdateClientSecret({ id: "<clientId>", credentials: { secret: "newSecret" } }, domainId, token)
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
    token,
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
  .ListUserClients(
    "<userId>",
    { offset: 0, limit: 10 },
    domainId,
    token,
  )
  .then((response: any) => {
    console.log("response:", response);
  })
  .catch((error) => {
    console.log(error);
  });

mySdk.clients.ClientParents(domainId, "<clientId>", "<parentGroupId>", token)
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });

mySdk.clients.DeleteClientParents(domainId, "<clientId>", token)
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });

mySdk.clients
  .CreateClients([{ name: "<clientName1>" }, { name: "<clientName2>" }], domainId, token)
  .then((response: any) => {
    console.log("response:", response);
  })
  .catch((error) => {
    console.error(error);
  });

mySdk.clients
  .CreateClientRole("<clientId>", "<clientName>", domainId, token)
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
  .ViewClientRole("<clientId>", domainId, "<clientName>", token)
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
    "<clientName>",
    { name: "<updatedClientName>" },
    token
  )
  .then((response) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });

mySdk.clients
  .DeleteClientRole("2bf128e4-a1f6-401b-95ce-556d436ecebc", domainId, "<clientName>", token)
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
    "<clientName>",
    ["<roleAction1>", "<roleAction2>"],
    token
  )
  .then((response) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });

mySdk.clients
  .ListClientRoleActions("<clientId>", domainId, "<clientName>", token)
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
    "<roleName>",
    ["<roleAction1>", "<roleAction2>"],
    token
  )
  .then((response) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });

mySdk.clients
  .DeleteAllClientRoleActions("<clientId>", domainId, "<roleName>", token)
  .then((response) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });

mySdk.clients
  .AddClientRoleMembers("<clientId>", domainId, "<roleName>", ["<userID>", "<userID>"], token)
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
    "<roleName>",
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
    "<roleName>",
    ["<userID>", "<userID>"],
    token
  )
  .then((response) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });

mySdk.clients
  .DeleteAllClientRoleMembers("<clientId>", domainId, "<roleName>", token)
  .then((response) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });
