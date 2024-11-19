// Import the SDK class from the mainflux-sdk package
import SDK from "../src/sdk";

const defaultUrl = "http://localhost";

const mySdk = new SDK({
  usersUrl: `${defaultUrl}:9002`,
  groupsUrl: `${defaultUrl}:9004`,
});

const token = "<token>";
const domainId = "<domainId>";

mySdk.groups
  .CreateGroup(
    {
      name: "<groupName>",
    },
    domainId,
    token,
  )
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.log(error);
  });

mySdk.groups
  .Group(
    "<groupID>",
    domainId,
    token,
  )
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.log(error);
  });

mySdk.groups
  .Groups(
    { offset: 0, limit: 10 },
    domainId,
    token,
  )
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.log(error);
  });

mySdk.groups
  .GroupPermissions(
    "<groupID>",
    domainId,
    token,
  )
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.log(error);
  });

mySdk.groups
  .UpdateGroup(
    {
      name: "<groupName>",
      id: "<groupID>",
    },
    domainId,
    token,
  )
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.log(error);
  });

mySdk.groups
  .EnableGroup(
    "<groupID>",
    domainId,
    token,
  )
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.log(error);
  });

mySdk.groups
  .DisableGroup(
    "<groupID>",
    domainId,
    token,
  )
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.log(error);
  });

mySdk.groups
  .DeleteGroup(
    "<groupID>",
    domainId,
    token,
  )
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.log(error);
  });

mySdk.groups
  .AddUserToGroup(
    "<groupID>",
    ["<userID>", "<userID>"],
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

mySdk.groups
  .RemoveUserFromGroup(
    "<groupID>",
    ["<userID>", "<userID>"],
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

mySdk.groups
  .ListGroupUsers(
    "<groupID>",
    { offset: 0, limit: 10 },
    domainId,
    token,
  )
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.log(error);
  });

mySdk.groups
  .ListGroupChannels(
    "<groupID>",
    { offset: 0, limit: 10 },
    domainId,
    token,
  )
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.log(error);
  });

mySdk.groups
  .Children(
    "<groupID>",
    { offset: 0, limit: 10, level: 2 },
    domainId,
    token,
  )
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.log(error);
  });

mySdk.groups
  .Parents(
    "<groupID>",
    { offset: 0, limit: 10, level: 2 },
    domainId,
    token,
  )
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.log(error);
  });
