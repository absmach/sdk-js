// Import the SDK class from the mainflux-sdk package
import SDK from "../mainflux/sdk";

const defaultUrl = "http://localhost";

const mySdk = new SDK({
  usersUrl: defaultUrl + ":9002",
  domainsUrl: defaultUrl + ":8189",
  thingsUrl: defaultUrl + ":9000",
  channelsUrl: defaultUrl + ":9000",
  //     groupsUrl: defaultUrl + ":9002",
  //     httpadapterUrl: defaultUrl,
  //     readersUrl: defaultUrl + ":9011",
  //     certsUrl: defaultUrl + ":9019",
  //     bootstrapsUrl: defaultUrl + ":9013",
});

// //Things.js examples.

mySdk.things
  .Create({ name: "<thing_name>" }, "<token>")
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
  .CreateThings([{ name: "<thing_name>" }, { name: "<thing_name>" }], "<token>")
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
  .GetAll({ offset: 0, limit: 10 }, "<token>")
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
  .Disable("<thing_id>", "<token>")
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
  .Enable("<thing_id>", "<token>")
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
  .Update({ id: "<thing_id>", name: "<thing_name" }, "<token>")
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
  .UpdateThingSecret(
    {
      id: "<thing_id>",
      credentials: { secret: "<thing_secret>" },
    },
    "<token>",
  )
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
  .UpdateThingTags("<thing_id>", { tags: ["<tag1>", "<tag2>"] }, "<token>")
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
  .GetByChannel("<thing_id>", { offset: 0, limit: 5 }, "<token>")
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
  .IdentifyThing("<thing_secret>")
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
  .AuthoriseThing(
    "<thing_id>",
    "<channel_id>",
    "<action>",
    "<enity_type>",
    "<token>",
  )
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
