// Copyright (c) Abstract Machines
// SPDX-License-Identifier: Apache-2.0

import SDK from "../src/sdk";

const defaultUrl = "http://localhost";

const mySdk = new SDK({
  certsUrl: `${defaultUrl}:9019`,
});

const token = "<token>";
const domainId = "<domainId>";

mySdk.certs
  .IssueCert(
    "<clientId>",
    "<valid>",
    domainId,
    token,
  )
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });

mySdk.certs
  .ViewCertByClient(
    "<clientId>",
    domainId,
    token,
  )
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
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
    console.error(error);
  });

mySdk.certs
  .RevokeCert(
    "<clientId>",
    domainId,
    token,
  )
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });
