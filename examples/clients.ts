// Import the SDK class from the mainflux-sdk package
import SDK from "../src/sdk";

const defaultUrl = "http://localhost";

const mySdk = new SDK({
  clientsUrl: `${defaultUrl}:9006`,
  usersUrl: `${defaultUrl}:9002`,
});

// clients.ts examples.

const domainId = "f86fe07c-90dd-4bfc-95b7-6311e2d908ba";
const token = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MzIxOTM5NTAsImlhdCI6MTczMjE5MDM1MCwiaXNzIjoibWFnaXN0cmFsYS5hdXRoIiwidHlwZSI6MCwidXNlciI6IjcyYjcyMTZiLWNmODktNDdlNS04ZDlhLWJlNGYwMzkyNTJmZiJ9.uVCIfSvZJsz-EAp2mIBrIZChGyDa8gcrpcwT8Ionq0LZd3OSlqkWM1cT7CLPXuzaMwNmSToKNvePP340yM4mOA";

// mySdk.clients
//   .CreateClient({ name: "Arya" }, domainId, token)
//   .then((response: any) => {
//     console.log("response:", response);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

// mySdk.clients
//   .Disable("<clientId>", domainId, token)
//   .then((response: any) => {
//     console.log("response:", response);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

// mySdk.clients
//   .Enable("<clientId>", domainId, token)
//   .then((response: any) => {
//     console.log("response:", response);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

// mySdk.clients
//   .UpdateClient({ id: "<clientId>", name: "Client 1" }, domainId, token)
//   .then((response: any) => {
//     console.log("response:", response);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

// mySdk.clients
//   .UpdateClientSecret({ id: "<clientId>", credentials: { secret: "newSecret" } }, domainId, token)
//   .then((response: any) => {
//     console.log(response);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

// mySdk.clients
//   .UpdateClientTags(
//     { id: "<clientId>", tags: ["<tag1>", "<tag2>"] },
//     domainId,
//     token,
//   )
//   .then((response: any) => {
//     console.log(response);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

// mySdk.clients
//   .Clients({ offset: 0, limit: 10 }, domainId, token)
//   .then((response: any) => {
//     console.log("response:", response);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

// mySdk.clients
//   .Client("<clientId>", domainId, token)
//   .then((response: any) => {
//     console.log("response: ", response);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

// mySdk.clients
//   .DeleteClient("<clientId>", domainId, token)
//   .then((response: any) => {
//     console.log("response: ", response);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

mySdk.clients
  .ListUserClients(
    "8bd6c0e0-f4e7-4fb5-87f0-3c292415f717",
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

// mySdk.clients.ClientParents(domainId, "<clientId>", "<parentGroupId>", token)
//   .then((response: any) => {
//     console.log("response: ", response);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

// mySdk.clients.DeleteClientParents(domainId, "<clientId>", token)
//   .then((response: any) => {
//     console.log("response: ", response);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

// mySdk.clients
//   .CreateClients([{ name: "<clientName1>" }, { name: "<clientName2>" }], domainId, token)
//   .then((response: any) => {
//     console.log("response:", response);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

// mySdk.clients
//   .CreateClientRole("ef388650-d06a-4d37-b2e5-b25e98d88abb", "Essos", domainId, token)
//   .then((response) => {
//     console.log("response: ", response);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

// mySdk.clients
//   .ListClientRoles("ef388650-d06a-4d37-b2e5-b25e98d88abb", domainId, { offset: 0, limit: 10 }, token)
//   .then((response) => {
//     console.log("response: ", response);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

// mySdk.clients
//   .ViewClientRole("ef388650-d06a-4d37-b2e5-b25e98d88abb", domainId, "Wicked", token)
//   .then((response) => {
//     console.log("response: ", response);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

// mySdk.clients
//   .UpdateClientRole(
//     "ef388650-d06a-4d37-b2e5-b25e98d88abb",
//     domainId,
//     "Wicked",
//     { name: "Westeros" },
//     token
//   )
//   .then((response) => {
//     console.log("response: ", response);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

// mySdk.clients
//   .DeleteClientRole("ef388650-d06a-4d37-b2e5-b25e98d88abb", domainId, "Essos", token)
//   .then((response) => {
//     console.log("response: ", response);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

// mySdk.clients
//   .AddClientRoleActions(
//     "ef388650-d06a-4d37-b2e5-b25e98d88abb",
//     domainId,
//     "Westeros",
//     ["read", "update"],
//     token
//   )
//   .then((response) => {
//     console.log("response: ", response);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

// mySdk.clients
//   .ListClientRoleActions("ef388650-d06a-4d37-b2e5-b25e98d88abb", domainId, "Westeros", token)
//   .then((response) => {
//     console.log("response: ", response);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

// mySdk.clients
//   .DeleteClientRoleActions(
//     "ef388650-d06a-4d37-b2e5-b25e98d88abb",
//     domainId,
//     "Westeros",
//     ["read"],
//     token
//   )
//   .then((response) => {
//     console.log("response: ", response);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

// mySdk.clients
//   .DeleteAllClientRoleActions("ef388650-d06a-4d37-b2e5-b25e98d88abb", domainId, "Westeros", token)
//   .then((response) => {
//     console.log("response: ", response);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

// mySdk.clients
//   .AddClientRoleMembers("ef388650-d06a-4d37-b2e5-b25e98d88abb", domainId, "Westeros", ["2144a485-e52e-4b78-9aca-9e9868aa5948"], token)
//   .then((response) => {
//     console.log("response: ", response);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

// mySdk.clients
//   .ListClientRoleMembers(
//     "ef388650-d06a-4d37-b2e5-b25e98d88abb",
//     domainId,
//     "Westeros",
//     { offset: 0, limit: 10 },
//     token
//   )
//   .then((response) => {
//     console.log("response: ", response);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

// mySdk.clients
//   .DeleteClientRoleMembers(
//     "ef388650-d06a-4d37-b2e5-b25e98d88abb",
//     domainId,
//     "Westeros",
//     ["2144a485-e52e-4b78-9aca-9e9868aa5948"],
//     token
//   )
//   .then((response) => {
//     console.log("response: ", response);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

// mySdk.clients
//   .DeleteAllClientRoleMembers("ef388650-d06a-4d37-b2e5-b25e98d88abb", domainId, "Westeros", token)
//   .then((response) => {
//     console.log("response: ", response);
//   })
//   .catch((error) => {
//     console.error(error);
//   });
