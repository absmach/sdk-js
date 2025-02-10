// Copyright (c) Abstract Machines
// SPDX-License-Identifier: Apache-2.0

import SDK from "../src/sdk";

const defaultUrl = "http://localhost";

const mySdk = new SDK({
  journalUrl: `${defaultUrl}:9021`,
});

const token = "<token>";
const domainId = "<domainId>";

mySdk.Journal.EntityJournals(
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
    console.error(error);
  });

mySdk.Journal.UserJournals(
  "<userId>",
  { offset: 0, limit: 10 },
  token,
)
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });

mySdk.Journal.ClientTelemetry(
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
