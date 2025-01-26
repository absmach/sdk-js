// Copyright (c) Abstract Machines
// SPDX-License-Identifier: Apache-2.0

import SDK from "../src/sdk";

const defaultUrl = "http://localhost";

const mySdk = new SDK({
  bootstrapUrl: `${defaultUrl}:9013`,
});

const token = "<token>";
const domainId = "<domainId>";

mySdk.bootstrap.AddBootstrap(
  {
    external_id: "<externalId>",
    external_key: "externalKey",
    client_id: "<clientId>",
    name: "<bootstrapName>",
  },
  domainId,
  token,
)
  .then((response: any) => {
    console.log("response:", response);
  })
  .catch((error) => {
    console.error(error);
  });

mySdk.bootstrap.Whitelist(
  {
    external_id: "<externalId>",
    external_key: "<externalKey>",
    client_id: "<clientId>",
    name: "<bootstrapName>",
  },
  domainId,
  token,
)
  .then((response: any) => {
    console.log("response:", response);
  })
  .catch((error) => {
    console.error(error);
  });

mySdk.bootstrap.UpdateBootstrap(
  {
    name: "<updatedBootstrapName>",
    client_id: "<clientId>",
  },
  domainId,
  token,
)
  .then((response: any) => {
    console.log("response:", response);
  })
  .catch((error) => {
    console.error(error);
  });

mySdk.bootstrap.ViewBootstrap(
  "<clientId>",
  domainId,
  token,
)
  .then((response: any) => {
    console.log("response:", response);
  })
  .catch((error) => {
    console.error(error);
  });

mySdk.bootstrap.UpdateBootstrapCerts(
  {
    client_id: "<clientId>",
    client_cert: "<clientCert>",
    client_key: "<clientKey>",
    ca_cert: "<caCert>",
  },
  domainId,
  token,
)
  .then((response: any) => {
    console.log("response:", response);
  })
  .catch((error) => {
    console.error(error);
  });

mySdk.bootstrap.DeleteBootstrap(
  "<clientId>",
  domainId,
  token,
)
  .then((response: any) => {
    console.log("response:", response);
  })
  .catch((error) => {
    console.error(error);
  });

mySdk.bootstrap.Bootstrap(
  "externalId",
  "externalKey",
)
  .then((response: any) => {
    console.log("response:", response);
  })
  .catch((error) => {
    console.error(error);
  });

mySdk.bootstrap.Bootstraps(
  { offset: 0, limit: 10 },
  domainId,
  token,
)
  .then((response: any) => {
    console.log("response:", response);
  })
  .catch((error) => {
    console.error(error);
  });

mySdk.bootstrap.UpdateBootstrapConnection(
  "<clientId>",
  domainId,
  ["<channelId>", "<channelId2>"],
  token,
)
  .then((response: any) => {
    console.log("response:", response);
  })
  .catch((error) => {
    console.error(error);
  });

mySdk.bootstrap.SecureBootstrap(
  "<externalId>",
  "<externalKey>",
  "<cryptoKey>",
)
  .then((response: any) => {
    console.log("response:", response);
  })
  .catch((error) => {
    console.error(error);
  });
