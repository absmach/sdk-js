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
    { "name": "hecate" },
    "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTU5NTAyODgsImlhdCI6MTY5NTg5NjI4OCwiaWRlbnRpdHkiOiJhZG1pbkBleGFtcGxlLmNvbSIsImlzcyI6ImNsaWVudHMuYXV0aCIsInN1YiI6IjViNDA3MTgzLTEwNGYtNDc2NC04MDYyLTg3ZGQ2MTM5MTA0NiIsInR5cGUiOiJhY2Nlc3MifQ.mwV_wPpu69RKi8T1BtSQLLHvgfjiRW7Jp2uvo3H4nUdxmCuxfzLBsv07V6XOVfoVrrEJ9rSLbWq6ZN6NOEZdKw"
)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error.response.data);
    });

mySdk.things.Get(
    "fd4f7da5-b7bf-49b7-bf2f-99995e78afd6",
    "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTQzOTc0NjEsImlhdCI6MTY5NDM0MzQ2MSwiaWRlbnRpdHkiOiJhZG1pbkBleGFtcGxlLmNvbSIsImlzcyI6ImNsaWVudHMuYXV0aCIsInN1YiI6ImE3MjVlMjZkLWRjMWYtNDQ1Mi04MGRjLTQxZmM2NTRhYTM4YiIsInR5cGUiOiJhY2Nlc3MifQ.gnGm9wkufCfZaH4rZ1lRpVofKEEWjRUq_DNhropP1Rk0dmZDcHJjukUHjp3SyspdSjIRXKGZv4_kWOiRMPdjsw"
)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error.response.data);
    });

mySdk.things.Create_bulk(
    [{ "name": "thing3" }, { "name": "thing4" }],
    "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTM5NzkwMTgsImlhdCI6MTY5MzkyNTAxOCwiaWRlbnRpdHkiOiJmcmllbmRseV9qb25lc0BlbWFpbC5jb20iLCJpc3MiOiJjbGllbnRzLmF1dGgiLCJzdWIiOiJiYmRlMGQzNC1hNzFmLTQ2MDItOGM0Ni0xZTcwZjk4YTdhMWMiLCJ0eXBlIjoiYWNjZXNzIn0.plbuKvE4iSHWddF5Xdy07h5MIxGZUASeiJsyL4xUAISaldNoHiJcV8iRQenzkPjsDR6sHJBzh_Ho24cjkmCIeA"
)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error.response.data);
    });

mySdk.things.Get_all(
    { "offset": 0, "limit": 3 },
    "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTQ1NTk0NzcsImlhdCI6MTY5NDUwNTQ3NywiaWRlbnRpdHkiOiJhZG1pbkBleGFtcGxlLmNvbSIsImlzcyI6ImNsaWVudHMuYXV0aCIsInN1YiI6ImE3MjVlMjZkLWRjMWYtNDQ1Mi04MGRjLTQxZmM2NTRhYTM4YiIsInR5cGUiOiJhY2Nlc3MifQ.eW2a7i0N66bhPHGPpUc0Xd_ecPv8IA1RRIXpWp6VglKjLjgxMyCp969baz2UaXxyzpukcPDiFoW-bwxtrGM_iw"
)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error.response.data);
    });

mySdk.things.Disable(
    "6cba4ea5-5820-4419-b389-86984309ad35",
    "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTQzOTc0NjEsImlhdCI6MTY5NDM0MzQ2MSwiaWRlbnRpdHkiOiJhZG1pbkBleGFtcGxlLmNvbSIsImlzcyI6ImNsaWVudHMuYXV0aCIsInN1YiI6ImE3MjVlMjZkLWRjMWYtNDQ1Mi04MGRjLTQxZmM2NTRhYTM4YiIsInR5cGUiOiJhY2Nlc3MifQ.gnGm9wkufCfZaH4rZ1lRpVofKEEWjRUq_DNhropP1Rk0dmZDcHJjukUHjp3SyspdSjIRXKGZv4_kWOiRMPdjsw"
)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error.response.data);
    });

mySdk.things.Update(
    "2bb290ff-0cb1-4f06-9da3-aff91c1d039d",
    { "name": "thing_nuts" },
    "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTQwNDYxMDQsImlhdCI6MTY5Mzk5MjEwNCwiaWRlbnRpdHkiOiJmcmllbmRseV9qb25lc0BlbWFpbC5jb20iLCJpc3MiOiJjbGllbnRzLmF1dGgiLCJzdWIiOiJiYmRlMGQzNC1hNzFmLTQ2MDItOGM0Ni0xZTcwZjk4YTdhMWMiLCJ0eXBlIjoiYWNjZXNzIn0.C6oZHB8yC4pn-ziVVYaVZG5M2pPgw6sYYHGvIwd2Me_031t5E2D_xpYxVDcQ23B4_6LMpx9JJ5eDTPUafKnk4Q"
)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error.response.data);
    });

mySdk.things.Update_thing_secret(
    "fd4f7da5-b7bf-49b7-bf2f-99995e78afd6",
    { "secret": "12345678" },
    "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTQwNDYxMDQsImlhdCI6MTY5Mzk5MjEwNCwiaWRlbnRpdHkiOiJmcmllbmRseV9qb25lc0BlbWFpbC5jb20iLCJpc3MiOiJjbGllbnRzLmF1dGgiLCJzdWIiOiJiYmRlMGQzNC1hNzFmLTQ2MDItOGM0Ni0xZTcwZjk4YTdhMWMiLCJ0eXBlIjoiYWNjZXNzIn0.C6oZHB8yC4pn-ziVVYaVZG5M2pPgw6sYYHGvIwd2Me_031t5E2D_xpYxVDcQ23B4_6LMpx9JJ5eDTPUafKnk4Q"
)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error.response.data);
    });

mySdk.things.Update_thing_tags(
    "fd4f7da5-b7bf-49b7-bf2f-99995e78afd6",
    { "tags": ["comms", "reader"] },
    "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTQwNDYxMDQsImlhdCI6MTY5Mzk5MjEwNCwiaWRlbnRpdHkiOiJmcmllbmRseV9qb25lc0BlbWFpbC5jb20iLCJpc3MiOiJjbGllbnRzLmF1dGgiLCJzdWIiOiJiYmRlMGQzNC1hNzFmLTQ2MDItOGM0Ni0xZTcwZjk4YTdhMWMiLCJ0eXBlIjoiYWNjZXNzIn0.C6oZHB8yC4pn-ziVVYaVZG5M2pPgw6sYYHGvIwd2Me_031t5E2D_xpYxVDcQ23B4_6LMpx9JJ5eDTPUafKnk4Q"
)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error.response.data);
    });

mySdk.things.Update_thing_owner(
    "fd4f7da5-b7bf-49b7-bf2f-99995e78afd6",
    { "owner": "5d971c43-913e-4ca5-83e8-3943ed478d9f" },
    "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTQwNDYxMDQsImlhdCI6MTY5Mzk5MjEwNCwiaWRlbnRpdHkiOiJmcmllbmRseV9qb25lc0BlbWFpbC5jb20iLCJpc3MiOiJjbGllbnRzLmF1dGgiLCJzdWIiOiJiYmRlMGQzNC1hNzFmLTQ2MDItOGM0Ni0xZTcwZjk4YTdhMWMiLCJ0eXBlIjoiYWNjZXNzIn0.C6oZHB8yC4pn-ziVVYaVZG5M2pPgw6sYYHGvIwd2Me_031t5E2D_xpYxVDcQ23B4_6LMpx9JJ5eDTPUafKnk4Q"
)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error.response.data);
    });

mySdk.things.Connect(
    "2bb290ff-0cb1-4f06-9da3-aff91c1d039d",
    "34ba03e3-ffde-421f-b68f-12d5e197c171",
    ["m_read"],
    "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTQzOTc0NjEsImlhdCI6MTY5NDM0MzQ2MSwiaWRlbnRpdHkiOiJhZG1pbkBleGFtcGxlLmNvbSIsImlzcyI6ImNsaWVudHMuYXV0aCIsInN1YiI6ImE3MjVlMjZkLWRjMWYtNDQ1Mi04MGRjLTQxZmM2NTRhYTM4YiIsInR5cGUiOiJhY2Nlc3MifQ.gnGm9wkufCfZaH4rZ1lRpVofKEEWjRUq_DNhropP1Rk0dmZDcHJjukUHjp3SyspdSjIRXKGZv4_kWOiRMPdjsw"
)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error.response.data);
    });

mySdk.things.Disconnect(
    ["2bb290ff-0cb1-4f06-9da3-aff91c1d039d"],
    ["34ba03e3-ffde-421f-b68f-12d5e197c171"],
    "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTQzOTc0NjEsImlhdCI6MTY5NDM0MzQ2MSwiaWRlbnRpdHkiOiJhZG1pbkBleGFtcGxlLmNvbSIsImlzcyI6ImNsaWVudHMuYXV0aCIsInN1YiI6ImE3MjVlMjZkLWRjMWYtNDQ1Mi04MGRjLTQxZmM2NTRhYTM4YiIsInR5cGUiOiJhY2Nlc3MifQ.gnGm9wkufCfZaH4rZ1lRpVofKEEWjRUq_DNhropP1Rk0dmZDcHJjukUHjp3SyspdSjIRXKGZv4_kWOiRMPdjsw"
)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error.response.data);
    });

mySdk.things.Connects(
    ["4ea328b8-0887-482c-9884-5ce92ff850c9", "abe7e909-cbc7-4525-9d65-f9ba3276ce8a"],
    ["34ba03e3-ffde-421f-b68f-12d5e197c171"],
    ["m_read", "c_list"],
    "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTQzOTc0NjEsImlhdCI6MTY5NDM0MzQ2MSwiaWRlbnRpdHkiOiJhZG1pbkBleGFtcGxlLmNvbSIsImlzcyI6ImNsaWVudHMuYXV0aCIsInN1YiI6ImE3MjVlMjZkLWRjMWYtNDQ1Mi04MGRjLTQxZmM2NTRhYTM4YiIsInR5cGUiOiJhY2Nlc3MifQ.gnGm9wkufCfZaH4rZ1lRpVofKEEWjRUq_DNhropP1Rk0dmZDcHJjukUHjp3SyspdSjIRXKGZv4_kWOiRMPdjsw"
)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error.response.data);
    });

mySdk.things.Get_by_channel(
    "4ea328b8-0887-482c-9884-5ce92ff850c9",
    { "offset": 0, "limit": 5 },
    "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTQ1NTk0NzcsImlhdCI6MTY5NDUwNTQ3NywiaWRlbnRpdHkiOiJhZG1pbkBleGFtcGxlLmNvbSIsImlzcyI6ImNsaWVudHMuYXV0aCIsInN1YiI6ImE3MjVlMjZkLWRjMWYtNDQ1Mi04MGRjLTQxZmM2NTRhYTM4YiIsInR5cGUiOiJhY2Nlc3MifQ.eW2a7i0N66bhPHGPpUc0Xd_ecPv8IA1RRIXpWp6VglKjLjgxMyCp969baz2UaXxyzpukcPDiFoW-bwxtrGM_iw"
)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error.response.data);
    });

mySdk.things.Identify_thing("12345678")
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error.response.data);
    });

mySdk.things.Authorise_thing(
    "2bb290ff-0cb1-4f06-9da3-aff91c1d039d",
    "34ba03e3-ffde-421f-b68f-12d5e197c171",
    "m_read",
    "group",
    "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTQzOTc0NjEsImlhdCI6MTY5NDM0MzQ2MSwiaWRlbnRpdHkiOiJhZG1pbkBleGFtcGxlLmNvbSIsImlzcyI6ImNsaWVudHMuYXV0aCIsInN1YiI6ImE3MjVlMjZkLWRjMWYtNDQ1Mi04MGRjLTQxZmM2NTRhYTM4YiIsInR5cGUiOiJhY2Nlc3MifQ.gnGm9wkufCfZaH4rZ1lRpVofKEEWjRUq_DNhropP1Rk0dmZDcHJjukUHjp3SyspdSjIRXKGZv4_kWOiRMPdjsw"
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
    { "credentials": { "identity": "boniver@email.com", "secret": "12345678" } },
    "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTUyMjM5MTAsImlhdCI6MTY5NTE2OTkxMCwiaWRlbnRpdHkiOiJlbG9xdWVudF9nYW5ndWx5QGVtYWlsLmNvbSIsImlzcyI6ImNsaWVudHMuYXV0aCIsInN1YiI6ImQyZmQ4OWIyLWY5OGQtNDViZC1hNDY3LTZhZjYyMjVjY2I2OCIsInR5cGUiOiJhY2Nlc3MifQ.NvmdagoW9F6dNaeBZGuDXt7qD0Jr7IdGGUN60HHN0hV5QfNC2iWhSQ7o9y44Ehy_FeRDInTq5w3txnbUHDE6tQ"
)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error.response.data);
    });

mySdk.users.Get(
    "ec0879b4-48ac-4849-9fe3-b4b1e285cc88",
    "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTU0MzU0ODYsImlhdCI6MTY5NTM4MTQ4NiwiaWRlbnRpdHkiOiJhZG1pbkBleGFtcGxlLmNvbSIsImlzcyI6ImNsaWVudHMuYXV0aCIsInN1YiI6IjRhNDA3MTBlLTgyNTgtNDc0Ni05MTZmLWE4NzY3MDM2MzNkNyIsInR5cGUiOiJhY2Nlc3MifQ.5NJtCK_0kagO9ZeX3dhIMvy9yBnMkenXH9PrSGQ7Ske5K6Hzd6eBagsY8iKtZDaEBd28xUAh5sXmL_b8awlk8Q"
)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error.response.data);
    });

mySdk.users.Login(
    { "identity": "boniver@email.com", "secret": "12345678" }
)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error);
    });

mySdk.users.Refresh_token(
    "c52d-3b0d-43b9-8c3e-275c087d875af",
    "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTU0Njc4ODYsImlhdCI6MTY5NTM4MTQ4NiwiaWRlbnRpdHkiOiJhZG1pbkBleGFtcGxlLmNvbSIsImlzcyI6ImNsaWVudHMuYXV0aCIsInN1YiI6IjRhNDA3MTBlLTgyNTgtNDc0Ni05MTZmLWE4NzY3MDM2MzNkNyIsInR5cGUiOiJyZWZyZXNoIn0.BvL1-aLlA9K1aWaCVhC5DRkkf4RA4PUuwo3X4sdGipCx-V2ZLjyYtezy-glPF9LLwUBXL_c4134izH56dqO0lg"
)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error.response.data);
    });

mySdk.users.Update(
    { "id": "ec0879b4-48ac-4849-9fe3-b4b1e285cc88", "name": "simone" },
    "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTU0NjAxNjcsImlhdCI6MTY5NTQwNjE2NywiaWRlbnRpdHkiOiJhZG1pbkBleGFtcGxlLmNvbSIsImlzcyI6ImNsaWVudHMuYXV0aCIsInN1YiI6IjRhNDA3MTBlLTgyNTgtNDc0Ni05MTZmLWE4NzY3MDM2MzNkNyIsInR5cGUiOiJhY2Nlc3MifQ.eflbJEUqW6Pg6vIVcD_p0RssFTq6DcJ8QR3FxF0hIRCG0uCHMLOddvhfsr1h3O6Zmbv5RmWOAUqcrmFCzgYEsg"
)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error.response.data);
    });

mySdk.users.Update_user_identity(
    { "id": "4d9a82e2-bea4-4c24-aec0-4da57aeb8311", "identity": "fkatwigs@email.com" },
    "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTQ1NzE1OTYsImlhdCI6MTY5NDUxNzU5NiwiaWRlbnRpdHkiOiJhZG1pbkBleGFtcGxlLmNvbSIsImlzcyI6ImNsaWVudHMuYXV0aCIsInN1YiI6ImE3MjVlMjZkLWRjMWYtNDQ1Mi04MGRjLTQxZmM2NTRhYTM4YiIsInR5cGUiOiJhY2Nlc3MifQ.FiW0pphIs2sK9ilLEZU-oAsmesdOeHygT9mtYP7yhjAGFBackNhGBoouyvik623f2PM_YFKkM5sVPyPIbdfLlQ"
)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error.response.data);
    });

mySdk.users.Update_user_tags(
    { "id": "886b4266-77d1-4258-abae-2931fb4f16de", "tags": ["holy", "terrain"] },
    "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTQ1NzE1OTYsImlhdCI6MTY5NDUxNzU5NiwiaWRlbnRpdHkiOiJhZG1pbkBleGFtcGxlLmNvbSIsImlzcyI6ImNsaWVudHMuYXV0aCIsInN1YiI6ImE3MjVlMjZkLWRjMWYtNDQ1Mi04MGRjLTQxZmM2NTRhYTM4YiIsInR5cGUiOiJhY2Nlc3MifQ.FiW0pphIs2sK9ilLEZU-oAsmesdOeHygT9mtYP7yhjAGFBackNhGBoouyvik623f2PM_YFKkM5sVPyPIbdfLlQ"
)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error.response.data);
    });

mySdk.users.Update_user_owner(
    { "id": "886b4266-77d1-4258-abae-2931fb4f16de", "owner": "hozier@email.com" },
    "JhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTQ1NzE1OTYsImlhdCI6MTY5NDUxNzU5NiwiaWRlbnRpdHkiOiJhZG1pbkBleGFtcGxlLmNvbSIsImlzcyI6ImNsaWVudHMuYXV0aCIsInN1YiI6ImE3MjVlMjZkLWRjMWYtNDQ1Mi04MGRjLTQxZmM2NTRhYTM4YiIsInR5cGUiOiJhY2Nlc3MifQ.FiW0pphIs2sK9ilLEZU-oAsmesdOeHygT9mtYP7yhjAGFBackNhGBoouyvik623f2PM_YFKkM5sVPyPIbdfLlQ"
)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error.response.data);
    });

mySdk.users.Disable(
    { "id": "c565052d-3b0d-43b9-8c3e-275c087d875a" },
    "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTQ1NzkxNDMsImlhdCI6MTY5NDUyNTE0MywiaWRlbnRpdHkiOiJzaW5hdHJhQGVtYWlsLmNvbSIsImlzcyI6ImNsaWVudHMuYXV0aCIsInN1YiI6ImM1NjUwNTJkLTNiMGQtNDNiOS04YzNlLTI3NWMwODdkODc1YSIsInR5cGUiOiJhY2Nlc3MifQ.OBVLSkvCfMXW9LAjWLDZ9bznMqsqr9LEvvBckgkXQ6MZrZm3KHrwejL7tG-UNlk7lzsIsPZlZyVrSNuoKBVX2w"
)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error.response.data);
    });

mySdk.users.Enable(
    { "id": "c565052d-3b0d-43b9-8c3e-275c087d875a" },
    "JhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTQ1NzkxNDMsImlhdCI6MTY5NDUyNTE0MywiaWRlbnRpdHkiOiJzaW5hdHJhQGVtYWlsLmNvbSIsImlzcyI6ImNsaWVudHMuYXV0aCIsInN1YiI6ImM1NjUwNTJkLTNiMGQtNDNiOS04YzNlLTI3NWMwODdkODc1YSIsInR5cGUiOiJhY2Nlc3MifQ.OBVLSkvCfMXW9LAjWLDZ9bznMqsqr9LEvvBckgkXQ6MZrZm3KHrwejL7tG-UNlk7lzsIsPZlZyVrSNuoKBVX2w"
)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error.response.data);
    });

mySdk.users.Get_all(
    { "offset": 0, "limit": 10 },
    "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTYwMzc4NjQsImlhdCI6MTY5NTk4Mzg2NCwiaWRlbnRpdHkiOiJhZG1pbkBleGFtcGxlLmNvbSIsImlzcyI6ImNsaWVudHMuYXV0aCIsInN1YiI6IjViNDA3MTgzLTEwNGYtNDc2NC04MDYyLTg3ZGQ2MTM5MTA0NiIsInR5cGUiOiJhY2Nlc3MifQ.6c3SW6ejKn9SzPSDws10FEKb7WyC_3bOlyvKcdMIZGyL7Zu3hB6ghlpwBG7pwEoXJpi9gOCASchZlGCZrDdgVQ"
)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error.response.data);
    });

mySdk.users.Update_user_password(
    "12345678", "98765432",
    "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTU2Nzg4MDksImlhdCI6MTY5NTYyNDgwOSwiaWRlbnRpdHkiOiJhZG1pbkBleGFtcGxlLmNvbSIsImlzcyI6ImNsaWVudHMuYXV0aCIsInN1YiI6IjRhNDA3MTBlLTgyNTgtNDc0Ni05MTZmLWE4NzY3MDM2MzNkNyIsInR5cGUiOiJhY2Nlc3MifQ.bcvDB0pxR5fdQ15FCyiZWMswulaOn7g6yV_NfYAvP8pOGyjQBxl3mIUqQgpjSftrSa32h7Jw1V0VUlUOQiYGyw"
)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error.response.data);
    });

mySdk.users.Memberships(
    "886b4266-77d1-4258-abae-2931fb4f16de",
    { "offset": 0, "limit": 5 },
    "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTQ1NzE1OTYsImlhdCI6MTY5NDUxNzU5NiwiaWRlbnRpdHkiOiJhZG1pbkBleGFtcGxlLmNvbSIsImlzcyI6ImNsaWVudHMuYXV0aCIsInN1YiI6ImE3MjVlMjZkLWRjMWYtNDQ1Mi04MGRjLTQxZmM2NTRhYTM4YiIsInR5cGUiOiJhY2Nlc3MifQ.FiW0pphIs2sK9ilLEZU-oAsmesdOeHygT9mtYP7yhjAGFBackNhGBoouyvik623f2PM_YFKkM5sVPyPIbdfLlQ"
)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error.response.data);
    });

mySdk.users.Authorise_user(
    "886b4266-77d1-4258-abae-2931fb4f16de",
    "3ba0da3f-05ca-4093-ab0d-cdb177c3670c",
    "m_read",
    "group",
    ""
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
    { "name": "hozier", "parent_id": "290b0f49-7a57-4b8c-9e4e-fbf17c6ab7d9" },
    "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTQ2NDI2MjIsImlhdCI6MTY5NDU4ODYyMiwiaWRlbnRpdHkiOiJhZG1pbkBleGFtcGxlLmNvbSIsImlzcyI6ImNsaWVudHMuYXV0aCIsInN1YiI6ImE3MjVlMjZkLWRjMWYtNDQ1Mi04MGRjLTQxZmM2NTRhYTM4YiIsInR5cGUiOiJhY2Nlc3MifQ.0KWMwABznvZ8Lc_gKINKst4Uqmia63iXsMvStvQqYhnYt9E-HIIc7weODdOsh11iXe7NdXqMjIVNAykSZiy3Dg"
)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error.response.data);
    });

mySdk.groups.Get(
    "36c548ab-2e87-40c6-ad3e-640a8191366f",
    "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTQ2NDI2MjIsImlhdCI6MTY5NDU4ODYyMiwiaWRlbnRpdHkiOiJhZG1pbkBleGFtcGxlLmNvbSIsImlzcyI6ImNsaWVudHMuYXV0aCIsInN1YiI6ImE3MjVlMjZkLWRjMWYtNDQ1Mi04MGRjLTQxZmM2NTRhYTM4YiIsInR5cGUiOiJhY2Nlc3MifQ.0KWMwABznvZ8Lc_gKINKst4Uqmia63iXsMvStvQqYhnYt9E-HIIc7weODdOsh11iXe7NdXqMjIVNAykSZiy3Dg"
)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error.response.data);
    });

mySdk.groups.Get_all(
    { "offset": 0, "limit": 2 },
    "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTQ2NDI2MjIsImlhdCI6MTY5NDU4ODYyMiwiaWRlbnRpdHkiOiJhZG1pbkBleGFtcGxlLmNvbSIsImlzcyI6ImNsaWVudHMuYXV0aCIsInN1YiI6ImE3MjVlMjZkLWRjMWYtNDQ1Mi04MGRjLTQxZmM2NTRhYTM4YiIsInR5cGUiOiJhY2Nlc3MifQ.0KWMwABznvZ8Lc_gKINKst4Uqmia63iXsMvStvQqYhnYt9E-HIIc7weODdOsh11iXe7NdXqMjIVNAykSZiy3Dg"
)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error.response.data);
    });

mySdk.groups.Update(
    { "id": "5a40f863-06cc-4064-b021-59acaf7570e9", "name": "cardiE" },
    "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTQ2NDI2MjIsImlhdCI6MTY5NDU4ODYyMiwiaWRlbnRpdHkiOiJhZG1pbkBleGFtcGxlLmNvbSIsImlzcyI6ImNsaWVudHMuYXV0aCIsInN1YiI6ImE3MjVlMjZkLWRjMWYtNDQ1Mi04MGRjLTQxZmM2NTRhYTM4YiIsInR5cGUiOiJhY2Nlc3MifQ.0KWMwABznvZ8Lc_gKINKst4Uqmia63iXsMvStvQqYhnYt9E-HIIc7weODdOsh11iXe7NdXqMjIVNAykSZiy3Dg"
)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error.response.data);
    });

mySdk.groups.Children(
    "290b0f49-7a57-4b8c-9e4e-fbf17c6ab7d9",
    { "offset": 0, "limit": 2, "tree": true },
    "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTQ2NDI2MjIsImlhdCI6MTY5NDU4ODYyMiwiaWRlbnRpdHkiOiJhZG1pbkBleGFtcGxlLmNvbSIsImlzcyI6ImNsaWVudHMuYXV0aCIsInN1YiI6ImE3MjVlMjZkLWRjMWYtNDQ1Mi04MGRjLTQxZmM2NTRhYTM4YiIsInR5cGUiOiJhY2Nlc3MifQ.0KWMwABznvZ8Lc_gKINKst4Uqmia63iXsMvStvQqYhnYt9E-HIIc7weODdOsh11iXe7NdXqMjIVNAykSZiy3Dg"
)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error.response.data);
    });

mySdk.groups.Parents(
    { "id": "410f863-06cc-4064-b021-59acaf7570e9" },
    { "offset": 0, "limit": 5 },
    "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTQ2NDI2MjIsImlhdCI6MTY5NDU4ODYyMiwiaWRlbnRpdHkiOiJhZG1pbkBleGFtcGxlLmNvbSIsImlzcyI6ImNsaWVudHMuYXV0aCIsInN1YiI6ImE3MjVlMjZkLWRjMWYtNDQ1Mi04MGRjLTQxZmM2NTRhYTM4YiIsInR5cGUiOiJhY2Nlc3MifQ.0KWMwABznvZ8Lc_gKINKst4Uqmia63iXsMvStvQqYhnYt9E-HIIc7weODdOsh11iXe7NdXqMjIVNAykSZiy3Dg"
)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error.response.data);
    });

mySdk.groups.Assign(
    "8a3dbaa3-05b5-4358-8d77-3e5b7c5aee2b",
    "d8f1e354-2841-406c-b438-b151899f30cd",
    ["c_list", "g_add"],
    "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTQ2ODQ0NjMsImlhdCI6MTY5NDYzMDQ2MywiaWRlbnRpdHkiOiJhZG1pbkBleGFtcGxlLmNvbSIsImlzcyI6ImNsaWVudHMuYXV0aCIsInN1YiI6ImE3MjVlMjZkLWRjMWYtNDQ1Mi04MGRjLTQxZmM2NTRhYTM4YiIsInR5cGUiOiJhY2Nlc3MifQ.GBUkKzowEcGum01nn0AL9PkoiLhjMX0FJC4oOTdpZ84KMlQro432P3Ras5ARNAaLOzOf6TGJNIuKAuZtCJezhg"
)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error.response.data);
    });

mySdk.groups.Unassign(
    "886b4266-77d1-4258-abae-2931fb4f16de",
    "d8f1e354-2841-406c-b438-b151899f30cd",
    "JhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTQ2ODQ0NjMsImlhdCI6MTY5NDYzMDQ2MywiaWRlbnRpdHkiOiJhZG1pbkBleGFtcGxlLmNvbSIsImlzcyI6ImNsaWVudHMuYXV0aCIsInN1YiI6ImE3MjVlMjZkLWRjMWYtNDQ1Mi04MGRjLTQxZmM2NTRhYTM4YiIsInR5cGUiOiJhY2Nlc3MifQ.GBUkKzowEcGum01nn0AL9PkoiLhjMX0FJC4oOTdpZ84KMlQro432P3Ras5ARNAaLOzOf6TGJNIuKAuZtCJezhg"
)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error.response.data);
    });

mySdk.groups.Disable(
    "f20e0b0e-b05e-401e-ac53-59b99eea3519",
    "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTQyMTkyMDgsImlhdCI6MTY5NDE2NTIwOCwiaWRlbnRpdHkiOiJhZG1pbkBleGFtcGxlLmNvbSIsImlzcyI6ImNsaWVudHMuYXV0aCIsInN1YiI6ImE3MjVlMjZkLWRjMWYtNDQ1Mi04MGRjLTQxZmM2NTRhYTM4YiIsInR5cGUiOiJhY2Nlc3MifQ.Rk5Jc_13I3nJVsOtZodmDNVtxDgeE_TKK4CH8EXqDNj5BOkcHljO574kU7p-RNe_y6etT_0trTeqMHXrCj0cCg"
)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error.response.data);
    });

mySdk.groups.Members(
    "3ba0da3f-05ca-4093-ab0d-cdb177c3670c",
    { "offset": 0, "limit": 5 },
    "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTQ2ODQ0NjMsImlhdCI6MTY5NDYzMDQ2MywiaWRlbnRpdHkiOiJhZG1pbkBleGFtcGxlLmNvbSIsImlzcyI6ImNsaWVudHMuYXV0aCIsInN1YiI6ImE3MjVlMjZkLWRjMWYtNDQ1Mi04MGRjLTQxZmM2NTRhYTM4YiIsInR5cGUiOiJhY2Nlc3MifQ.GBUkKzowEcGum01nn0AL9PkoiLhjMX0FJC4oOTdpZ84KMlQro432P3Ras5ARNAaLOzOf6TGJNIuKAuZtCJezhg"
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
    { "name": "poseidon" },
    "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTYwMzc4NjQsImlhdCI6MTY5NTk4Mzg2NCwiaWRlbnRpdHkiOiJhZG1pbkBleGFtcGxlLmNvbSIsImlzcyI6ImNsaWVudHMuYXV0aCIsInN1YiI6IjViNDA3MTgzLTEwNGYtNDc2NC04MDYyLTg3ZGQ2MTM5MTA0NiIsInR5cGUiOiJhY2Nlc3MifQ.6c3SW6ejKn9SzPSDws10FEKb7WyC_3bOlyvKcdMIZGyL7Zu3hB6ghlpwBG7pwEoXJpi9gOCASchZlGCZrDdgVQ"
)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error.response.data);
    });

mySdk.channels.Get(
    "8e98fe46-2c85-49be-b8a0-69acb510207b",
    "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTQzMDI2NjIsImlhdCI6MTY5NDI0ODY2MiwiaWRlbnRpdHkiOiJhZG1pbkBleGFtcGxlLmNvbSIsImlzcyI6ImNsaWVudHMuYXV0aCIsInN1YiI6ImE3MjVlMjZkLWRjMWYtNDQ1Mi04MGRjLTQxZmM2NTRhYTM4YiIsInR5cGUiOiJhY2Nlc3MifQ.kM5XgANUj501xnwX-DdGaa8XaritRK7mYh6spQjx3zaFGJISQCeehRMAQf7-DQ_I1-QLaFa8OJSUVWhfhbdsYA"
)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error.response.data);
    });

mySdk.channels.Create_bulk(
    [{ "name": "madonna" }, { "name": "raye" }],
    "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTQzMDI2NjIsImlhdCI6MTY5NDI0ODY2MiwiaWRlbnRpdHkiOiJhZG1pbkBleGFtcGxlLmNvbSIsImlzcyI6ImNsaWVudHMuYXV0aCIsInN1YiI6ImE3MjVlMjZkLWRjMWYtNDQ1Mi04MGRjLTQxZmM2NTRhYTM4YiIsInR5cGUiOiJhY2Nlc3MifQ.kM5XgANUj501xnwX-DdGaa8XaritRK7mYh6spQjx3zaFGJISQCeehRMAQf7-DQ_I1-QLaFa8OJSUVWhfhbdsYA"
)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error.response.data);
    });

mySdk.channels.Get_all(
    { "offset": 0, "limit": 5},
    "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTYwMzc4NjQsImlhdCI6MTY5NTk4Mzg2NCwiaWRlbnRpdHkiOiJhZG1pbkBleGFtcGxlLmNvbSIsImlzcyI6ImNsaWVudHMuYXV0aCIsInN1YiI6IjViNDA3MTgzLTEwNGYtNDc2NC04MDYyLTg3ZGQ2MTM5MTA0NiIsInR5cGUiOiJhY2Nlc3MifQ.6c3SW6ejKn9SzPSDws10FEKb7WyC_3bOlyvKcdMIZGyL7Zu3hB6ghlpwBG7pwEoXJpi9gOCASchZlGCZrDdgVQ"
)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error.response.data);
    });

mySdk.channels.Update(
    { "id": "46b364e0-69d0-45a4-9ccf-7fbffc980b95", "name": "doja" },
    "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTQzOTc0NjEsImlhdCI6MTY5NDM0MzQ2MSwiaWRlbnRpdHkiOiJhZG1pbkBleGFtcGxlLmNvbSIsImlzcyI6ImNsaWVudHMuYXV0aCIsInN1YiI6ImE3MjVlMjZkLWRjMWYtNDQ1Mi04MGRjLTQxZmM2NTRhYTM4YiIsInR5cGUiOiJhY2Nlc3MifQ.gnGm9wkufCfZaH4rZ1lRpVofKEEWjRUq_DNhropP1Rk0dmZDcHJjukUHjp3SyspdSjIRXKGZv4_kWOiRMPdjsw"
)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error.response.data);
    });

mySdk.channels.Disable(
    { "id": "f7089646-c19c-47e0-b8b8-b5f46ae8cdc4" },
    "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTQzOTc0NjEsImlhdCI6MTY5NDM0MzQ2MSwiaWRlbnRpdHkiOiJhZG1pbkBleGFtcGxlLmNvbSIsImlzcyI6ImNsaWVudHMuYXV0aCIsInN1YiI6ImE3MjVlMjZkLWRjMWYtNDQ1Mi04MGRjLTQxZmM2NTRhYTM4YiIsInR5cGUiOiJhY2Nlc3MifQ.gnGm9wkufCfZaH4rZ1lRpVofKEEWjRUq_DNhropP1Rk0dmZDcHJjukUHjp3SyspdSjIRXKGZv4_kWOiRMPdjsw"
)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error.response.data);
    });

mySdk.channels.Get_by_thing(
    "34ba03e3-ffde-421f-b68f-12d5e197c171",
    { "offset": 0, "limit": 5 },
    "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTQ1NTk0NzcsImlhdCI6MTY5NDUwNTQ3NywiaWRlbnRpdHkiOiJhZG1pbkBleGFtcGxlLmNvbSIsImlzcyI6ImNsaWVudHMuYXV0aCIsInN1YiI6ImE3MjVlMjZkLWRjMWYtNDQ1Mi04MGRjLTQxZmM2NTRhYTM4YiIsInR5cGUiOiJhY2Nlc3MifQ.eW2a7i0N66bhPHGPpUc0Xd_ecPv8IA1RRIXpWp6VglKjLjgxMyCp969baz2UaXxyzpukcPDiFoW-bwxtrGM_iw"
)
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.error(error.response.data);
    });

mySdk.channels.Identify_thing("12345678")
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
