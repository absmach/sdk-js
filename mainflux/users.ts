import axios, { AxiosResponse } from "axios";
import { Errors } from "./errors";

interface User {
  name?: string;
  id?: string;
  credentials?: {
    identity: string;
    secret?: string;
  };
  owner?: string;
  tags?: [string, string];
  role?: string;
}

interface PageRes {
  total: number;
  offset: number;
  limit: number;
}

interface UsersInterface {
  users: User[];
  page: PageRes;
}

interface Groups {
  groups: Groups[];
  page: PageRes;
}

interface Things {
  things: Things[];
  page: PageRes;
}

interface Channels {
  channel: Channels[];
  page: PageRes;
}

interface Login {
  identity?: string;
  secret?: string;
  domain_id?: string;
}

interface QueryParams {
  offset: number;
  limit: number;
}

interface Token {
  access_token: string;
  refresh_token: string;
}

interface Status {
  status: string;
}

class Users {
  // Users API client
  /**
   * @class Users -
   * Users API is used for creating and managing users.
   * It is used for creating new users, logging in, refreshing tokens,
   * getting user information, updating user information, disabling
   * and enabling users.
   * @param {String} users_url - URL to the Users service.
   * @returns {Object} - Users object.
   */
  private users_url: URL;
  private content_type: string;
  private usersEndpoint: string;
  private userError: Errors;

  public constructor(users_url: string) {
    this.users_url = new URL(users_url);
    this.content_type = "application/json";
    this.usersEndpoint = "users";
    this.userError = new Errors();
  }

  // Validation function
  private ValidateUserAndToken(user: User, token: string): void {
    if (typeof user !== "object" || user === null || Array.isArray(user)) {
      throw new Error("Invalid user parameter. Expected an object.");
    }

    if (typeof token !== "string") {
      throw new Error("Invalid token parameter. Expected a string.");
    }
  }

  public Create(user: User, token: string): Promise<User> {
    // Creates a new user
    /**
     * @method Create - Creates a new user.
     * @param {Object} user - User object.
     * @param {String} token - Access token.
     * @returns {Object} - User object.
     * @example
     * const user = {
     * "credentials": {
     *    "identity": "admin@example.com",
     *   "password": "12345678"
     * }
     * }
     */

    this.ValidateUserAndToken(user, token);

    const options = {
      method: "post",
      maxBodyLength: 2000,
      url: new URL(this.usersEndpoint, this.users_url).toString(),
      headers: {
        "Content-Type": this.content_type,
        Authorization: `Bearer ${token}`,
      },
      data: user,
    };
    return axios
      .request(options)
      .then((response: AxiosResponse) => {
        return response.data;
      })
      .catch((error) => {
        if (error.response) {
          return this.userError.HandleError(
            this.userError.users.create,
            error.response.status,
          );
        }
      });
  }

  public CreateToken(login: Login): Promise<Token> {
    // Issue Access and Refresh Token used for authenticating into the system
    /**
     * @method CreateToken - Issue Access and Refresh Token used for authenticating into the system.
     * @param {Object} user - User object.
     * @returns {Object} - Access and Refresh Token.
     * @example
     * const user = {
     * "credentials": {
     *   "identity": "admin@example.com",
     *  "password": "12345678"
     * }
     * }
     */

    const options = {
      method: "post",
      maxBodyLength: 2000,
      url: new URL(
        `${this.usersEndpoint}/tokens/issue`,
        this.users_url,
      ).toString(),
      headers: {
        "Content-Type": this.content_type,
      },
      data: login,
    };
    return axios
      .request(options)
      .then((response: AxiosResponse) => {
        return response.data;
      })
      .catch((error) => {
        if (error.response) {
          return this.userError.HandleError(
            this.userError.users.login,
            error.response.status,
          );
        }
      });
  }

  RefreshToken(login: Login, refresh_token: string): Promise<Token> {
    //provides a new access token and refresh token.
    /**
     * @method Refresh_token - Provides a new access token and refresh token.
     * @param {Object} user - User object.
     * @param {String} refresh_token - Refresh token.
     * @returns {Object} - Access and Refresh Token.
     * @example
     * const user = {
     *   "identity": "c52d-3b0d-43b9-8c3e-275c087d875af"
     * }
     *
     */
    if (typeof login !== "object" || login === null || Array.isArray(login)) {
      throw new Error("Invalid user parameter. Expected an object.");
    }

    if (typeof refresh_token !== "string") {
      throw new Error("Invalid token parameter. Expected a string.");
    }

    const options = {
      method: "post",
      maxBodyLength: 2000,
      url: new URL(
        `${this.usersEndpoint}/tokens/refresh`,
        this.users_url,
      ).toString(),
      headers: {
        "Content-Type": this.content_type,
        Authorization: `Bearer ${refresh_token}`,
      },
      data: login,
    };
    return axios
      .request(options)
      .then((response: AxiosResponse) => {
        return response.data;
      })
      .catch((error) => {
        if (error.response) {
          return this.userError.HandleError(
            this.userError.users.refreshtoken,
            error.response.status,
          );
        }
      });
  }

  public Update(user: User, token: string): Promise<User> {
    // Update a user
    /**
     * @method Update - Update a user. Updates a user's name and metadata.
     * @param {Object} user - User object.
     * @param {String} token - Access token.
     * @returns {Object} - User object.
     * @example
     * const user = {
     * "id": "c52d-3b0d-43b9-8c3e-275c087d875af",
     * "name": "John Doe"
     * }
     *
     */

    this.ValidateUserAndToken({}, token);

    const options = {
      method: "patch",
      url: new URL(
        `${this.usersEndpoint}/${user.id}`,
        this.users_url,
      ).toString(),
      maxBodyLength: 2000,
      headers: {
        "Content-Type": this.content_type,
        Authorization: `Bearer ${token}`,
      },
      data: user,
    };
    return axios
      .request(options)
      .then((response: AxiosResponse) => {
        return response.data;
      })
      .catch((error) => {
        if (error.response) {
          return this.userError.HandleError(
            this.userError.users.update,
            error.response.status,
          );
        }
      });
  }

  public UpdateUserIdentity(user: User, token: string): Promise<User> {
    // Update a user identity
    /**
     * @method UpdateUserIdentity - Update a user identity for a currently logged in user.
     * The user Identity is updated using authorization user_token
     * @param {Object} user - User object.
     * @param {String} token - Access token.
     * @returns {Object} - User object.
     * @example
     * const user = {
     * "id": "c52d-3b0d-43b9-8c3e-275c087d875af",
     * "credentials": {
     *  "identity": "fkatwigs@email.com"
     * }
     *
     * }
     */

    this.ValidateUserAndToken(user, token);

    const options = {
      method: "patch",
      url: new URL(
        `${this.usersEndpoint}/${user.id}/identity`,
        this.users_url,
      ).toString(),
      maxBodyLength: 2000,
      headers: {
        "Content-Type": this.content_type,
        Authorization: `Bearer ${token}`,
      },
      data: user,
    };
    return axios
      .request(options)
      .then((response: AxiosResponse) => {
        return response.data;
      })
      .catch((error) => {
        if (error.response) {
          return this.userError.HandleError(
            this.userError.users.updateuseridentity,
            error.response.status,
          );
        }
      });
  }

  public UpdateUserTags(user: User, token: string): Promise<User> {
    // Update a user's tags.
    /**
     *  Updates tags of the user with provided ID. Tags is updated using
     * authorization user_tokeN.
     * @method UpdateUserTags - Update a user's tags.
     * @param {Object} user - User object.
     * @param{String} token - Access token.
     * @returns {Object} - User object.
     * @example
     * const user = {
     *  "name": "example",
     *      "id": "886b4266-77d1-4258-abae-2931fb4f16de"
     *      "tags": [
     *          "back",
     *           "end"
     *       ]
     *       "metadata": {
     *          "foo": "bar"
     *       }
     *  }
     *
     */

    this.ValidateUserAndToken(user, token);

    const options = {
      method: "patch",
      url: new URL(
        `${this.usersEndpoint}/${user.id}/tags`,
        this.users_url,
      ).toString(),
      maxBodyLength: 2000,
      headers: {
        "Content-Type": this.content_type,
        Authorization: `Bearer ${token}`,
      },
      data: user,
    };

    return axios
      .request(options)
      .then((response: AxiosResponse) => {
        return response.data;
      })
      .catch((error) => {
        if (error.response) {
          return this.userError.HandleError(
            this.userError.users.updateusertags,
            error.response.status,
          );
        }
      });
  }

  public UpdateUserPassword(
    old_secret: string,
    new_secret: string,
    token: string,
  ): Promise<User> {
    // Update a user's password.
    /**
     * Updates password of the user with provided valid token.
     *
     * @method UpdateUserPassword - Update a user's password.
     * @param {String} old_secret - Old password.
     * @param {String} new_secret - New password.
     * @param {String} token - Access token.
     * @returns {Object} - User object.
     *
     */

    if (
      typeof old_secret !== "string" ||
      typeof new_secret !== "string" ||
      typeof token !== "string"
    ) {
      throw new Error(
        "Invalid parameter types. Expected strings for old_secret, new_secret, and token.",
      );
    }

    const secret = { old_secret: old_secret, new_secret: new_secret };
    const options = {
      method: "patch",
      url: new URL(`${this.usersEndpoint}/secret`, this.users_url).toString(),
      maxBodyLength: 2000,
      headers: {
        "Content-Type": this.content_type,
        Authorization: `Bearer ${token}`,
      },
      data: secret,
    };
    return axios
      .request(options)
      .then((response: AxiosResponse) => {
        return response.data;
      })
      .catch((error) => {
        if (error.response) {
          return this.userError.HandleError(
            this.userError.users.updateuserpassword,
            error.response.status,
          );
        }
      });
  }

  public UpdateUserRole(user: User, token: string): Promise<User> {
    // Update a user's role.
    /**
     * Updates password of the user with provided valid token.
     *
     * @method UpdateUserRole - Update a user's role.
     * @param {String} role - New role.
     * @param {String} token - Access token.
     * @returns {Object} - User object.
     *
     */

    this.ValidateUserAndToken(user, token);

    const options = {
      method: "patch",
      url: new URL(
        `${this.usersEndpoint}/${user.id}/role`,
        this.users_url,
      ).toString(),
      maxBodyLength: 2000,
      headers: {
        "Content-Type": this.content_type,
        Authorization: `Bearer ${token}`,
      },
      data: user,
    };
    return axios
      .request(options)
      .then((response: AxiosResponse) => {
        return response.data;
      })
      .catch((error) => {
        if (error.response) {
          return this.userError.HandleError(
            this.userError.users.updateuserrole,
            error.response.status,
          );
        }
      });
  }

  public User(user_id: string, token: string): Promise<User> {
    // Gets a user
    /**
     * Provides information about the user with provided ID. The user is
     * retrieved using authorization user_token.
     * @method User - Gets a user.
     * @param {String} user_id - User ID.
     * @param {String} token - Access token.
     * @returns {Object} - User object.
     * @example
     * const user_id = "886b4266-77d1-4258-abae-2931fb4f16de"
     *
     */

    if (typeof user_id !== "string" || user_id === null) {
      throw new Error("Invalid user_id parameter. Expected a string.");
    }

    this.ValidateUserAndToken({}, token);

    const options = {
      method: "get",
      maxBodyLength: 2000,
      url: new URL(
        `${this.usersEndpoint}/${user_id}`,
        this.users_url,
      ).toString(),
      headers: {
        "Content-Type": this.content_type,
        Authorization: `Bearer ${token}`,
      },
    };
    return axios
      .request(options)
      .then((response: AxiosResponse) => {
        return response.data;
      })
      .catch((error) => {
        if (error.response) {
          return this.userError.HandleError(
            this.userError.users.user,
            error.response.status,
          );
        }
      });
  }

  public UserProfile(token: string): Promise<User> {
    // Gets a user's profile
    /**
     * Provides information about the user with provided ID. The user is
     * retrieved using authorization user_token.
     * @method UserProfile - Gets a user's Profile.
     * @param {String} user_id - User ID.
     * @param {String} token - Access token.
     * @returns {Object} - User object.
     * @example
     * const user_id = "886b4266-77d1-4258-abae-2931fb4f16de"
     *
     */

    this.ValidateUserAndToken({}, token);

    const options = {
      method: "get",
      maxBodyLength: 2000,
      url: new URL(`${this.usersEndpoint}/profile`, this.users_url).toString(),
      headers: {
        "Content-Type": this.content_type,
        Authorization: `Bearer ${token}`,
      },
    };
    return axios
      .request(options)
      .then((response: AxiosResponse) => {
        return response.data;
      })
      .catch((error) => {
        if (error.response) {
          return this.userError.HandleError(
            this.userError.users.user,
            error.response.status,
          );
        }
      });
  }

  public Users(
    query_params: QueryParams,
    token: string,
  ): Promise<UsersInterface> {
    // Gets all users with pagination.
    /**
     * Provides information about all users. The users are retrieved using
     * authorization user_token.
     *
     * @method Users - Gets all users with pagination.
     * @param {Object} query_params - Query parameters.
     * @param {String} token - Access token.
     * @returns {Object} - User object.
     * @example
     * const query_params = {
     * "offset": 0,
     * "limit": 10
     * }
     *
     */

    if (
      typeof query_params !== "object" ||
      query_params === null ||
      Array.isArray(query_params)
    ) {
      throw new Error("Invalid query parameters. Expected an object.");
    }

    const stringParams: Record<string, string> = Object.fromEntries(
      Object.entries(query_params).map(([key, value]) => [key, String(value)]),
    );

    this.ValidateUserAndToken({}, token);

    const options = {
      method: "get",
      maxBodyLength: 2000,
      url: new URL(
        `${this.usersEndpoint}?${new URLSearchParams(stringParams).toString()}`,
        this.users_url,
      ).toString(),
      headers: {
        "Content-Type": this.content_type,
        Authorization: `Bearer ${token}`,
      },
    };
    return axios
      .request(options)
      .then((response: AxiosResponse) => {
        return response.data;
      })
      .catch((error) => {
        if (error.response) {
          return this.userError.HandleError(
            this.userError.users.users,
            error.response.status,
          );
        }
      });
  }

  public Disable(user: User, token: string): Promise<User> {
    // Disable a user
    /**
     * Disables a user with provided ID and valid token.
     * @method Disable - Disable a user.
     * @param {Object} user - User object.
     * @param {String} token - Access token.
     * @returns {Object} - User object.
     * @example
     * const user = {
     * "id": "c52d-3b0d-43b9-8c3e-275c087d875af",
     * "status": "disabled"
     * }
     */

    this.ValidateUserAndToken(user, token);

    const options = {
      method: "post",
      maxBodyLength: 2000,
      url: new URL(
        `${this.usersEndpoint}/${user.id}/disable`,
        this.users_url,
      ).toString(),
      headers: {
        "Content-Type": this.content_type,
        Authorization: `Bearer ${token}`,
      },
      data: user,
    };
    return axios
      .request(options)
      .then((response: AxiosResponse) => {
        return response.data;
      })
      .catch((error) => {
        if (error.response) {
          return this.userError.HandleError(
            this.userError.users.disable,
            error.response.status,
          );
        }
      });
  }

  public Enable(user: User, token: string): Promise<User> {
    // Enable a user.
    /**
     * Enables a previously disabled user when provided with token and valid ID.
     * @method Enable - Enable a user.
     * @params {Object} user - User object.
     * @param {String} token - Access token.
     * @returns {Object} - User object.
     * @example
     * const user = {
     * "id": "c52d-3b0d-43b9-8c3e-275c087d875af",
     * "status": "enabled"
     * }
     *
     */

    this.ValidateUserAndToken(user, token);

    const options = {
      method: "post",
      maxBodyLength: 2000,
      url: new URL(
        `${this.usersEndpoint}/${user.id}/enable`,
        this.users_url,
      ).toString(),
      headers: {
        "Content-Type": this.content_type,
        Authorization: `Bearer ${token}`,
      },
      data: user,
    };
    return axios
      .request(options)
      .then((response: AxiosResponse) => {
        return response.data;
      })
      .catch((error) => {
        if (error.response) {
          return this.userError.HandleError(
            this.userError.users.enable,
            error.response.status,
          );
        }
      });
  }

  public ListUserGroups(
    user_id: string,
    query_params: QueryParams,
    token: string,
  ): Promise<Groups> {
    // Get groups of a user.
    /**
     * Gets the various groups a user belongs to.
     * @method ListUserGroups - Get memberships of a user.
     * @param {String} user_id - Member ID.
     * @param {Object} query_params - Query parameters for example offset and limit.
     * @param {String} token - Access token.
     * @returns {Object} - Groups object.
     */

    if (
      typeof query_params !== "object" ||
      query_params === null ||
      Array.isArray(query_params)
    ) {
      throw new Error("Invalid query parameters. Expected an object.");
    }

    if (typeof user_id !== "string" || user_id === null) {
      throw new Error("Invalid user_id parameter. Expected a string.");
    }

    const stringParams: Record<string, string> = Object.fromEntries(
      Object.entries(query_params).map(([key, value]) => [key, String(value)]),
    );

    this.ValidateUserAndToken({}, token);

    const options = {
      method: "get",
      maxBodyLength: 2000,
      url: new URL(
        `${this.usersEndpoint}/${user_id}/groups?${new URLSearchParams(stringParams).toString()}`,
        this.users_url,
      ).toString(),
      headers: {
        "Content-Type": this.content_type,
        Authorization: `Bearer ${token}`,
      },
    };
    return axios
      .request(options)
      .then((response: AxiosResponse) => {
        return response.data;
      })
      .catch((error) => {
        if (error.response) {
          return this.userError.HandleError(
            this.userError.users.memberships,
            error.response.status,
          );
        }
      });
  }

  public ListUserThings(
    user_id: string,
    query_params: QueryParams,
    token: string,
  ): Promise<Things> {
    // Get things of a user.
    /**
     * Gets the various things a user owns.
     * @method ListUserThings - Get memberships of a user.
     * @param {String} user_id - Member ID.
     * @param {Object} query_params - Query parameters for example offset and limit.
     * @param {String} token - Access token.
     * @returns {Object} - Things object.
     */

    if (
      typeof query_params !== "object" ||
      query_params === null ||
      Array.isArray(query_params)
    ) {
      throw new Error("Invalid query parameters. Expected an object.");
    }

    if (typeof user_id !== "string" || user_id === null) {
      throw new Error("Invalid user_id parameter. Expected a string.");
    }

    const stringParams: Record<string, string> = Object.fromEntries(
      Object.entries(query_params).map(([key, value]) => [key, String(value)]),
    );

    this.ValidateUserAndToken({}, token);

    const options = {
      method: "get",
      maxBodyLength: 2000,
      url: new URL(
        `${this.usersEndpoint}/${user_id}/things?${new URLSearchParams(stringParams).toString()}`,
        this.users_url,
      ).toString(),
      headers: {
        "Content-Type": this.content_type,
        Authorization: `Bearer ${token}`,
      },
    };
    return axios
      .request(options)
      .then((response: AxiosResponse) => {
        return response.data;
      })
      .catch((error) => {
        if (error.response) {
          return this.userError.HandleError(
            this.userError.users.memberships,
            error.response.status,
          );
        }
      });
  }

  public ListUserChannels(
    user_id: string,
    query_params: QueryParams,
    token: string,
  ): Promise<Channels> {
    // Get channels of a user.
    /**
     * Gets the various channels a user owns.
     * @method ListUserChannels - Get channels of a user.
     * @param {String} user_id - Member ID.
     * @param {Object} query_params - Query parameters for example offset and limit.
     * @param {String} token - Access token.
     * @returns {Object} - Channels object.
     */

    if (
      typeof query_params !== "object" ||
      query_params === null ||
      Array.isArray(query_params)
    ) {
      throw new Error("Invalid query parameters. Expected an object.");
    }

    if (typeof user_id !== "string" || user_id === null) {
      throw new Error("Invalid user_id parameter. Expected a string.");
    }

    const stringParams: Record<string, string> = Object.fromEntries(
      Object.entries(query_params).map(([key, value]) => [key, String(value)]),
    );

    this.ValidateUserAndToken({}, token);

    const options = {
      method: "get",
      maxBodyLength: 2000,
      url: new URL(
        `${this.usersEndpoint}/${user_id}/channels?${new URLSearchParams(stringParams).toString()}`,
        this.users_url,
      ).toString(),
      headers: {
        "Content-Type": this.content_type,
        Authorization: `Bearer ${token}`,
      },
    };
    return axios
      .request(options)
      .then((response: AxiosResponse) => {
        return response.data;
      })
      .catch((error) => {
        if (error.response) {
          return this.userError.HandleError(
            this.userError.users.memberships,
            error.response.status,
          );
        }
      });
  }

  public ResetPasswordRequest(email: string): Promise<Status> {
    // Sends a request to reset a password
    /**
     * @method ResetPasswordRequest - Sends a request
     * @param {String} email - User email.
     * @returns {Int} - Status.
     * @example
     * const user = {
     * "credentials": {
     *    "identity": "admin@example.com",
     *   "password": "12345678"
     * }
     * }
     */

    if (typeof email !== "string" || email === null) {
      throw new Error("Invalid email parameter. Expected a string.");
    }

    const options = {
      method: "post",
      maxBodyLength: 2000,
      url: new URL(`/password/reset-request`, this.users_url).toString(),
      headers: {
        "Content-Type": this.content_type,
      },
      data: email,
    };
    return axios
      .request(options)
      .then((response: AxiosResponse) => {
        return response.data;
      })
      .catch((error) => {
        if (error.response) {
          return this.userError.HandleError(
            this.userError.users.resetpasswordrequest,
            error.response.status,
          );
        }
      });
  }

  public ResetPassword(
    password: string,
    confPass: string,
    token: string,
  ): Promise<Status> {
    // Resets a user password
    /**
     * @method ResetPassword - Resets a password.
     * @param {String} password - User Password.
     * @param {String} confPass - User to confirm the Password.
     * @param {String} token - Access token.
     * @returns {Int} - Status Created.
     * @example
     * const user = {
     * "credentials": {
     *    "identity": "admin@example.com",
     *   "password": "12345678"
     * }
     * }
     */

    if (
      typeof password !== "string" ||
      typeof confPass !== "string" ||
      typeof token !== "string"
    ) {
      throw new Error(
        "Invalid parameter types. Expected strings for password, confPass, and token.",
      );
    }

    const rpr = { password: password, confPass: confPass, token: token };

    const options = {
      method: "put",
      maxBodyLength: 2000,
      url: new URL(`/password/reset`, this.users_url).toString(),
      headers: {
        "Content-Type": this.content_type,
      },
      data: rpr,
    };
    return axios
      .request(options)
      .then((response: AxiosResponse) => {
        return response.data;
      })
      .catch((error) => {
        if (error.response) {
          return this.userError.HandleError(
            this.userError.users.resetpassword,
            error.response.status,
          );
        }
      });
  }
}

export default Users;
