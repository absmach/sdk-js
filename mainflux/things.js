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
}

export default Things;