import fetch from "node-fetch";

class Channels {
    constructor(channels_url) {
        this.channels_url = channels_url;
        this.content_type = "application/json";
        this.channelsEndpoint = "channels";
    }

    Create(channel, token) {
        const url = `${this.channels_url}/${this.channelsEndpoint}`;
        console.log(url);
        const options = {
            method: "POST",
            headers: {
                "Content-Type": this.content_type,
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(channel),
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

    Create_bulk(channels, token) {
        const url = `${this.channels_url}/${this.channelsEndpoint}/bulk`;
        const options = {
            method: "POST",
            headers: {
                "Content-Type": this.content_type,
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(channels),
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

    Get(channel_id, token) {
        const url = `${this.channels_url}/${this.channelsEndpoint}/${channel_id}`;
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
        const url = `${this.channels_url}/${this.channelsEndpoint}`;
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

    Update(channel, token) {
        const url = `${this.channels_url}/${this.channelsEndpoint}/${channel["id"]}`;
        const options = {
            method: "PUT",
            headers: {
                "Content-Type": this.content_type,
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(channel),
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

    Disable(channel, token) {
        const url = `${this.channels_url}/${this.channelsEndpoint}/${channel["id"]}/disable`;
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



}

export default Channels;
