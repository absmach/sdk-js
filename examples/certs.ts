import SDK from "../src/sdk";

const defaultUrl = "http://localhost";

const mySdk = new SDK({
  certsUrl: `${defaultUrl}:9019`,
});

const token = "<token>";
const domainId = "<domainId>";

mySdk.certs
  .IssueCert(
    "<thingID>",
    "<valid>",
    domainId,
    token,
  )
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.log(error);
  });

mySdk.certs
  .ViewCertByThing(
    "<thingID>",
    domainId,
    token,
  )
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.log(error);
  });

mySdk.certs
  .ViewCert(
    "<certID>",
    domainId,
    token,
  )
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.log(error);
  });

mySdk.certs
  .RevokeCert(
    "<thingID>",
    domainId,
    token,
  )
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.log(error);
  });
