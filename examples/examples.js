// Import the SDK class from the mainflux-sdk package
// import SDK from '../mainflux/sdk.js';
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
/*
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
    <channel_id>",
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
*/

//Users.js
/*
mySdk.users.Create(
    { "credentials": { "identity": "<user_email>", "secret": "<user_secret>" } },
    "<token>"
)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error.response.data);
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
    { "id": "<user_id>", "owner": "<owner_identity> },
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
*/

//Groups.js
/*
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
*/

//Channels.js
/*
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
*/

//Certs.js
/*
mySdk.certs.Issue(
    "d6c81ec9-5187-4335-af37-9fcf57af7c3b",
    "10h",
    "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTQ4MjYzNjcsImlhdCI6MTY5NDc3MjM2NywiaWRlbnRpdHkiOiJhZG1pbkBleGFtcGxlLmNvbSIsImlzcyI6ImNsaWVudHMuYXV0aCIsInN1YiI6IjRhNDA3MTBlLTgyNTgtNDc0Ni05MTZmLWE4NzY3MDM2MzNkNyIsInR5cGUiOiJhY2Nlc3MifQ.khxEjSpbYfKrBF-FKTuYg3MIffjQXQHzGCLmR2pImdgNKoouHvRLLAfQlIQbX49zE_UvEi6xupVR55u7kjLfuw"
)
    .then(result => {
        console.log(result);
    })
    .catch(error => {
        console.error(error);
    });

mySdk.certs.View_by_thing(
    "d6c81ec9-5187-4335-af37-9fcf57af7c3b",
    "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTQ4MjYzNjcsImlhdCI6MTY5NDc3MjM2NywiaWRlbnRpdHkiOiJhZG1pbkBleGFtcGxlLmNvbSIsImlzcyI6ImNsaWVudHMuYXV0aCIsInN1YiI6IjRhNDA3MTBlLTgyNTgtNDc0Ni05MTZmLWE4NzY3MDM2MzNkNyIsInR5cGUiOiJhY2Nlc3MifQ.khxEjSpbYfKrBF-FKTuYg3MIffjQXQHzGCLmR2pImdgNKoouHvRLLAfQlIQbX49zE_UvEi6xupVR55u7kjLfuw"
)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error.response.data);
    });

mySdk.certs.View_by_serial(
    "7c:12:d6:ea:c0:29:d3:5e:59:c8:4d:eb:3e:f9:f8:92:b2:26:46:3c",
    "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTQ4MjYzNjcsImlhdCI6MTY5NDc3MjM2NywiaWRlbnRpdHkiOiJhZG1pbkBleGFtcGxlLmNvbSIsImlzcyI6ImNsaWVudHMuYXV0aCIsInN1YiI6IjRhNDA3MTBlLTgyNTgtNDc0Ni05MTZmLWE4NzY3MDM2MzNkNyIsInR5cGUiOiJhY2Nlc3MifQ.khxEjSpbYfKrBF-FKTuYg3MIffjQXQHzGCLmR2pImdgNKoouHvRLLAfQlIQbX49zE_UvEi6xupVR55u7kjLfuw"
)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error.response.data);
    });

mySdk.certs.Revoke(
    "d6c81ec9-5187-4335-af37-9fcf57af7c3b",
    "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTQ4MjYzNjcsImlhdCI6MTY5NDc3MjM2NywiaWRlbnRpdHkiOiJhZG1pbkBleGFtcGxlLmNvbSIsImlzcyI6ImNsaWVudHMuYXV0aCIsInN1YiI6IjRhNDA3MTBlLTgyNTgtNDc0Ni05MTZmLWE4NzY3MDM2MzNkNyIsInR5cGUiOiJhY2Nlc3MifQ.khxEjSpbYfKrBF-FKTuYg3MIffjQXQHzGCLmR2pImdgNKoouHvRLLAfQlIQbX49zE_UvEi6xupVR55u7kjLfuw"
)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error.response.data);
    });
*/

// Bootstrap.js
/*
mySdk.bootstrap.Create(
    {
        "external_id": "012",
        "external_key": "345",
        "thing_id": "77cbb344-7c41-47f3-a53a-a3d435b67207",
        "name": "percius"
    },
    "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTYwMzc4NjQsImlhdCI6MTY5NTk4Mzg2NCwiaWRlbnRpdHkiOiJhZG1pbkBleGFtcGxlLmNvbSIsImlzcyI6ImNsaWVudHMuYXV0aCIsInN1YiI6IjViNDA3MTgzLTEwNGYtNDc2NC04MDYyLTg3ZGQ2MTM5MTA0NiIsInR5cGUiOiJhY2Nlc3MifQ.6c3SW6ejKn9SzPSDws10FEKb7WyC_3bOlyvKcdMIZGyL7Zu3hB6ghlpwBG7pwEoXJpi9gOCASchZlGCZrDdgVQ"
)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error.response.data);
    });

mySdk.bootstrap.Whitelist(
    {
        "external_id": "012",
        "external_key": "345",
        "thing_id": "77cbb344-7c41-47f3-a53a-a3d435b67207",
        "name": "perseus"

    },
    "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTYwMzc4NjQsImlhdCI6MTY5NTk4Mzg2NCwiaWRlbnRpdHkiOiJhZG1pbkBleGFtcGxlLmNvbSIsImlzcyI6ImNsaWVudHMuYXV0aCIsInN1YiI6IjViNDA3MTgzLTEwNGYtNDc2NC04MDYyLTg3ZGQ2MTM5MTA0NiIsInR5cGUiOiJhY2Nlc3MifQ.6c3SW6ejKn9SzPSDws10FEKb7WyC_3bOlyvKcdMIZGyL7Zu3hB6ghlpwBG7pwEoXJpi9gOCASchZlGCZrDdgVQ"
)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error.response.data);
    });

mySdk.bootstrap.Update(
    {
        "thing_id": "77cbb344-7c41-47f3-a53a-a3d435b67207",
        "name": "perseus"
    },
    "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTYwMzc4NjQsImlhdCI6MTY5NTk4Mzg2NCwiaWRlbnRpdHkiOiJhZG1pbkBleGFtcGxlLmNvbSIsImlzcyI6ImNsaWVudHMuYXV0aCIsInN1YiI6IjViNDA3MTgzLTEwNGYtNDc2NC04MDYyLTg3ZGQ2MTM5MTA0NiIsInR5cGUiOiJhY2Nlc3MifQ.6c3SW6ejKn9SzPSDws10FEKb7WyC_3bOlyvKcdMIZGyL7Zu3hB6ghlpwBG7pwEoXJpi9gOCASchZlGCZrDdgVQ"
)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error.response.data);
    });

mySdk.bootstrap.View(
    "77cbb344-7c41-47f3-a53a-a3d435b67207",
    "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTYwMzc4NjQsImlhdCI6MTY5NTk4Mzg2NCwiaWRlbnRpdHkiOiJhZG1pbkBleGFtcGxlLmNvbSIsImlzcyI6ImNsaWVudHMuYXV0aCIsInN1YiI6IjViNDA3MTgzLTEwNGYtNDc2NC04MDYyLTg3ZGQ2MTM5MTA0NiIsInR5cGUiOiJhY2Nlc3MifQ.6c3SW6ejKn9SzPSDws10FEKb7WyC_3bOlyvKcdMIZGyL7Zu3hB6ghlpwBG7pwEoXJpi9gOCASchZlGCZrDdgVQ"
)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error.response.data);
    });

mySdk.bootstrap.UpdateCerts(
    "77cbb344-7c41-47f3-a53a-a3d435b67207",
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
    "77cbb344-7c41-47f3-a53a-a3d435b67207",
    "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTYwMzc4NjQsImlhdCI6MTY5NTk4Mzg2NCwiaWRlbnRpdHkiOiJhZG1pbkBleGFtcGxlLmNvbSIsImlzcyI6ImNsaWVudHMuYXV0aCIsInN1YiI6IjViNDA3MTgzLTEwNGYtNDc2NC04MDYyLTg3ZGQ2MTM5MTA0NiIsInR5cGUiOiJhY2Nlc3MifQ.6c3SW6ejKn9SzPSDws10FEKb7WyC_3bOlyvKcdMIZGyL7Zu3hB6ghlpwBG7pwEoXJpi9gOCASchZlGCZrDdgVQ"
)
    .then(response => {
        console.log(response);
    })   
    .catch(error => {
        console.error(error.response.data);
    });

mySdk.bootstrap.Bootstrap(
    "456",
    "789"
)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error.response.data);
    });
*/

//Messages.js
/*
mySdk.messages.Send(
    "2b86beba-83dd-4b39-8165-4dda4e6eb4ad",
    '[{"bn":"demo", "bu":"V", "n":"voltage", "u":"V", "v":5}]',
    "fc68b31b-d7fd-4879-b3a7-0baf4580c5b1"
)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error.response.data);
    });

mySdk.messages.Read(
    "2b86beba-83dd-4b39-8165-4dda4e6eb4ad",
    "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTYwMzc4NjQsImlhdCI6MTY5NTk4Mzg2NCwiaWRlbnRpdHkiOiJhZG1pbkBleGFtcGxlLmNvbSIsImlzcyI6ImNsaWVudHMuYXV0aCIsInN1YiI6IjViNDA3MTgzLTEwNGYtNDc2NC04MDYyLTg3ZGQ2MTM5MTA0NiIsInR5cGUiOiJhY2Nlc3MifQ.6c3SW6ejKn9SzPSDws10FEKb7WyC_3bOlyvKcdMIZGyL7Zu3hB6ghlpwBG7pwEoXJpi9gOCASchZlGCZrDdgVQ"
)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error.response.data);
    });
*/
