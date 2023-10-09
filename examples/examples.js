// Import the SDK class from the mainflux-sdk package
const SDK = require("../mainflux/sdk");

const defaultUrl = "http://localhost";

const mySdk = new SDK({
    usersUrl: defaultUrl + ":9002",
    groupsUrl: defaultUrl + ":9002",
    thingsUrl: defaultUrl + ":9000",
    channelsUrl: defaultUrl + ":9000",
    httpadapterUrl: defaultUrl,
    readersUrl: defaultUrl + ":9011",
    certsUrl: defaultUrl + ":9019",
    bootstrapsUrl: defaultUrl + ":9013",
});

//Things.js examples.

mySdk.things.Create(
    { "name": "<thing_name>"},
    "<token>"
)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error.response.data);
    });

mySdk.things.Get(
    "<thing_id>",
    "<token>"
)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error.response.data);
    });

mySdk.things.CreateBulk(
    [{ "name": "<thing_name>" }, { "name": "<thing_name>" }],
    "<token>"
)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error.response.data);
    });

mySdk.things.GetAll(
    { "offset": 0, "limit": 10 },
    "<token>"
)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error.response.data);
    });

mySdk.things.Disable(
    "<thing_id>",
    "<token>"
)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error.response.data);
    });

mySdk.things.Update(
    "<thing_id>",
    { "name": "<thing_name>" },
    "<token>"
)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error.response.data);
    });

mySdk.things.UpdateThingSecret(
    "<thing_id>",
    { "secret": "<thing_secret>" },
    "<token>"
)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error.response.data);
    });

mySdk.things.UpdateThingTags(
    "<thing_id>",
    { "tags": ["stheno", "euryale"] },
    "<token>"
)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error.response.data);
    });

mySdk.things.UpdateThingOwner(
    "<thing_id>",
    { "owner": "<thing_owner>" },
    "<token>"
)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error.response.data);
    });

mySdk.things.Connect(
    "<thing_id>",
    "<channel_id>",
    ["action"],
    "token"
)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error.response.data);
    });

mySdk.things.Disconnect(
    ["<thing_id>"],
    ["<channel_id>"],
    "<token>"
)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error.response.data);
    });

mySdk.things.Connects(
    ["<thing_id>", "<thing_id>"],
    ["<channel_id>", "<channel_id>"],
    ["<action>", "<action>", "<action>"],
    "<token>"
)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error.response.data);
    });

mySdk.things.GetByChannel(
    "<thing_id>",
    { "offset": 0, "limit": 5 },
    "<token>"
)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error.response.data);
    });

mySdk.things.IdentifyThing({
    "secret": "<thing_secret>"
  })
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error.response.data);
    });

mySdk.things.AuthoriseThing(
    "<thing_id>",
    "<channel_id>",
    "<action>",
    "<enity_type>",
    "<token>"
)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error.response.data);
    });


//Users.js

mySdk.users.Create(
    { "credentials": { "identity": "<user_email>", "secret": "<user_secret>" } },
    "<token>"
)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error.response);
    });

mySdk.users.Get(
    "<user_id>",
    "<token>"
)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error.response.data);
    });

mySdk.users.Login(
    { "identity": "<user_id>", "secret": "<user_secret>" }
)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error);
    });

mySdk.users.RefreshToken(
    "<user_id>",
    "<token>"
)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error.response.data);
    });

mySdk.users.Update(
    { "id": "<user_id>", "name": "<user_name>" },
    "<token>"
)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error.response.data);
    });

mySdk.users.UpdateUserIdentity(
    { "id": "<user_id>", "identity": "<user_identity>" },
    "<token>"
)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error.response.data);
    });

mySdk.users.UpdateUserTags(
    { "id": "<user_id>", "tags": ["foo", "bar"] },
    "<token>"
)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error.response.data);
    });

mySdk.users.UpdateUserOwner(
    { "id": "<user_id>", "owner": "<owner_identity>" },
    "<token>"
)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error.response.data);
    });

mySdk.users.Disable(
    { "id": "<user_id>" },
    "<token>"
)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error.response.data);
    });

mySdk.users.Enable(
    { "id": "<user_id>" },
    "<token>"
)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error.response.data);
    });

mySdk.users.GetAll(
    { "offset": 0, "limit": 10 },
    "<token>"
)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error.response.data);
    });

mySdk.users.UpdateUserPassword(
    "<old_secret>", "<new_secret>",
    "<token>"
)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error.response.data);
    });

mySdk.users.Memberships(
    "<member_id>",
    {query_params},
    "<token>"
)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error.response.data);
    });

mySdk.users.AuthoriseUser(
    "<user_id>",
    "<group_id>",
    "<action>",
    "<entity_type>",
    "<token>"
)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error.response.data);
    });


//Groups.js

mySdk.groups.Create(
    { "name": "<group_name>", "parent_id":"<parent_id>" },
    "<token>"
)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error.response.data);
    });

mySdk.groups.Get(
    "<group_id>",
    "<token>"
)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error.response.data);
    });

mySdk.groups.GetAll(
    { "offset": 0, "limit": 10 },
    "<token>"
)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error.response.data);
    });

mySdk.groups.Update(
    { "id": "<group_id>", "name": "<group_name>" },
    "<token>"
)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error.response.data);
    });

mySdk.groups.Children(
    "<group_id>",
    { "offset": 0, "limit": 2, "tree": true },
    "<token>"
)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error.response.data);
    });

mySdk.groups.Parents(
    { "id": "<group_id>" },
    { "offset": 0, "limit": 5 },
    "<token>"
)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error.response.data);
    });

mySdk.groups.Assign(
    "<group_id>",
    "<member_id>",
    ["member_type"],
    "<token>"
)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error.response.data);
    });

mySdk.groups.Unassign(
    "<members_ids>",
    "<group_id>",
    "<token>"
)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error.response.data);
    });

mySdk.groups.Disable(
    "<group_id>",
    "<token>"
)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error.response.data);
    });

mySdk.groups.Members(
    "<group_id>",
    { "offset": 0, "limit": 10 },
    "<token>"
)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error.response.data);
    });


//Channels.js

mySdk.channels.Create(
    { "name": "<channel_name>" },
    "<token>"
)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error.response.data);
    });

mySdk.channels.Get(
    "<channel_id>",
    "<token>"
)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error.response.data);
    });

mySdk.channels.CreateBulk(
    [{ "name": "<channel_name>" }, { "name": "<channel_name>" }],
    "<token>"
)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error.response.data);
    });

mySdk.channels.GetAll(
    { "offset": 0, "limit": 10},
    "<token>"
)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error.response.data);
    });

mySdk.channels.Update(
    { "id": "<channel_id>", "name": "<channel_name>" },
   "<token>"
)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error.response.data);
    });

mySdk.channels.Disable(
    { "id": "<channel_id>" },
    "<token>"
)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error.response.data);
    });

mySdk.channels.GetByThing(
    "<channel_id>",
    { "offset": 0, "limit": 5 },
    "<token>"
)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error.response.data);
    });


//Certs.js

mySdk.certs.Issue(
    "9745f2ea-f776-46b1-9b44-1cfd1ad4c6f1",
    "10h",
    "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTY1NjM2NjQsImlhdCI6MTY5NjUwOTY2NCwiaWRlbnRpdHkiOiJ3aXphcmRseV9ob3BwZXJAZW1haWwuY29tIiwiaXNzIjoiY2xpZW50cy5hdXRoIiwic3ViIjoiMGE1ZjJlMjEtMWE4Yi00NjBlLWJmYTktNzMyZTU3MGRmMDk1IiwidHlwZSI6ImFjY2VzcyJ9.RWFnWUL9JYxLjAiFfbnnW14ZCv033aux8-8qFmCqiczCNGxc6EXsy8hawuXVkCUwk0vWnCe42TieqEIwwlbvHg"
)
    .then(result => {
        console.log(result);
    })
    .catch(error => {
        console.error(error);
    });

mySdk.certs.ViewByThing(
    "<thing_id>",
    "<token>"
)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error.response.data);
    });

mySdk.certs.ViewBySerial(
    "<cert_id>",
    "<token>"
)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error.response.data);
    });

mySdk.certs.Revoke(
    "<thing_id>",
    "<token>"
)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error.response.data);
    });


// Bootstrap.js

mySdk.bootstrap.Create(
    {
        "external_id": "<external_id>",
        "external_key": "<external_key>",
        "thing_id": "<thing_id>",
        "name": "<name>"
    },
    "<token>"
)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error.response.data);
    });

mySdk.bootstrap.Whitelist(
    {
        "external_id": "<external_i>",
        "external_key": "<external_key>",
        "thing_id": "<thing_id>",
        "name": "<name>"

    },
    "<token>"
)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error.response.data);
    });

mySdk.bootstrap.Update(
    {
        "thing_id": "<thing_id>",
        "name": "<name>"
    },
    "<token>"
)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error.response.data);
    });

mySdk.bootstrap.View(
    "<thing_id>",
    "<token>"
)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error.response.data);
    });

mySdk.bootstrap.UpdateCerts(
    "<config_id>",
    "<client_cert>",
    "<client_key>",
    "<ca>",
    "<token>"
)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error.response.data);
    });

mySdk.bootstrap.Remove(
    "<config_id>",
    "<token>"
)
    .then(response => {
        console.log(response);
    })   
    .catch(error => {
        console.error(error.response.data);
    });

mySdk.bootstrap.Bootstrap(
    "<external_id>",
    "<external_key>"
)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error.response.data);
    });


//Messages.js

mySdk.messages.Send(
    "<channel_id>",
    '[{"bn":"demo", "bu":"V", "n":"voltage", "u":"V", "v":5}]',
    "<thing_key>"
)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error.response.data);
    });

mySdk.messages.Read(
    "<channel_id>",
    "<token>"
)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error.response.data);
    });
