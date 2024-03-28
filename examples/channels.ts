// Import the SDK class from the mainflux-sdk package
import SDK from "../mainflux/sdk";

const defaultUrl = "http://localhost";

const mySdk = new SDK({
  //usersUrl: defaultUrl + ":9002",
  //domainsUrl: defaultUrl + ":8189",
  //thingsUrl: defaultUrl + ":9000",
  channelsUrl: defaultUrl + ":9000",
  //     groupsUrl: defaultUrl + ":9002",
  //     httpadapterUrl: defaultUrl,
  //     readersUrl: defaultUrl + ":9011",
  //     certsUrl: defaultUrl + ":9019",
  //     bootstrapsUrl: defaultUrl + ":9013",
});

mySdk.channels
  .Create({ name: "<channel_name>" }, "<token>")
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

mySdk.channels
  .GetChannel("<channel_id>", "<token>")
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

mySdk.channels
  .CreateChannels([{ name: "White" }, { name: "Blue" }], "token")
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

mySdk.channels
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

mySdk.channels
  .Update("<channel_id>", { name: "<channel_name" }, "<token>")
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

mySdk.channels
  .Disable("<channel_id>", "<token>")
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

mySdk.channels
  .Enable("<channel_id>", "<token>")
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

mySdk.channels
  .GetByThing("<channel_id>", { offset: 0, limit: 5 }, "<token>")
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
