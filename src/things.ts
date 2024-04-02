import Errors from "./errors";
export interface Thing {
  name?: string;
  id?: string;
  credentials?: {
    identity?: string;
    secret: string;
  };
  owner?: string;
  tags?: [string, string];
  status?: "enabled" | "disabled";
  createdAt?: string;
  updatedAt?: string;
  updatedBy?: string;
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

interface UsersRelationRequest {
  Relation: string;
  UserID: string[];
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
export default class Things {
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
  private readonly thingsUrl: URL;
  private readonly contentType: string;
  private readonly thingsEndpoint: string;
  private readonly thingError: Errors;
  private readonly thingsShareEndpoint: string = "share";
  private readonly thingsUnshareEndpoint: string = "unshare";
  private readonly thingsPermissionsEndpoint: string = "permissions";

  public constructor(thingsUrl: string) {
    this.thingsUrl = new URL(thingsUrl);
    this.contentType = "application/json";
    this.thingsEndpoint = "things";
    this.thingError = new Errors();
  }

  public async Create(thing: Thing, token?: string): Promise<Thing> {
    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": this.contentType,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(thing),
    };

    try {
      const response = await fetch(
        new URL(this.thingsEndpoint, this.thingsUrl).toString(),
        options,
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw this.thingError.HandleError(errorRes.error, response.status);
      }
      const thingData = await response.json();
      return thingData;
    } catch (error) {
      throw error;
    }
  }

  public async CreateThings(
    things: Thing[],
    token?: string,
  ): Promise<BulkThings> {
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

    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": this.contentType,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(things),
    };
    try {
      const response = await fetch(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        new URL(`${this.thingsEndpoint}/bulk`, this.thingsUrl).toString(),
        options,
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw this.thingError.HandleError(errorRes.error, response.status);
      }
      const thingData = await response.json();
      return thingData;
    } catch (error) {
      throw error;
    }
  }

  public async GetAll(
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
    // if (
    //   typeof query_params !== "object" ||
    //   query_params === null ||
    //   Array.isArray(query_params)
    // ) {
    //   throw new Error("Invalid query parameters. Expected an object.");
    // }

    const stringParams: Record<string, string> = Object.fromEntries(
      Object.entries(query_params).map(([key, value]) => [key, String(value)]),
    );

    const options: RequestInit = {
      method: "get",
      headers: {
        "Content-Type": this.contentType,
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await fetch(
        new URL(
          `${this.thingsEndpoint}?${new URLSearchParams(stringParams).toString()}`,
          this.thingsUrl,
        ).toString(),
        options,
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw this.thingError.HandleError(errorRes.error, response.status);
      }
      const thingsData = await response.json();
      return thingsData;
    } catch (error) {
      throw error;
    }
  }

  public async ThingsByChannel(
    thing: Thing,
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

    const stringParams: Record<string, string> = Object.fromEntries(
      Object.entries(query_params).map(([key, value]) => [key, String(value)]),
    );

    const options: RequestInit = {
      method: "get",
      headers: {
        "Content-Type": this.contentType,
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await fetch(
        new URL(
          `${this.thingsEndpoint}/${thing.id}/channels?${new URLSearchParams(
            stringParams,
          ).toString()}`,
          this.thingsUrl,
        ).toString(),
        options,
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw this.thingError.HandleError(errorRes.error, response.status);
      }
      const channelsData = await response.json();
      return channelsData;
    } catch (error) {
      throw error;
    }
  }

  public async ThingsGetAll(
    query_params: QueryParams,
    token: string,
  ): Promise<ThingsInterface> {
    //Retrieves list of things with pagination metadata.
    /**
     * @method GetAll - Retrieves list of things with pagination metadata when provided with a
     * valid token and correct query parameters such as offset and limit.
     * @param {Object} query_params - Query parameters.
     * @param {string} token - User token.
     * @returns {Object} - Things list.
     */

    const stringParams: Record<string, string> = Object.fromEntries(
      Object.entries(query_params).map(([key, value]) => [key, String(value)]),
    );
    const options: RequestInit = {
      method: "get",
      headers: {
        "Content-Type": this.contentType,
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await fetch(
        new URL(
          `${this.thingsEndpoint}?${new URLSearchParams(
            stringParams,
          ).toString()}`,
          this.thingsUrl,
        ).toString(),
        options,
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw this.thingError.HandleError(errorRes.error, response.status);
      }
      const thingsData = await response.json();
      return thingsData;
    } catch (error) {
      throw error;
    }
  }

  public async Disable(thing: Thing, token: string): Promise<Thing> {
    //Disables thing.
    /**
     * @method Disable - Deletes a thing when provided with a valid token and thing ID.
     * @param {string} thing_id - Thing ID.
     * @param {string} token - User token.
     * @returns {Object} - Thing object with statys disabled.
     */

    const options: RequestInit = {
      method: "post",
      headers: {
        "Content-Type": this.contentType,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(thing),
    };
    try {
      const response = await fetch(
        new URL(
          `${this.thingsEndpoint}/${thing.id}/disable`,
          this.thingsUrl,
        ).toString(),
        options,
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw this.thingError.HandleError(errorRes.error, response.status);
      }
      const thingData = await response.json();
      return thingData;
    } catch (error) {
      throw error;
    }
  }

  public async Update(thing: Thing, token: string): Promise<Thing> {
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

    const options: RequestInit = {
      method: "PATCH",
      headers: {
        "Content-Type": this.contentType,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(thing),
    };
    try {
      const response = await fetch(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        new URL(
          `${this.thingsEndpoint}/${thing.id}`,
          this.thingsUrl,
        ).toString(),
        options,
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw this.thingError.HandleError(errorRes.error, response.status);
      }
      const thingData = await response.json();
      return thingData;
    } catch (error) {
      throw error;
    }
  }

  public async UpdateThingSecret(thing: Thing, token: string): Promise<Thing> {
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

    const options: RequestInit = {
      method: "PATCH",
      headers: {
        "Content-Type": this.contentType,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(thing),
    };
    try {
      const response = await fetch(
        new URL(
          `${this.thingsEndpoint}/${thing.id}/secret`,
          this.thingsUrl,
        ).toString(),
        options,
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw this.thingError.HandleError(errorRes.error, response.status);
      }
      const thingData = await response.json();
      return thingData;
    } catch (error) {
      throw error;
    }
  }

  public async UpdateThingTags(thing: Thing, token: string): Promise<Thing> {
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

    const options: RequestInit = {
      method: "PATCH",
      headers: {
        "Content-Type": this.contentType,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(thing),
    };

    try {
      const response = await fetch(
        new URL(
          `${this.thingsEndpoint}/${thing.id}/tags`,
          this.thingsUrl,
        ).toString(),
        options,
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw this.thingError.HandleError(errorRes.error, response.status);
      }
      const thingData = await response.json();
      return thingData;
    } catch (error) {
      throw error;
    }
  }

  public async Thing(thingId: string, token: string): Promise<Thing> {
    // Gets a user
    /**
     * Provides information about the user with provided ID. The user is
     * retrieved using authorization user_token.
     * @method User - Gets a user.
     * @param {String} userId - User ID.
     * @param {String} token - Access token.
     * @returns {Object} - User object.
     * @example
     * const userId = "886b4266-77d1-4258-abae-2931fb4f16de"
     *
     */

    const options: RequestInit = {
      method: "GET",
      headers: {
        "Content-Type": this.contentType,
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await fetch(
        new URL(`${this.thingsEndpoint}/${thingId}`, this.thingsUrl).toString(),
        options,
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw this.thingError.HandleError(errorRes.error, response.status);
      }
      const thingData = await response.json();
      return thingData;
    } catch (error) {
      throw error;
    }
  }

  public async IdentifyThing(thing: Thing): Promise<Thing> {
    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": this.contentType,
        Authorization: `Thing ${thing.id}`,
      },
      body: JSON.stringify(thing),
    };

    try {
      const response = await fetch(
        new URL(this.thingsEndpoint, this.thingsUrl).toString(),
        options,
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw this.thingError.HandleError(errorRes.error, response.status);
      }
      const thingData = await response.json();
      return thingData;
    } catch (error) {
      throw error;
    }
  }

  public async ThingsPermissions(
    thingID: string,
    token: string,
  ): Promise<Thing | undefined> {
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

    const options: RequestInit = {
      method: "get",
      headers: {
        "Content-Type": this.contentType,
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await fetch(
        new URL(
          `${this.thingsEndpoint}/${thingID}/permissions`,
          this.thingsUrl,
        ).toString(),
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw this.thingError.HandleError(errorRes.error, response.status);
      }
      const thingData = await response.json();
      return thingData;
    } catch (error) {
      throw error;
    }
  }
  public async Enable(thing: Thing, token: string): Promise<Thing> {
    //Enables thing.
    /**
     * @method Enable - Deletes a thing when provided with a valid token and thing ID.
     * @param {string} thing_id - Thing ID.
     * @param {string} token - User token.
     * @returns {Object} - Thing object with statys enabled.
     */

    const options: RequestInit = {
      method: "post",
      headers: {
        "Content-Type": this.contentType,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(thing),
    };

    try {
      const response = await fetch(
        new URL(
          `${this.thingsEndpoint}/${thing.id}/enable`,
          this.thingsUrl,
        ).toString(),
        options,
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw this.thingError.HandleError(errorRes.error, response.status);
      }
      const thingData = await response.json();
      return thingData;
    } catch (error) {
      throw error;
    }
  }
  public async Things(
    queryParams: QueryParams,
    token: string,
  ): Promise<ThingsInterface> {
    // Gets all things with pagination.
    /**
     * Provides information about all users. The users are retrieved using
     * authorization user_token.
     *
     * @method Things - Gets all things with pagination.
     * @param {Object} queryParams - Query parameters.
     * @param {String} token - Access token.
     * @returns {Object} - Thing object.
     * @example
     * const queryParams = {
     * "offset": 0,
     * "limit": 10
     * }
     *
     */

    const stringParams: Record<string, string> = Object.fromEntries(
      Object.entries(queryParams).map(([key, value]) => [key, String(value)]),
    );

    const options: RequestInit = {
      method: "get",
      headers: {
        "Content-Type": this.contentType,
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await fetch(
        new URL(
          `${this.thingsEndpoint}?${new URLSearchParams(stringParams).toString()}`,
          this.thingsUrl,
        ).toString(),
        options,
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw this.thingError.HandleError(errorRes.error, response.status);
      }
      const thingsData = await response.json();
      return thingsData;
    } catch (error) {
      throw error;
    }
  }

  public async ListThingUsers(
    thingID: string,
    query_params: QueryParams,
    token: string,
  ): Promise<Users> {
    //Retrieves list of users connected to specified thing with pagination metadata.
    /**
     * @method ListThingUsers - Retrieves list of users connected to specified thing
     * with pagination metadata.
     * @param {string}
     *  */
    const stringParams: Record<string, string> = Object.fromEntries(
      Object.entries(query_params).map(([key, value]) => [key, String(value)]),
    );
    const options: RequestInit = {
      method: "get",
      headers: {
        "Content-Type": this.contentType,
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await fetch(
        new URL(this.thingsEndpoint, this.thingsUrl).toString(),
        options,
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw this.thingError.HandleError(errorRes.error, response.status);
      }
      const userData = await response.json();
      return userData;
    } catch (error) {
      throw error;
    }
  }

  public async ShareThing(
    thingId: string,
    req: UsersRelationRequest,
    token: string,
  ): Promise<Thing> {
    // Shares a thing with a user.
    /**
     * @method ShareThing - Shares a thing with a user.
     * @param {string} thing_id - Thing ID.
     * @param {string} user_id - User ID.
     * @param {string} token - User token.
     * @returns {Object} - Nothing
     *
     * */
    const options: RequestInit = {
      method: "post",
      headers: {
        "Content-Type": this.contentType,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(req),
    };

    try {
      const response = await fetch(
        new URL(
          `${this.thingsEndpoint}/${thingId}/share`,
          this.thingsUrl,
        ).toString(),
        options,
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw this.thingError.HandleError(errorRes.error, response.status);
      }
      const thingData = await response.json();
      return thingData;
    } catch (error) {
      throw error;
    }
  }

  public async UnShareThing(
    thingId: string,
    req: UsersRelationRequest,
    token: string,
  ): Promise<Thing> {
    // Shares a thing with a user.
    /**
     * @method UnShareThing - UnShares a thing with a user.
     * @param {string} thing_id - Thing ID.
     * @param {string} user_id - User ID.
     * @param {string} token - User token.
     * @returns {Object} - Nothing
     *
     * */
    const options = {
      method: "post",
      headers: {
        "Content-Type": this.contentType,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(req),
    };

    try {
      const response = await fetch(
        new URL(
          `${this.thingsEndpoint}/${thingId}/unshare`,
          this.thingsUrl,
        ).toString(),
        options,
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw this.thingError.HandleError(errorRes.error, response.status);
      }
      const thingData = await response.json();
      return thingData;
    } catch (error) {
      throw error;
    }
  }

  public async DeleteThing(thing: Thing, token: string): Promise<string> {
    // Deletes a thing.
    /**
     * @method DeleteThing - Deletes a thing.
     * @param {string}
     *  */
    const options: RequestInit = {
      method: "delete",
      headers: {
        "Content-Type": this.contentType,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(thing),
    };

    try {
      const response = await fetch(
        new URL(
          `${this.thingsEndpoint}/${thing.id}`,
          this.thingsUrl,
        ).toString(),
        options,
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw this.thingError.HandleError(errorRes.error, response.status);
      }
      return "Thing Deleted";
    } catch (error) {
      throw error;
    }
  }
}
