import fetch from "node-fetch";

class Channels {
    constructor(channels_url) {
        this.channels_url = channels_url;
        this.content_type = "application/json";
        this.channelsEndpoint = "channels";
    }
}

export default Channels;
