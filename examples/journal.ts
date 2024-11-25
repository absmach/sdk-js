import SDK from "../src/sdk";

const defaultUrl = "http://localhost";

const mySdk = new SDK({
  journalUrl: `${defaultUrl}:9021`,
});

const token = "<token>";
const domainId = "<domainId>";

mySdk.Journal.Journal(
  "<entityType>",
  "<entityId>",
  domainId,
  { offset: 0, limit: 10 },
  token,
)
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.log(error);
  });
