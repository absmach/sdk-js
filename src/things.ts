import axios, { AxiosResponse } from "axios";
import { Errors } from "./errors";

interface Thing {
  name?: string;
  id?: string;
  credentials?: {
    identity?: string;
    secret: string;
  };
  owner?: string;
  tags?: [string, string];
  role?: string;
  //domainID?: string;
}
interface PageRes {
  total: number;
  offset: number;
  limit: number;
}

interface ThingsInterface {
  things: Thing[];
  page: PageRes;
}

interface BulkThings {
  things: Thing[];
}
interface Channel {
  name?: string;
  description?: string;
  parent_id?: string;
  credentials?: {
    identity?: string;
    status?: string;
    owner_id?: string;
    id?: string;
  };
}
interface ChannelsInterface {
  channels: Channel[];
  page: PageRes;
}

interface Channels {
  channel: Channels[];
  page: PageRes;
}

interface QueryParams {
  offset: number;
  limit: number;
  //[key: string]: number | string;
}

interface Token {
  token: string;
}

interface Actions {
  actions: string[];
}

interface ChannelsOrString {
  //channels: ChannelsInterface;
  message?: string;
  channels: string;
}
interface Status {
  status: string;
}

interface Users {
  users: string[];
  page: PageRes;
}
class Things {
  // Things service client.
  /** 
     @class Things 
    private things_url: URL;
    content_type: string;
    thingsEndpoint: string;
   //
   //Things API is used for creating and managing things.
   //It is used for creating, updating, deleting and retrieving things.
   //@param {string} things_url - Things service URL.
   //@returns {Object} - Things service client.
   */
  private things_url: URL;
  private content_type: string;
  private thingsEndpoint: string;
  private thingError: Errors;

  public constructor(things_url: string) {
    this.things_url = new URL(things_url);
    this.content_type = "application/json";
    this.thingsEndpoint = "things";
    this.thingError = new Errors();
  }

  private ValidateThingIdThingAndToken(
    thing_id: string,
    thing: Thing,
    token: string,
  ): void {
    // Validate thing_id
    if (typeof thing_id !== "string" || thing_id === null) {
      throw new Error(
        'Invalid parameter. Expected a string for the "thing_id" parameter.',
      );
    }

    // Validate thing
    if (typeof thing !== "object" || thing === null || Array.isArray(thing)) {
      throw new Error(
        'Invalid parameter. Expected an object for the "thing" parameter.',
      );
    }

    // Validate token
    if (typeof token !== "string" || token === null) {
      throw new Error(
        'Invalid parameter. Expected a string for the "token" parameter.',
      );
    }
  }

  public Create(thing: Thing, token: string): Promise<Thing> {
    //Creates a new thing.
    /**
     * @method Create - Creates a new thing when provided with
     * the things information and a valid token.
     * @param {Object} thing - Thing object.
     * @param {string} token - User token.
     * @returns {Object} - Thing object.
     * @example
     * const thing = {
     * "name": "string",
     * "tags": [
     * "tag1",
     * "tag2"
     * ],
     * "credentials": {
     * "identity": "thingidentity",
     * "secret": "bb7edb32-2eac-4aad-aebe-ed96fe073879"
     * },
     * "owner": "bb7edb32-2eac-4aad-aebe-ed96fe073879",
     * "metadata": {
     * "domain": "example.com"
     * },
     * "status": "enabled"
     * }
     */

    this.ValidateThingIdThingAndToken("", thing, token);

    const options = {
      method: "post",
      maxBodyLength: 2000,
      url: new URL(this.thingsEndpoint, this.things_url).toString(),
      headers: {
        "Content-Type": this.content_type,
        Authorization: `Bearer ${token}`,
      },
      data: thing,
    };
    return axios
      .request(options)
      .then((response: AxiosResponse) => {
        return response.data;
      })
      .catch((error) => {
        if (error.response) {
          return this.thingError.HandleError(
            this.thingError.things.create,
            error.response.status,
          );
        }
      });
  }

  public CreateThings(things: Thing[], token: string): Promise<Things> {
    //Creates multiple things.
    /**
     * @method Create_bulk - Creates multiple things when provided with a valid
     * token and an array of things information such as names.
     * @param {list} things - An array of things information.
     * @param {string} token - User token.
     * @returns {list} - Things list.
     * @example
     * const things = [
     * {
     * "name": "thing1"
     * },
     * {
     * "name": "thing2"
     * }
     * ]
     */

    this.ValidateThingIdThingAndToken("", {}, token);

    const options = {
      method: "post",
      maxBodyLength: 2000,
      url: new URL(`${this.thingsEndpoint}/bulk`, this.things_url).toString(),
      headers: {
        "Content-Type": this.content_type,
        Authorization: `Bearer ${token}`,
      },
      data: things,
    };
    return axios
      .request(options)
      .then((response: AxiosResponse) => {
        return response.data;
      })
      .catch((error) => {
        if (error.response) {
          return this.thingError.HandleError(
            this.thingError.things.createbulk,
            error.response.status,
          );
        }
      });
  }

  public GetAll(
    query_params: QueryParams,
    token: string,
  ): Promise<ThingsInterface> {
    //Retrieves thing information.
    /**
     * @method Get - Retrieves thing information when provided with a valid token
     * and thing ID.
     * @param {string} thing_id - Thing ID.
     * @param {string} token - User token.
     * @returns {Object} - Thing object.
     * @example
     * const thing_id = "bb7edb32-2eac-4aad-aebe-ed96fe073879"
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

    this.ValidateThingIdThingAndToken("", {}, token);

    const options = {
      method: "get",
      maxBodyLength: 2000,
      url: new URL(
        `${this.thingsEndpoint}?${new URLSearchParams(
          stringParams,
        ).toString()}`,
        this.things_url,
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
          return this.thingError.HandleError(
            this.thingError.channels.getall,
            error.response.status,
          );
        }
      });
  }

  public GetByChannel(
    thing_id: string,
    query_params: QueryParams,
    token: string,
  ): Promise<Channels> {
    //Retrieves list of channels connected to specified thing with pagination metadata.
    /**
     * @method GetByChannel - Retrieves list of channels connected to specified thing
     * with pagination metadata.
     * @param {string} thing_id - Thing ID.
     * @param {Object} query_params - Query parameters such as offset and limit.
     * @returns {Object} - Channels list.
     */

    if (
      typeof query_params !== "object" ||
      query_params === null ||
      Array.isArray(query_params)
    ) {
      throw new Error("Invalid query parameters. Expected an object.");
    }

    this.ValidateThingIdThingAndToken(thing_id, {}, token);
    const stringParams: Record<string, string> = Object.fromEntries(
      Object.entries(query_params).map(([key, value]) => [key, String(value)]),
    );

    const options = {
      method: "get",
      maxBodyLength: 2000,
      url: new URL(
        `${this.thingsEndpoint}/${thing_id}/channels?${new URLSearchParams(
          stringParams,
        )}`,
        this.things_url,
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
          return this.thingError.HandleError(
            this.thingError.things.getbychannel,
            error.response.status,
          );
        }
      });
  }

  public ThingsGetAll(
    query_params: QueryParams,
    token: string,
  ): Promise<Things> {
    //Retrieves list of things with pagination metadata.
    /**
     * @method GetAll - Retrieves list of things with pagination metadata when provided with a
     * valid token and correct query parameters such as offset and limit.
     * @param {Object} query_params - Query parameters.
     * @param {string} token - User token.
     * @returns {Object} - Things list.
     */

    if (
      typeof query_params !== "object" ||
      query_params === null ||
      Array.isArray(query_params)
    ) {
      throw new Error("Invalid query parameters. Expected an object.");
    }

    this.ValidateThingIdThingAndToken("", {}, token);
    const stringParams: Record<string, string> = Object.fromEntries(
      Object.entries(query_params).map(([key, value]) => [key, String(value)]),
    );
    const options = {
      method: "get",
      maxBodyLength: 2000,
      url: new URL(
        `${this.thingsEndpoint}?${new URLSearchParams(
          stringParams,
        ).toString()}`,
        this.things_url,
      ).toString(),
      headers: {
        "Content-Type": this.content_type,
        Authorization: `Bearer ${token}`,
      },
    };
    return axios
      .request(options)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        if (error.response) {
          return this.thingError.HandleError(
            this.thingError.things.getall,
            error.response.status,
          );
        }
      });
  }

  public Disable(thing_id: string, token: string): Promise<Thing> {
    //Disables thing.
    /**
     * @method Disable - Deletes a thing when provided with a valid token and thing ID.
     * @param {string} thing_id - Thing ID.
     * @param {string} token - User token.
     * @returns {Object} - Thing object with statys disabled.
     */

    this.ValidateThingIdThingAndToken(thing_id, {}, token);

    const options = {
      method: "post",
      maxBodyLength: 2000,
      url: new URL(
        `${this.thingsEndpoint}/${thing_id}/disable`,
        this.things_url,
      ).toString(),
      headers: {
        "Content-Type": this.content_type,
        Authorization: `Bearer ${token}`,
      },
    };
    return axios
      .request(options)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        if (error.response) {
          return this.thingError.HandleError(
            this.thingError.things.disable,
            error.response.status,
          );
        }
      });
  }

  public Update(thing: Thing, token: string): Promise<Thing> {
    //Updates thing.
    /**
     * @method Update - Updates thing when provided with a valid token,
     * thing ID and thing object.
     * @param {string} thing_id - Thing ID.
     * @param {Object} thing - Thing object.
     * @param {string} token - User token.
     * @returns {Object} - Thing object.
     * @example
     * const thing = {
     * "name": "thing3",
     * "tags": [
     * "tag1"
     * ],
     * "credentials": {
     * "identity": "thingidentity",
     * "secret":"12345678"
     * },
     * "owner": "bb7edb32-2eac-4aad-aebe-ed96fe073879",
     * "id": "bb7edb32-2eac-4aad-aebe-ed96fe073879",
     * }
     */

    this.ValidateThingIdThingAndToken("", {}, token);

    const options = {
      method: "patch",
      maxBodyLength: 2000,
      url: new URL(
        `${this.thingsEndpoint}/${thing.id}`,
        this.things_url,
      ).toString(),
      headers: {
        "Content-Type": this.content_type,
        Authorization: `Bearer ${token}`,
      },
      data: thing,
    };
    return axios
      .request(options)
      .then((response: AxiosResponse) => {
        return response.data;
      })
      .catch((error) => {
        if (error.response) {
          return this.thingError.HandleError(
            this.thingError.things.update,
            error.response.status,
          );
        }
      });
  }

  public UpdateThingSecret(thing: Thing, token: string): Promise<Thing> {
    //Updates thing secret.
    /**
     * @method UpdateThingSecret - Updates thing secret when provided with a valid token,
     * thing ID and thing object.
     * @param {string} thing_id - Thing ID.
     * @param {Object} thing - Thing object.
     * @param {string} token - User token.
     * @returns {Object} - Thing object.
     * @example
     * const thing = {
     * "name": "thing3",
     * "tags": [
     * "tag1"
     * ],
     * "credentials": {
     * "identity": "thingidentity",
     * "secret":"56788912"
     * },
     * "owner": "bb7edb32-2eac-4aad-aebe-ed96fe073879",
     * "id": "bb7edb32-2eac-4aad-aebe-ed96fe073879",
     * }
     */

    this.ValidateThingIdThingAndToken("", thing, token);

    const options = {
      method: "patch",
      maxBodyLength: 2000,
      url: new URL(
        `${this.thingsEndpoint}/${thing.id}/secret`,
        this.things_url,
      ).toString(),
      headers: {
        "Content-Type": this.content_type,
        Authorization: `Bearer ${token}`,
      },
      data: JSON.stringify({ secret: thing.credentials?.secret }),
    };
    console.log("data", options.data);
    return axios
      .request(options)
      .then((response: AxiosResponse) => {
        return response.data;
      })
      .catch((error) => {
        if (error.response) {
          return this.thingError.HandleError(
            this.thingError.things.updatethingsecret,
            error.response.status,
          );
        }
      });
  }

  public UpdateThingTags(
    thing_id: string,
    thing: Thing,
    token: string,
  ): Promise<Thing> {
    //Updates thing tags.
    /**
     * @method UpdateThingTags - Updates thing tags when provided with a valid token,
     * thing ID and thing object.
     *
     * @param {string} thing_id - Thing ID.
     * @param {Object} thing - Thing object.
     * @param {string} token - User token.
     * @returns {Object} - Thing object.
     * @example
     * const thing = {
     * "name": "thing3",
     * "tags": [
     * "tag1"
     * ],
     * "credentials": {
     * "identity": "thingidentity",
     * "secret":"56788912"
     * },
     * "owner": "bb7edb32-2eac-4aad-aebe-ed96fe073879",
     * "id": "bb7edb32-2eac-4aad-aebe-ed96fe073879",
     * }
     */

    this.ValidateThingIdThingAndToken("", thing, token);

    const options = {
      method: "patch",
      maxBodyLength: 2000,
      url: new URL(
        `${this.thingsEndpoint}/${thing.id}/tags`,
        this.things_url,
      ).toString(),
      headers: {
        "Content-Type": this.content_type,
        Authorization: `Bearer ${token}`,
      },
      data: thing,
    };
    return axios
      .request(options)
      .then((response: AxiosResponse) => {
        return response.data;
      })
      .catch((error) => {
        if (error.response) {
          return this.thingError.HandleError(
            this.thingError.things.updatethingtags,
            error.response.status,
          );
        }
      });
  }

  public Disconnect(
    thing_ids: Things,
    channel_ids: Channels,
    token: string,
  ): Promise<any> {
    //Disconnects thing from channel.
    /**
     * @method Disconnect - Disconnects thing from channel when provided with a valid token,
     * channel id and a thing id.
     * @param {list} thing_ids - Thing ID.
     * @param {list} channel_ids - Channel ID.
     * @param {string} token - User token.
     *
     */

    if (!Array.isArray(channel_ids)) {
      throw new Error("Invalid parameter. Expected an array for channel_id.");
    }

    if (!Array.isArray(thing_ids)) {
      throw new Error("Invalid parameter. Expected an array for thing_id.");
    }

    this.ValidateThingIdThingAndToken("", {}, token);

    const payload = { subjects: thing_ids, objects: channel_ids };
    const options = {
      method: "post",
      maxBodyLength: 2000,
      url: new URL(`disconnect`, this.things_url).toString(),
      headers: {
        "Content-Type": this.content_type,
        Authorization: `Bearer ${token}`,
      },
      data: payload,
    };
    return axios
      .request(options)
      .then((_response) => {
        return "Policy deleted.";
      })
      .catch((error) => {
        if (error.response) {
          return this.thingError.HandleError(
            this.thingError.things.disconnect,
            error.response.status,
          );
        }
      });
  }

  public IdentifyThing(thing_key: string): Promise<Thing> {
    //Validates thing's key and returns it's ID if key is valid
    /**
     * @method IdentifyThing - Validates thing's key and returns it's ID if key is valid. The method
     * does not require a token.
     * @param {string} thing_key - Thing secret.
     * @returns {Object} - Thing object.
     *
     */

    if (typeof thing_key !== "string" || thing_key === null) {
      throw new Error("Invalid thing_key parameter. Expected a string.");
    }

    const options = {
      method: "post",
      maxBodyLength: 2000,
      url: new URL(`identify`, this.things_url).toString(),
      headers: {
        "Content-Type": this.content_type,
        Authorization: `Thing ${thing_key}`,
      },
    };
    console.log(options.url.toString());
    return axios
      .request(options)
      .then((response: AxiosResponse) => {
        return response.data;
      })
      .catch((error) => {
        if (error.response) {
          return this.thingError.HandleError(
            this.thingError.things.identifything,
            error.response.status,
          );
        }
      });
  }

  public AuthoriseThing(
    thing_id: string,
    channel_id: string,
    action: string,
    entity_type: string,
    token: string,
  ) {
    //Authorises thing
    /**
     * @method AuthoriseThing - Authorises a thing to perform an action on a channel
     * when provided with a valid token, thing ID, channel ID, action and entity type.
     * @param {string} thing_id - Thing ID.
     * @param {string} channel_id - Channel ID.
     * @param {string} action - Action for example: ["m_read", "m_write"].
     * @param {string} entity_type - Type of the thing class for example: "group".
     * @param {string} token - User token.
     * @return {Object} - True if thing is authorised, false if not.
     */

    if (
      typeof thing_id !== "string" ||
      typeof channel_id !== "string" ||
      typeof action !== "string" ||
      typeof entity_type !== "string" ||
      typeof token !== "string"
    ) {
      throw new Error(
        "Invalid parameter types. Expected strings for thing_id, channel_id, action, entity_type, and token.",
      );
    }
    const access_request = {
      subject: thing_id,
      object: channel_id,
      action: action,
      entity_type: entity_type,
    };
    const options = {
      method: "post",
      maxBodyLength: 2000,
      url: new URL(this.things_url + `channels/object/access`).toString(),
      headers: {
        "Content-Type": this.content_type,
        Authorization: `Bearer ${token}`,
      },
      data: access_request,
    };
    console.log(options.url.toString());
    return axios
      .request(options)
      .then((_response) => {
        return true;
      })
      .catch((_error) => {
        return false;
      });
  }
  public ThingsPermissions(
    thing_id: string,
    token: string,
    thing: Thing,
  ): Promise<any> {
    //Retrieves thing permissions.
    /**
     * @method Permissions - Retrieves thing permissions when provided with a valid token
     * and thing ID.
     * @param {string}
     * @param {string} token - User token.
     * @returns {Object} - Thing permissions.
     * @example
     * const thing_id = "bb7edb32-2eac-4aad-aebe-ed96fe073879"
     * const token
     * const permissions = Things.Permissions(thing_id, token)
     * console.log(permissions)
     * */
    if (thing_id === null || token === null) {
      throw new Error(
        "Invalid parameter types. Expected strings for thing_id and token.",
      );
    }
    this.ValidateThingIdThingAndToken("", thing, token);

    const options = {
      method: "get",
      maxBodyLength: 2000,
      url: new URL(
        `${this.thingsEndpoint}/${thing_id}/permissions`,
        this.things_url,
      ).toString(),
      headers: {
        "Content-Type": this.content_type,
        Authorization: `Bearer ${token}`,
      },
    };
    console.log(options.url.toString());
    return axios
      .request(options)
      .then((response: AxiosResponse) => {
        return response.data;
      })
      .catch((error) => {
        if (error.response) {
          return this.thingError.HandleError(
            this.thingError.things.identifything,
            error.response.status,
          );
        }
      });
  }
  public Enable(thing_id: string, token: string): Promise<Thing> {
    //Enables thing.
    /**
     * @method Enable - Deletes a thing when provided with a valid token and thing ID.
     * @param {string} thing_id - Thing ID.
     * @param {string} token - User token.
     * @returns {Object} - Thing object with statys enabled.
     */

    this.ValidateThingIdThingAndToken(thing_id, {}, token);

    const options = {
      method: "post",
      maxBodyLength: 2000,
      url: new URL(
        `${this.thingsEndpoint}/${thing_id}/enable`,
        this.things_url,
      ).toString(),
      headers: {
        "Content-Type": this.content_type,
        Authorization: `Bearer ${token}`,
      },
    };
    return axios
      .request(options)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        if (error.response) {
          return this.thingError.HandleError(
            this.thingError.things.enable,
            error.response.status,
          );
        }
      });
  }
  public ListThingUsers(
    thingID: string,
    token: string,
    query_params: QueryParams,
    things: ThingsInterface,
    userID: string,
  ): Promise<Users> {
    //Retrieves list of users connected to specified thing with pagination metadata.
    /**
     * @method ListThingUsers - Retrieves list of users connected to specified thing
     * with pagination metadata.
     * @param {string}
     *  */
    if (!Array.isArray(thingID) || !Array.isArray(userID)) {
      throw new Error(
        "Invalid parameters. Expected arrays for actions, things_ids and users_ids.",
      );
    }

    this.ValidateThingIdThingAndToken("", {}, token);
    const stringParams: Record<string, string> = Object.fromEntries(
      Object.entries(query_params).map(([key, value]) => [key, String(value)]),
    );
    const payload = {
      subjects: thingID,
      objects: userID,
    };
    const options = {
      method: "post",
      maxBodyLength: 2000,
      url: new URL(
        `/things/${thingID}/users?${new URLSearchParams(
          stringParams,
        ).toString()}`,
        this.things_url,
      ).toString(),
      headers: {
        "Content-Type": this.content_type,
        Authorization: `Bearer ${token}`,
      },
      data: payload,
    };
    console.log(options.url.toString());
    return axios
      .request(options)
      .then((_response) => {
        return _response.data;
      })
      .catch((error) => {
        if (error.response) {
          return this.thingError.HandleError(
            this.thingError.things.connects,
            error.response.status,
          );
        }
        return undefined;
      });
  }
  public ShareThing(
    thing_id: string,
    user_id: string,
    token: string,
  ): Promise<any> {
    // Shares a thing with a user.
    /**
     * @method ShareThing - Shares a thing with a user.
     * @param {string} thing_id - Thing ID.
     * @param {string} user_id - User ID.
     * @param {string} token - User token.
     * @returns {Object} - Nothing
     *
     * */
    if (thing_id === null || user_id === null || token === null) {
      throw new Error(
        "Invalid parameter types. Expected strings for thing_id and user_id.",
      );
    }
    this.ValidateThingIdThingAndToken(thing_id, {}, token);
    const options = {
      method: "post",
      maxBodyLength: 2000,
      url: new URL(`connect`, this.things_url).toString(),
      headers: {
        "Content-Type": this.content_type,
        Authorization: `Bearer ${token}`,
      },
      data: { thing_id, user_id },
    };
    console.log(options.url.toString());
    return axios
      .request(options)
      .then((_response) => {
        return _response.data;
      })
      .catch((error) => {
        if (error.response) {
          return this.thingError.HandleError(
            this.thingError.things.connects,
            error.response.status,
          );
        }
      });
  }
  public UnshareThing(
    thing_id: string,
    user_id: string,
    token: string,
  ): Promise<any> {
    // Shares a thing with a user.
    /**
     * @method UnshareThinghare - UnShares a thing with a user.
     * @param {string} thing_id - Thing ID.
     * @param {string} user_id - User ID.
     * @param {string} token - User token.
     * @returns {Object} - Nothing
     *
     * */
    if (thing_id === null || user_id === null || token === null) {
      throw new Error(
        "Invalid parameter types. Expected strings for thing_id and user_id.",
      );
    }
    this.ValidateThingIdThingAndToken(thing_id, {}, token);
    const options = {
      method: "post",
      maxBodyLength: 2000,
      url: new URL(`connect`, this.things_url).toString(),
      headers: {
        "Content-Type": this.content_type,
        Authorization: `Bearer ${token}`,
      },
      data: { thing_id, user_id },
    };
    console.log(options.url.toString());
    return axios
      .request(options)
      .then((_response) => {
        return _response.data;
      })
      .catch((error) => {
        if (error.response) {
          return this.thingError.HandleError(
            this.thingError.things.connects,
            error.response.status,
          );
        }
      });
  }
  public DeleteThing(thing_id: string, token: string): Promise<any> {
    // Deletes a thing.
    /**
     * @method DeleteThing - Deletes a thing.
     * @param {string}
     *  */
    if (thing_id === null || token === null) {
      throw new Error(
        "Invalid parameter types. Expected strings for thing_id and user_id.",
      );
    }
    this.ValidateThingIdThingAndToken(thing_id, {}, token);
    const options = {
      method: "post",
      maxBodyLength: 2000,
      url: new URL(
        `${this.thingsEndpoint}/${thing_id}/permissions`,
        this.things_url,
      ).toString(),
      headers: {
        "Content-Type": this.content_type,
        Authorization: `Bearer ${token}`,
      },
      data: { thing_id },
    };
    console.log(options.url.toString());
    return axios
      .request(options)
      .then((_response: AxiosResponse) => "Thing Deleted.")
      .catch((error) => {
        if (error.response) {
          return this.thingError.HandleError(
            this.thingError.things.connect,
            error.response.status,
          );
        }
      });
  }
}

export default Things;
