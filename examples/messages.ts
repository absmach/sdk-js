import SDK from "../src/sdk";

const defaultUrl = "http://localhost";

const mySdk = new SDK({
  httpAdapterUrl: `${defaultUrl}:8008`,
  readersUrl: `${defaultUrl}:9011`,
});

const token = "<token>";

mySdk.messages
  .Send("<channelId>", "<message>", "<thingKey>")
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error: unknown) => {
    console.log(error);
  });

mySdk.messages
  .Read({ offset: 0, limit: 10 }, "<channelId>", token, "<domainId>")
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error: unknown) => {
    console.log(error);
  });
