// Import the SDK class from the mainflux-sdk package
import SDK from "../src/sdk";

const defaultUrl = "http://localhost";

const mySdk = new SDK({
  usersUrl: `${defaultUrl}:9002`,
  clientsUrl: `${defaultUrl}:9006`,
});
const token = "<token>";

mySdk.users
  .Create({
    first_name: "<firstName>",
    last_name: "<lastName>",
    email: "<email>",
    credentials: {
      username: "<username>",
      secret: "<password>",
    },
  })
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.log(error);
  });

mySdk.users.User(
  "<userId>",
  token,
)
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.log(error);
  });

mySdk.users.UserProfile(
  token,
)
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.log(error);
  });

mySdk.users.CreateToken(
  { identity: "<username | email>", secret: "<password>" },
)
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.log(error);
  });

mySdk.users.RefreshToken(
  "<refreshToken>",
)
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.log(error);
  });

mySdk.users.Update(
  { id: "<userId>", first_name: "<firstName>", last_name: "<lastName>" },
  token,
)
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.log(error);
  });

mySdk.users.UpdateEmail(
  { id: "<userId>", email: "<email>" },
  token,
)
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.log(error);
  });

mySdk.users.UpdateUsername(
  { id: "<userId>", credentials: { username: "<username>" } },
  token,
)
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.log(error);
  });

mySdk.users.UpdateProfilePicture(
  { id: "<userId>", profile_picture: "<profilePicture>" },
  token,
)
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.log(error);
  });

mySdk.users.UpdateUserTags(
  { id: "<userId>", tags: ["foo", "bar"] },
  token,
)
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.log(error);
  });

mySdk.users.UpdateUserRole(
  { id: "<userId>", role: "<role>" },
  token,
)
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.log(error);
  });

mySdk.users.Disable(
  { id: "<userId>" },
  token,
)
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.log(error);
  });

mySdk.users.Enable(
  { id: "<userId>" },
  token,
)
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.log(error);
  });

mySdk.users.Users(
  { offset: 0, limit: 10 },
  token,
)
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.log(error);
  });

mySdk.users.UpdateUserPassword(
  "<oldSecret>",
  "<newSecret>",
  token,
)
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.log(error);
  });

mySdk.users.ListUserChannels(
  "<domainId>",
  "<userId>",
  { offset: 0, limit: 10 },
  token,
)
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.log(error);
  });

mySdk.users.ListUserClients(
  "<domainId>",
  "<userId>",
  { offset: 0, limit: 10 },
  token,
)
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.log(error);
  });

mySdk.users.ListUserGroups(
  "<domainId>",
  "<userId>",
  { offset: 0, limit: 10 },
  token,
)
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.log(error);
  });

mySdk.users.ResetPasswordRequest("<email>", "<hostUrl>")
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.log(error);
  });

mySdk.users.ResetPassword(
  "<password>",
  "<confPass>",
  token,
)
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.log(error);
  });

mySdk.users.DeleteUser(
  "<userId>",
  token,
)
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.log(error);
  });

mySdk.users.SearchUsers(
  { username: "<username>" },
  token,
)
  .then((response: any) => {
    console.log("response: ", response);
  })
  .catch((error) => {
    console.log(error);
  });
