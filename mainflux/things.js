// import fetch from "node-fetch";
const axios = require("axios");

class Things {
  constructor(things_url) {
    this.things_url = things_url;
    this.content_type = "application/json";
    this.thingsEndpoint = "things";
  }

  Create(thing, token) {
    
    const options = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${this.things_url}/${this.thingsEndpoint}`,
      headers: {
        "Content-Type": this.content_type,
        Authorization: `Bearer ${token}`,
      },
      data: JSON.stringify(thing),
    };
    return axios.request(options)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response.data;
      })
  }

  Create_bulk(things, token) {
    
    const options = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${this.things_url}/${this.thingsEndpoint}/bulk`,
      headers: {
        "Content-Type": this.content_type,
        Authorization: `Bearer ${token}`,
      },
      data: JSON.stringify(things),
    };
    return axios.request(options)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response.data;
      })
  }

  Get(thing_id, token) {
    
    const options = {
      method: "get",
      maxBodyLength: Infinity, 
      url: `${this.things_url}/${this.thingsEndpoint}/${thing_id}`,
      headers: {
        "Content-Type": this.content_type,
        Authorization: `Bearer ${token}`,
      },
    };
    return axios.request(options)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response.data;
      })
  }

  Get_by_channel(thing_id, query_params, token) {
    //Retrieves list of channels connected to specified thing with pagination metadata.
    
    const options = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${this.things_url}/${this.thingsEndpoint}/${thing_id}/channels?${new URLSearchParams(query_params).toString()}`,
      headers: {
        "Content-Type": this.content_type,
        Authorization: `Bearer ${token}`,
      },
      params: query_params,
    };
    return axios.request(options)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response.data;
      })
  }

  Get_all(query_params, token) {
    
    const options = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${this.things_url}/${this.thingsEndpoint}?${new URLSearchParams(query_params).toString()}`,
      headers: {
        "Content-Type": this.content_type,
        Authorization: `Bearer ${token}`,
      },
      params: query_params,
    };
    return axios.request(options)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response.data;
      })
  }

  Disable(thing_id, token) {
    
    const options = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${this.things_url}/${this.thingsEndpoint}/${thing_id}/disable`,
      headers: {
        "Content-Type": this.content_type,
        Authorization: `Bearer ${token}`,
      },
    };
    return axios.request(options)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response.data;
      })
  }

  Update(thing_id, thing, token) {
    
    const options = {
      method: "patch",
      maxBodyLength: Infinity,
      url: `${this.things_url}/${this.thingsEndpoint}/${thing_id}`,
      headers: {
        "Content-Type": this.content_type,
        Authorization: `Bearer ${token}`,
      },
      data: JSON.stringify(thing),
    };
    return axios.request(options)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response.data;
      })
  }

  Update_thing_secret(thing_id, thing, token) {
    
    const options = {
      method: "patch",
      maxBodyLength: Infinity,
      url: `${this.things_url}/${this.thingsEndpoint}/${thing_id}/secret`,
      headers: {
        "Content-Type": this.content_type,
        Authorization: `Bearer ${token}`,
      },
      data: JSON.stringify(thing),
    };
    return axios.request(options)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response.data;
      })
  }

  Update_thing_tags(thing_id, thing, token) {
    
    const options = {
      method: "patch",
      maxBodyLength: Infinity,
      url: `${this.things_url}/${this.thingsEndpoint}/${thing_id}/tags`,
      headers: {
        "Content-Type": this.content_type,
        Authorization: `Bearer ${token}`,
      },
      data: JSON.stringify(thing),
    };
    return axios.request(options)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response.data;
      })
  }

  Update_thing_owner(thing_id, thing, token) {
    
    const options = {
      method: "patch",
      maxBodyLength: Infinity,
      ul: `${this.things_url}/${this.thingsEndpoint}/${thing_id}/owner`,
      headers: {
        "Content-Type": this.content_type,
        Authorization: `Bearer ${token}`,
      },
      data: JSON.stringify(thing),
    };
    return axios.request(options)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response.data;
      })
  }

  Connect(thing_id, channel_id, action, token) {
    
    const payload = { "subject": thing_id, "object": channel_id, "action": action }
    const options = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${this.things_url}/policies`,
      headers: {
        "Content-Type": this.content_type,
        Authorization: `Bearer ${token}`,
      },
      data: JSON.stringify(payload),
    };
    return axios.request(options)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response.data;
      })
  }

  Connects(thing_ids, channel_ids, actions, token) {
    
    const payload = { "subjects": thing_ids, "objects": channel_ids, "actions": actions }
    const options = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${this.things_url}/connect`,
      headers: {
        "Content-Type": this.content_type,
        Authorization: `Bearer ${token}`,
      },
      data: JSON.stringify(payload),
    };
    return axios.request(options)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response.data;
      })
  }

  Disconnect(thing_id, channel_id, token) {
    
    const payload = { "subjects": thing_id, "objects": channel_id }
    const options = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${this.things_url}/disconnect`,
      headers: {
        "Content-Type": this.content_type,
        Authorization: `Bearer ${token}`,
      },
      data: JSON.stringify(payload),
    };
    return axios.request(options)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response.data;
      })
  }

  Identify_thing(thing_key) {
    //Validates thing's key and returns it's ID if key is valid
    
    const options = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${this.things_url}/identify`,
      headers: {
        "Content-Type": this.content_type,
        Authorization: `Thing ${thing_key}`,
      },
    };
    return axios.request(options)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response.data;
      })
  }

  Authorise_thing(thing_id, channel_id, action, entity_type, token) {
    //Authorises thing
    
    const access_request = {
      "subject": thing_id,
      "object": channel_id,
      "action": action,
      "entity_type": entity_type
    }
    const options = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${this.things_url}/channels/object/access`,
      headers: {
        "Content-Type": this.content_type,
        Authorization: `Bearer ${token}`,
      },
      data: JSON.stringify(access_request),
    };
    return axios.request(options)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error.response.data;
      })
  }

}

// export default Things;
module.exports = Things;
