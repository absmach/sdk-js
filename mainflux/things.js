import fetch from "node-fetch";

class Things {
  constructor(things_url) {
    this.things_url = things_url;
    this.content_type = "application/json";
    this.thingsEndpoint = "things";
  }

  Create(thing, token) {
    const url = `${this.things_url}/${this.thingsEndpoint}`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": this.content_type,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(thing),
    };
    fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); // Parse the response JSON
      })
      .then((result) => {
        console.log('Response data:', result);
        // Handle the response data here
      })
      .catch((error) => {
        console.error('Fetch error:', error);
        // Handle errors here
      });
  }

  Create_bulk(things, token) {
    const url = `${this.things_url}/${this.thingsEndpoint}/bulk`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": this.content_type,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(things),
    };
    fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((result) => {
        console.log('Response data:', result);
      })
      .catch((error) => {
        console.error('Fetch error:', error);
      });
  }

  Get(thing_id, token) {
    const url = `${this.things_url}/${this.thingsEndpoint}/${thing_id}`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": this.content_type,
        Authorization: `Bearer ${token}`,
      },
    };
    fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((result) => {
        console.log('Response data:', result);
      })
      .catch((error) => {
        console.error('Fetch error:', error);
      });
  }

  Get_by_channel(thing_id, query_params, token) {
    //Retrieves list of channels connected to specified thing with pagination metadata.
    const url = `${this.things_url}/${this.thingsEndpoint}/${thing_id}/channels`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": this.content_type,
        Authorization: `Bearer ${token}`,
      },
      params: query_params,
    };
    fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((result) => {
        console.log('Response data:', result);
      })
      .catch((error) => {
        console.error('Fetch error:', error);
      });
  }

  Get_all(query_params, token) {
    const url = `${this.things_url}/${this.thingsEndpoint}`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": this.content_type,
        Authorization: `Bearer ${token}`,
      },
      params: query_params,
    };
    fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((result) => {
        console.log('Response data:', result);
      })
      .catch((error) => {
        console.error('Fetch error:', error);
      });
  }

  Disable(thing_id, token) {
    const url = `${this.things_url}/${this.thingsEndpoint}/${thing_id}/disable`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": this.content_type,
        Authorization: `Bearer ${token}`,
      },
    };
    fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((result) => {
        console.log('Response data:', result);
      })
      .catch((error) => {
        console.error('Fetch error:', error);
      });
  }

  Update(thing_id, thing, token) {
    const url = `${this.things_url}/${this.thingsEndpoint}/${thing_id}`;
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": this.content_type,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(thing),
    };
    fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((result) => {
        console.log('Response data:', result);
      })
      .catch((error) => {
        console.error('Fetch error:', error);
      });
  }

  Update_thing_secret(thing_id, thing, token) {
    const url = `${this.things_url}/${this.thingsEndpoint}/${thing_id}/secret`;
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": this.content_type,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(thing),
    };
    fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((result) => {
        console.log('Response data:', result);
      })
      .catch((error) => {
        console.error('Fetch error:', error);
      });
  }

  Update_thing_tags(thing_id, thing, token) {
    const url = `${this.things_url}/${this.thingsEndpoint}/${thing_id}/tags`;
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": this.content_type,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(thing),
    };
    fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((result) => {
        console.log('Response data:', result);
      })
      .catch((error) => {
        console.error('Fetch error:', error);
      });
  }

  Update_thing_owner(thing_id, thing, token) {
    const url = `${this.things_url}/${this.thingsEndpoint}/${thing_id}/owner`;
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": this.content_type,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(thing),
    };
    fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((result) => {
        console.log('Response data:', result);
      })
      .catch((error) => {
        console.error('Fetch error:', error);
      });
  }

  Connect(thing_id, channel_id, action, token) {
    const url = `${this.things_url}/policies`;
    const payload = { "subject": thing_id, "object": channel_id, "action": action }
    const options = {
      method: "POST",
      headers: {
        "Content-Type": this.content_type,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    };
    fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((result) => {
        console.log('Response data:', result);
      })
      .catch((error) => {
        console.error('Fetch error:', error);
      });
  }

  Connects(thing_ids, channel_ids, actions, token) {
    const url = `${this.things_url}/connect`;
    const payload = { "subjects": thing_ids, "objects": channel_ids, "actions": actions }
    const options = {
      method: "POST",
      headers: {
        "Content-Type": this.content_type,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    };
    fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((result) => {
        console.log('Response data:', result);
      })
      .catch((error) => {
        console.error('Fetch error:', error);
      });
  }

  Disconnect(thing_id, channel_id, token) {
    const url = `${this.things_url}/disconnect`;
    const payload = { "subjects": thing_id, "objects": channel_id }
    const options = {
      method: "POST",
      headers: {
        "Content-Type": this.content_type,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    };
    fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((result) => {
        console.log('Response data:', result);
      })
      .catch((error) => {
        console.error('Fetch error:', error);
      });
  }

  Identify_thing(thing_key) {
    //Validates thing's key and returns it's ID if key is valid
    const url = `${this.things_url}/identify`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": this.content_type,
        Authorization: `Bearer ${thing_key}`,
      },
    };
    fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((result) => {
        console.log('Response data:', result);
      })
      .catch((error) => {
        console.error('Fetch error:', error);
      });
  }

  Authorise_thing(thing_id, channel_id, action, entity_type, token) {
    //Authorises thing
    const url = `${this.things_url}/channels/object/access`;
    const access_request = {
      "subject": thing_id,
      "object": channel_id,
      "action": action,
      "entity_type": entity_type
    }
    const options = {
      method: "POST",
      headers: {
        "Content-Type": this.content_type,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(access_request),
    };
    fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((result) => {
        console.log('Response data:', result);
      })
      .catch((error) => {
        console.error('Fetch error:', error);
      });
  }

}

export default Things;
