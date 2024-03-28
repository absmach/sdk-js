import axios, { AxiosResponse } from "axios";
import { Errors } from "./errors";

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
interface PageRes {
  total: number;
  offset: number;
  limit: number;
}

interface ChannelsInterface {
  channels: Channel[];
  page: PageRes;
  //id: string;
}

interface QueryParams {
  offset: number;
  limit: number;
  [key: string]: number | string;
}

interface UserRelation {
  user_id: string[];
  relation: string;
}
class Channels {
  //Channels API client
  /**
   * @class Channels -
   * Channels API is used for managing Channels. It is used for creating new
   * channels, retrieving them, updating them and disabling them
   * @param {string} channels_url - URL to the Channels service
   * @param {string} content_type - Content type for the requests which is an application
   * json
   * @param {string} channelsEndpoint - Endpoint for the channels' service.
   * @returns {Object} -Channels object
   *
   */
  private channels_url: URL;
  private content_type: string;
  private channelsEndpoint: string;
  private channelError: Errors;

  public constructor(channels_url: string) {
    this.channels_url = new URL(channels_url);
    this.content_type = "application/json";
    this.channelsEndpoint = "channels";
    this.channelError = new Errors();
  }
  private ValidateChannelChannelIDAndToken(
    channel: Channel,
    channel_id: string,
    token: string,
  ) {
    //Validate channel
    if (typeof channel !== "object" || channel === null) {
      throw new Error("Invalid channel parameter. Expected an object.");
    }

    // Validate channel_id
    if (typeof channel_id !== "string" || channel_id === null) {
      throw new Error("Invalid channel_id parameter. Expected a string.");
    }

    // Validate token
    if (typeof token !== "string" || token === null) {
      throw new Error("Invalid token parameter. Expected a string.");
    }
  }

  public Create(channel: Channel, token: string): Promise<Channel> {
    //Creates a new channel
    /**
     * @method Create - Creates new channels when provided with a channel object
     * with viable fresh information and a valid token.
     * @param {Object} channel - Channel Object with a name and id.
     * @param {String} token - An access token that is valid.
     * @returns {Object} - Channel object.
     * @example
     * const channel = {
     * "name": "channelName",
     * "description": "long channel description",
     * "parent_id": "bb7edb32-2eac-4aad-aebe-ed96fe073879",
     *  "metadata": {
     *       "domain": "example.com"
     *  },
     * "status": "enabled",
     * "owner_id": "bb7edb32-2eac-4aad-aebe-ed96fe073879"
     * }
     *
     */

    this.ValidateChannelChannelIDAndToken(channel, "", token);

    const options = {
      method: "post",
      maxBodyLength: 2000,
      url: new URL(this.channelsEndpoint, this.channels_url).toString(),
      headers: {
        "Content-Type": this.content_type,
        Authorization: `Bearer ${token}`,
      },
      data: channel,
    };
    return axios
      .request(options)
      .then((response: AxiosResponse) => {
        return response.data;
      })
      .catch((error) => {
        if (error.response) {
          return this.channelError.HandleError(
            this.channelError.channels.create,
            error.response.status,
          );
        }
      });
  }

  public CreateChannels(
    channel: Channel[],
    token: string,
  ): Promise<ChannelsInterface> {
    //Creates multiple channels.
    /**
     * @method Create_bulk - Creates multiple channels when provided with a channel object
     * with viable fresh information and a valid token.
     * @param {List} channels - Channel Object with a name and id.
     * @param {String} token - An access token that is valid.
     * @returns {Object} - Channels object.
     * @example
     * const channels = [
     * { "name": "channelA", "id": "bb7edb32-2eac-4aad-aebe-ed96fe073879" },
     * { "name": "channelB", "id": "290b0f49-7a57-4b8c-9e4e-fbf17c6ab7d9" }
     * ]
     */

    if (!Array.isArray(channel)) {
      throw new Error(
        'Invalid parameter. Expected an array for the "channels" parameter.',
      );
    }
    this.ValidateChannelChannelIDAndToken({}, "", token);

    const options = {
      method: "post",
      maxBodyLength: 2000,
      url: new URL(
        `${this.channelsEndpoint}/channels`,
        this.channels_url,
      ).toString(),
      headers: {
        "Content-Type": this.content_type,
        Authorization: `Bearer ${token}`,
      },
      data: JSON.stringify({ channel }),
    };
    console.log("data", channel);
    return axios
      .request(options)
      .then((response: AxiosResponse) => {
        return response.data;
      })
      .catch((error) => {
        if (error.response) {
          return this.channelError.HandleError(
            this.channelError.channels.createbulk,
            error.response.status,
          );
        }
      });
  }

  public GetChannel(
    channel_id: string,
    token: string,
  ): Promise<ChannelsInterface> {
    //Retrieves channel with specified id.
    /**
     * @method Get - Retrieves channel with specified id and a valid token.
     * @param {String} channel_id - Channel id.
     * @param {String} token - An access token that is valid.
     * @returns {Object} - Channel object.
     */

    this.ValidateChannelChannelIDAndToken({}, channel_id, token);

    const options = {
      method: "get",
      maxBodyLength: 2000,
      url: new URL(
        `${this.channelsEndpoint}/${channel_id}`,
        this.channels_url,
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
          return this.channelError.HandleError(
            this.channelError.channels.get,
            error.response.status,
          );
        }
      });
  }

  public GetByThing(
    channel_id: string,
    query_params: QueryParams,
    token: string,
  ): Promise<ChannelsInterface> {
    //Retrieves list of things connected to specified channel with pagination metadata.
    /**
     * @method GetByThing - Retrieves list of things connected to specified channel with pagination metadata.
     * @param {String} channel_id - Channel id.
     * @param {Object} query_params - Query parameters for the request.
     * @param {String} token - An access token that is valid.
     * @returns {List} - Things list.
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

    const options = {
      method: "get",
      maxBodyLength: 2000,
      url: new URL(
        `${this.channelsEndpoint}/${channel_id}/things?${new URLSearchParams(
          stringParams,
        ).toString()}`,
        this.channels_url,
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
          return this.channelError.HandleError(
            this.channelError.channels.getbything,
            error.response.status,
          );
        }
      });
  }

  public GetAll(
    query_params: QueryParams,
    token: string,
  ): Promise<ChannelsInterface> {
    //Provides a list of all channels with pagination metadata.
    /**
     * @method GetAll - Provides a list of all channels with pagination metadata.
     * @param {Object} query_params - Query parameters for the request.
     * @param {String} token - An access token that is valid.
     * @returns {Object} - Channel Object.
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

    this.ValidateChannelChannelIDAndToken({}, "", token);

    const options = {
      method: "get",
      maxBodyLength: 2000,
      url: new URL(
        `${this.channelsEndpoint}?${new URLSearchParams(
          stringParams,
        ).toString()}`,
        this.channels_url,
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
          return this.channelError.HandleError(
            this.channelError.channels.getall,
            error.response.status,
          );
        }
      });
  }

  public Update(
    channel_id: string,
    channel: Channel,
    token: string,
  ): Promise<Channel> {
    //Updates channel with specified id.
    /**
     * @method Update - Updates channel with specified id.
     * @param {Object} channel - Channel object with new information.
     * @param {String} token - An access token that is valid.
     * @returns {Object} - Channel Object.
     */

    this.ValidateChannelChannelIDAndToken(channel, channel_id, token);

    const options = {
      method: "put",
      maxBodyLength: 2000,
      url: new URL(
        `${this.channelsEndpoint}/${channel_id}`,
        this.channels_url,
      ).toString(),
      headers: {
        "Content-Type": this.content_type,
        Authorization: `Bearer ${token}`,
      },
      data: channel,
    };
    return axios
      .request(options)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        if (error.response) {
          return this.channelError.HandleError(
            this.channelError.channels.update,
            error.response.status,
          );
        }
      });
  }

  public Disable(
    channel_id: string,
    token: string,
  ): Promise<ChannelsInterface> {
    //Disables channel with specified id.
    /**
     * @method Disable - Disables channel with specified id.
     * @param {Object} channel - Channel object with new information.
     * @param {String} token - An access token that is valid.
     * @returns {Object} - Channel Object.
     */

    this.ValidateChannelChannelIDAndToken({}, channel_id, token);

    const options = {
      method: "post",
      maxBodyLength: 2000,
      url: new URL(
        `${this.channelsEndpoint}/${channel_id}/disable`,
        this.channels_url,
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
          return this.channelError.HandleError(
            this.channelError.channels.disable,
            error.response.status,
          );
        }
      });
  }
  public Enable(channel_id: string, token: string): Promise<ChannelsInterface> {
    //Disables channel with specified id.
    /**
     * @method Enable - Enables channel with specified id.
     * @param {Object} channel - Channel object with new information.
     * @param {String} token - An access token that is valid.
     * @returns {Object} - Channel Object.
     */

    this.ValidateChannelChannelIDAndToken({}, channel_id, token);

    const options = {
      method: "post",
      maxBodyLength: 2000,
      url: new URL(
        `${this.channelsEndpoint}/${channel_id}/enable`,
        this.channels_url,
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
          return this.channelError.HandleError(
            this.channelError.channels.enable,
            error.response.status,
          );
        }
      });
  }
  // public ChannelPermission(
  //   channel_id: string,
  //   token: string,
  // ): Promise<Channel> {
  //   //Disables channel with specified id.
  //   /**
  //    * @method ChannelPermission - Enables channel with specified id.
  //    * @param {Object}
  //    *  * @param {string} domainID - domain ID.
  //    * @param {string} token - user token.
  //    * @returns {object} - returns an object domain permissions eg:
  //    *  { permissions: [ 'admin', 'edit', 'view', 'membership' ] }
  //    * @example
  //    * const domainID = "domainID";
  //    */
  //   const options: RequestInit = {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": this.content_type,
  //       Authorization: `Bearer ${token}`,
  //     },
  //   };

  //   try {
  //     const response = await fetch(
  //       new URL(
  //         `${this.channelsEndpoint}/${channel_id}/permissions`,
  //         this.channels_url,
  //       ).toString(),
  //       options,
  //     );
  //     if (!response.ok) {
  //       const errorRes = await response.json();
  //       throw this.channelError.HandleError(errorRes.error, response.status);
  //     }
  //     const channelData = await response.json();
  //     return channelData;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }
  // public AddUserToChannel(channel_id: string, UserRelationRequest: UserRelation, token: string): Promise<ChannelsError> {
  //   //Disables channel with specified id.
  //   /**
  //    * @method AddUserToChannel - Enables channel with specified id.
  //    * @param {Object}
  //    *  * @param {string}
  //    * */

  //   const options: RequestInit = {
  //     method: "POST",
  //     maxBodyLength: 2000,
  //     url: new URL(
  //       `${this.channelsEndpoint}?${new URLSearchParams(
  //         ,
  //       ).toString()}`,
  //       this.channels_url,
  //     ).toString()
  //     headers: {
  //       "Content-Type": this.contentType,
  //       Authorization: `Bearer ${token}`,
  //     },
  //     body: JSON.stringify(UserRelationRequest),
  // };

  //   public Delete(channel_id: Channel, token: string): Promise<ChannelsInterface> {
  //     //Deletes channel with specified id.
  //     /**
  //      * @method Disable - Deletes channel with specified id.
  //      * @param {Object} channel - Channel object with new information.
  //      * @param {String} token - An access token that is valid.
  //      * @returns {Object} - Channel Object.
  //      */
  //     const options = {
  //       method: "post",
  //       maxBodyLength: Infinity,
  //       url: `${this.channels_url}/${this.channelsEndpoint}/${channel["id"]}/disable`.toString(),
  //       headers: {
  //         "Content-Type": this.content_type,
  //         Authorization: `Bearer ${token}`,
  //       },
  //     };
  //     return axios
  //       .request(options)
  //       .then((response: AxiosResponse) => {
  //         return response.data;
  //       })
  //       .catch((error) => {
  //         return error.response.data;
  //       });
  //   }
  // public Connect(
  //   {thing_id: string,
  //   channel_id: string,
  //   actions: string[],
  //   token: string,
  // ) {
  //   //Connects thing to channel.
  //   /**
  //    * @method Connect - Connects thing to channel when provided with a valid token,
  //    * channel id and a thing id. The thing must have an action that it can perform over
  //    * the channel.
  //    * @param {string} thing_id - Thing ID.
  //    * @param {string} channel_id - Channel ID.
  //    * @param {list} actions - Action for example: ["m_read", "m_write"].
  //    * @param {string} token - User token.
  //    *
  //    */
  //   if (typeof channel_id !== "string" || channel_id === null) {
  //     throw new Error("Invalid channel_id parameter. Expected a string.");
  //   }

  //   if (!Array.isArray(actions)) {
  //     throw new Error("Invalid parameter. Expected an array for action.");
  //   }

  //   this.ValidateThingIdThingAndToken(thing_id, {}, token);

  //   const payload = { subject: thing_id, object: channel_id, actions: actions };
  //   const options = {
  //     method: "post",
  //     maxBodyLength: 2000,
  //     url: new URL(`connect`, this.things_url.toString()).toString(),
  //     headers: {
  //       "Content-Type": this.content_type,
  //       Authorization: `Bearer ${token}`,
  //     },
  //     data: payload,
  //   };
  //   console.log(options.url.toString());
  //   return axios
  //     .request(options)
  //     .then((_response: AxiosResponse) => "Policy created.")
  //     .catch((error) => {
  //       if (error.response) {
  //         return this.thingError.HandleError(
  //           this.thingError.things.connect,
  //           error.response.status,
  //         );
  //       }
  //     });
  // }

  // public Connects(
  //   thing_ids: string,
  //   channel_ids: string,
  //   actions: Actions,
  //   token: string,
  // ): Promise<any> {
  //   //Connects multiple things to multiple channels.
  //   /**
  //    * @method Connects - Connects multiple things to multiple channels when provided with a valid token,
  //    * arrays of channel ids, thing ids and actions.
  //    * @param {list} thing_ids - Array of thing IDs.
  //    * @param {list} channel_ids - Array of channel IDs.
  //    * @param {list} actions - Array of actions for example: ["m_read", "m_write"].
  //    * @param {string} token - User token.
  //    * @returns {Object} - Policy object.
  //    *
  //    */

  //   if (
  //     !Array.isArray(thing_ids) ||
  //     !Array.isArray(channel_ids) ||
  //     !Array.isArray(actions)
  //   ) {
  //     throw new Error(
  //       "Invalid parameters. Expected arrays for actions, things_ids and channel_ids.",
  //     );
  //   }

  //   this.ValidateThingIdThingAndToken("", {}, token);

  //   const payload = {
  //     subjects: thing_ids,
  //     objects: channel_ids,
  //     actions: actions,
  //   };
  //   const options = {
  //     method: "post",
  //     maxBodyLength: 2000,
  //     url: new URL(`connect`, this.things_url).toString(),
  //     headers: {
  //       "Content-Type": this.content_type,
  //       Authorization: `Bearer ${token}`,
  //     },
  //     data: payload,
  //   };
  //   console.log(options.url.toString());
  //   return axios
  //     .request(options)
  //     .then((_response) => {
  //       return { channels: "Policy created." };
  //     })
  //     .catch((error) => {
  //       if (error.response) {
  //         return this.thingError.HandleError(
  //           this.thingError.things.connects,
  //           error.response.status,
  //         );
  //       }
  //       return Promise.resolve("Policy created.");
  //     });
  //}
}
export default Channels;
