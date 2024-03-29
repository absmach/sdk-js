// Import the SDK class from the mainflux-sdk package
import SDK from "../src/sdk";

const defaultUrl = "http://localhost";

const mySdk = new SDK({
  thingsUrl: defaultUrl + ":9000",
});

const token =
  "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJkb21haW4iOiJCZWFkIiwiZXhwIjoxNzExNjk5OTQzLCJpYXQiOjE3MTE2OTYzNDMsImlzcyI6Im1hZ2lzdHJhbGEuYXV0aCIsInN1YiI6ImIyZmU2YWZlLThmMDUtNDQ4My1hYWNkLTdkMjBlYTI1ZDlhNSIsInR5cGUiOjAsInVzZXIiOiJiMmZlNmFmZS04ZjA1LTQ0ODMtYWFjZC03ZDIwZWEyNWQ5YTUifQ.R_sYh4pn4tRLmiDVAfNtbfChoAxQqWlDYGzszHBcU0qgK_zD9VGOcs607vLpx1oTzkzHLTSPAi9Asi5wKFvHMQ";

// //Things.js examples.

mySdk.things
  .Create(
    {
      name: "Keyholr",
    },
    token,
  )
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.log(error);
  });
mySdk.things
  .GetAll({ offset: 0, limit: 10 }, token)

  .then((response: any) => {
    console.log("response:", response);
  })

  .catch((error) => {
    console.log(error);
  });

mySdk.things
  .Enable({ id: "<thing_id>" }, token)
  .then((response: any) => {
    console.log(response);
  })
  .catch((error: any) => {
    if (error.response) {
      console.error(error.response);
    } else {
      console.error(error.message);
    }
  });

mySdk.things
  .Update({ id: "thing_id", name: "thing_name" }, token)
  .then((response: any) => {
    console.log("response:", response);
  })
  .catch((error) => {
    console.log(error);
  });

mySdk.things
  .UpdateThingSecret(
    {
      id: "<thing_id>",
      credentials: { secret: "<thing_secret>" },
    },
    token,
  )
  .then((response: any) => {
    console.log(response);
  })
  .catch((error) => {
    console.log(error);
  });

mySdk.things
  .UpdateThingTags({ id: "<thing_id>", tags: ["<tag1>", "<tag2>"] }, "<token>")
  .then((response: any) => {
    console.log(response);
  })
  .catch((error) => {
    console.log(error);
  });

mySdk.things
  .ThingsByChannel({ id: "hsjdhshd" }, { offset: 0, limit: 5 }, token)
  .then((response: any) => {
    console.log(response);
  })
  .catch((error) => {
    console.log(error);
  });

mySdk.things
  .Things({ offset: 0, limit: 10 }, token)
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.log(error);
  });

mySdk.things
  .Thing("huihnbvgvgcfxdx", token)
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.log(error);
  });

mySdk.things
  .ThingsPermissions("<thingId>", "<token>")
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.log(error);
  });

mySdk.things
  .IdentifyThing("<thingId>")
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.log(error);
  });

mySdk.things
  .ShareThing("<thingId>", "<token>")
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.log(error);
  });

mySdk.things
  .UnShareThing("<thingId>", "<userId>", "<token>")
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.log(error);
  });

mySdk.things
  .DeleteThing("<thing_id>", "<token>")
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.log(error);
  });

// mySdk.things.CreateThings({name :" ['user1', 'user2']"}, "<token>")
// .then((response: any) => {
//     console.log("response: ", response);
//   })
//   .catch((error) => {
//     console.log(error);
//   });
