import SDK from "../src/sdk";

const defaultUrl = "http://localhost";

const mySdk = new SDK({
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
    token
  )
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });

mySdk.groups
  .Group("<groupId>", domainId, token)
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });

mySdk.groups
  .Groups({ offset: 0, limit: 10 }, domainId, token)
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });

mySdk.groups
  .UpdateGroup(
    {
      name: "<groupName>",
      id: "<groupId>",
    },
    domainId,
    token
  )
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });

mySdk.groups
  .EnableGroup("<groupId>", domainId, token)
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });

mySdk.groups
  .DisableGroup("<groupId>", domainId, token)
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });

mySdk.groups
  .DeleteGroup("<groupId>", domainId, token)
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });

mySdk.groups
  .AddParentGroup("<groupId>", domainId, "<parentId>", token)
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });

mySdk.groups
  .RetrieveGroupHierarchy("<groupId>", domainId, { direction: 1 }, token)
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });

mySdk.groups
  .RemoveParentGroup("<groupId>", domainId, token)
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });

mySdk.groups
  .AddChildrenGroups("<groupId>", domainId, ["<groupId>", "<groupId>"], token)
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });

mySdk.groups
  .RemoveChildrenGroups(
    "<groupId>",
    domainId,
    ["<groupId>", "<groupId>"],
    token
  )
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });

mySdk.groups
  .RemoveAllChildrenGroups("<groupId>", domainId, token)
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });

mySdk.groups
  .ListChildrenGroups("<groupId>", domainId, { offset: 0, limit: 10 }, token)
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });

mySdk.groups
  .ListGroupActions(domainId, token)
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });

mySdk.groups
  .CreateGroupRole("<groupId>", domainId, "<roleName>", token)
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });

mySdk.groups
  .ListGroupRoles("<groupId>", domainId, { offset: 0, limit: 10 }, token)
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });

mySdk.groups
  .ViewGroupRole("<groupId>", domainId, "<roleName>", token)
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });

mySdk.groups
  .UpdateGroupRole(
    "<groupId>",
    domainId,
    "<updatedRoleName>",
    { name: "<roleName>" },
    token
  )
  .then((response: any) => {
    console.log("response: ", response);
  })
  .then((error) => {
    console.error(error);
  });

mySdk.groups
  .DeleteGroupRole("<groupId>", domainId, "<roleName>", token)
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });

mySdk.groups
  .AddGroupRoleActions(
    "<groupId>",
    domainId,
    "<roleName>",
    ["<action>", "<action>"],
    token
  )
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });

mySdk.groups
  .ListGroupRoleActions("<groupId>", domainId, "<roleName>", token)
  .then((response) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });

mySdk.groups
  .DeleteGroupRoleActions(
    "<groupId>",
    domainId,
    "<roleName>",
    ["<action>"],
    token
  )
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });

mySdk.groups
  .DeleteAllGroupRoleActions("<groupId>", domainId, "<roleName>", token)
  .then((response) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });

mySdk.groups
  .AddGroupRoleMembers("<groupId>", domainId, "<roleName>", ["<userId>"], token)
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });

mySdk.groups
  .ListGroupRoleMembers(
    "<groupId>",
    domainId,
    "<roleName>",
    { offset: 0, limit: 10 },
    token
  )
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });

mySdk.groups
  .DeleteGroupRoleMembers(
    "<groupId>",
    domainId,
    "<roleName>",
    ["<userId>"],
    token
  )
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });

mySdk.groups
  .DeleteAllGroupRoleMembers("<groupId>", domainId, "<roleName>", token)
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });
