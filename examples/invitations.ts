// Imposrt the SDK class from the mainflux-sdk package

import SDK from "../src/sdk";

const defaultUrl = "http://localhost";

const mySdk = new SDK({
  invitationsUrl: `${defaultUrl}:9020`,
});

const token = "<token>";
const domainId = "<domainId>";

mySdk.invitations.SendInvitation(
  {
    user_id: "<userID>",
    domain_id: domainId,
    relation: "administrator",
  },
  token,
)
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });

mySdk.invitations.Invitation(
  "<userID>",
  domainId,
  token,
)
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });

mySdk.invitations.Invitations(
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
  "<userID>",
  domainId,
  token,
)
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.error(error);
  });
