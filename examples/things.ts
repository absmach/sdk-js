// Import the SDK class from the mainflux-sdk package
import SDK from "../src/sdk";

const defaultUrl = "http://localhost";

const mySdk = new SDK({
  thingsUrl: defaultUrl + ":9000",
});

const token =
  "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJkb21haW4iOiIzZTlkMTNiMy1lMTgxLTQwNjktODdjNS0yMGQ3MmJlY2M4M2YiLCJleHAiOjE3MTIwMzk5MzMsImlhdCI6MTcxMjAzNjMzMywiaXNzIjoibWFnaXN0cmFsYS5hdXRoIiwic3ViIjoiYjJmZTZhZmUtOGYwNS00NDgzLWFhY2QtN2QyMGVhMjVkOWE1IiwidHlwZSI6MCwidXNlciI6ImIyZmU2YWZlLThmMDUtNDQ4My1hYWNkLTdkMjBlYTI1ZDlhNSJ9.tA_2fGtYlT-zn316AwX_wtw0uXgE7DYFUA_ZvXKCvm1Pofl_WiAWMRt5YcqU_TbGDXmrgJxUd-Ifa9aSYMaFKA";
// //Things.js examples.

mySdk.things
  .Create(
    {
      name: "thing_name",
    },
    <"token">
  )
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.log(error);
  });

mySdk.things
  .GetAll({ offset: 0, limit: 10 }, "<token>")

  .then((response: any) => {
    console.log("response:", response);
  })

  .catch((error) => {
    console.log(error);
  });

mySdk.things
  .Disable({ id: "<thing_id>" }, "<token>")
  .then((response: any) => {
    console.log("response:", response);
  })
  .catch((error) => {
    console.error(error);
  });

mySdk.things
  .Enable({ id: "<thing_id>" }, "<token>")
  .then((response: any) => {
    console.log("response:", response);
  })
  .catch((error) => {
    console.error(error);
  });

mySdk.things
  .Update(
    { id: "thing_id", name: "thing_name" },
    "<token>",
  )
  .then((response: any) => {
    console.log("response:", response);
  })
  .catch((error) => {
    console.log(error);
  });

mySdk.things
  .UpdateThingSecret(
    {
      id: "thing_id",
      credentials: { secret: "new_secret" },
    },
    "<token>",
  )
  .then((response: any) => {
    console.log(response);
  })
  .catch((error) => {
    console.log(error);
  });

mySdk.things
  .UpdateThingTags(
    { id: "<thing_id>", tags: ["<tag1>", "<tag2>"] },
    "<token>",
  )
  .then((response: any) => {
    console.log(response);
  })
  .catch((error) => {
    console.log(error);
  });

mySdk.things
  .ThingsByChannel({ id: "thing_id" }, { offset: 0, limit: 5 }, "<token>")
  .then((response: any) => {
    console.log(response);
  })
  .catch((error) => {
    console.log(error);
  });

mySdk.things
  .Things({ offset: 0, limit: 10 }, "<token>")
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.log(error);
  });

mySdk.things
  .Thing("thing_id", "<token>")
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.log(error);
  });

mySdk.things
  .ThingsPermissions("thing_id", "<token>")
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.log(error);
  });

mySdk.things
  .IdentifyThing({ id: "thing_id" })
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.log(error);
  });

mySdk.things
  .ShareThing(
    "thing_id",
    {
      Relation: "relation",
      UserID: [
        "user_id1",
        "user_id2",
      ],
    },
    "<token>",
  )
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.log(error);
  });

mySdk.things
  .UnShareThing(
    "thing_id",
    {
      Relation: "admin",
      UserID: [
         "user_id1",
        "user_id2",
      ],
    },
    "<token>",
  )
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.log(error);
  });

mySdk.things
  .ListThingUsers(
    "thing_id",
    { offset: 0, limit: 10 },
    "<token>",
  )
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.log(error);
  });

mySdk.things
  .DeleteThing({ id: "thing_id" }, "<token>")
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.log(error);
  });

mySdk.things
  .CreateThings([{ name: "thing_name" }, { name: "thing_name" }], "<token>")
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.log(error);
  });
