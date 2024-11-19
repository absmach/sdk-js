import SDK from "../dist/sdk";

const defaultUrl = "http://localhost";

const mySdk = new SDK({
  usersUrl: `${defaultUrl}:9002`,
  thingsUrl: `${defaultUrl}:9000`,
  invitationsUrl: `${defaultUrl}:9020`,
  journalUrl: `${defaultUrl}:9021`,
  httpAdapterUrl: `${defaultUrl}:8008`,
  readersUrl: `${defaultUrl}:9011`,
  domainsUrl: `${defaultUrl}:8189`,
  certsUrl: `${defaultUrl}:9019`,
  bootstrapUrl: `${defaultUrl}:9013`,
});

// Things service Health
mySdk.Health
  .Health("things")
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.log(error);
  });

// Users service Health
mySdk.Health
  .Health("users")
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.log(error);
  });

// Bootstrap service Health
mySdk.Health
  .Health("bootstrap")
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.log(error);
  });

// Certs service Health
mySdk.Health
  .Health("certs")
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.log(error);
  });

// Reader service Health
mySdk.Health
  .Health("reader")
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.log(error);
  });

// Http Adapter service Health
mySdk.Health
  .Health("http-adapter")
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.log(error);
  });

// Journal service Health
mySdk.Health
  .Health("journal")
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.log(error);
  });

// Invitations service Health
mySdk.Health
  .Health("invitations")
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.log(error);
  });
