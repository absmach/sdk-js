// Copyright (c) Abstract Machines
// SPDX-License-Identifier: Apache-2.0

import SDK from "../src/sdk";

const defaultUrl = "http://localhost";

const mySdk = new SDK({
  domainsUrl: `${defaultUrl}:9003`,
});

const token = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3Mzk3NDc4NjksImlhdCI6MTczOTc0NDI2OSwiaXNzIjoic3VwZXJtcS5hdXRoIiwidHlwZSI6MCwidXNlciI6IjY4NDM0NzdhLTJlMTEtNDBlZS05OTc2LTU0YjJjMmI3NjExMCJ9.lbw_uK30dbosYJh8hHnhXXMSIetGPkai5kh85x8YugA3wuhYmR0x7igMp_kU7u9i6f2HvFv471d7s-HkRsesWQ";
const domainId = "69140258-2ab1-4d50-8448-1f29e7791d5c";

mySdk.invitations.SendInvitation(
  "<userId>",
  domainId,
  "<roleId>",
  token,
)
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });

mySdk.invitations.ViewInvitation(
  "<userId>",
  domainId,
  token,
)
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });

mySdk.invitations.ListDomainInvitations(
  {
    limit: 10,
    offset: 0,
  },
  domainId,
  token,
)
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });

mySdk.invitations.ListUserInvitations(
  {
    limit: 10,
    offset: 0,
  },
  token,
)
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });

mySdk.invitations.AcceptInvitation(
  domainId,
  token,
)
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });

mySdk.invitations.RejectInvitation(
  domainId,
  token,
)
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });

mySdk.invitations.DeleteInvitation(
  "<userId>",
  domainId,
  token,
)
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });
