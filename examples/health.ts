import SDK from "../src/sdk";

const defaultUrl = "http://localhost";

const mySdk = new SDK({
  usersUrl: `${defaultUrl}:9002`,
  clientsUrl: `${defaultUrl}:9006`,
  channelsUrl: `${defaultUrl}:9005`,
  invitationsUrl: `${defaultUrl}:9020`,
  journalUrl: `${defaultUrl}:9021`,
  httpAdapterUrl: `${defaultUrl}:8008`,
  readersUrl: `${defaultUrl}:9011`,
  domainsUrl: `${defaultUrl}:9003`,
  certsUrl: `${defaultUrl}:9019`,
  bootstrapUrl: `${defaultUrl}:9013`,
  groupsUrl: `${defaultUrl}:9004`,
});

// Clients service Health
mySdk.Health.Health("clients")
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });

// Users service Health
mySdk.Health.Health("users")
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });

// Channels service Health
mySdk.Health.Health("channels")
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });

// Bootstrap service Health
mySdk.Health.Health("bootstrap")
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });

// Certs service Health
mySdk.Health.Health("certs")
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });

// Reader service Health
mySdk.Health.Health("reader")
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });

// Http Adapter service Health
mySdk.Health.Health("http-adapter")
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });

// Journal service Health
mySdk.Health.Health("journal")
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });

// Invitations service Health
mySdk.Health.Health("invitations")
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });

// Domains service Health
mySdk.Health.Health("domains")
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });

// Groups service Health
mySdk.Health.Health("groups")
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });
