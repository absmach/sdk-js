const Users = require("./users");

const defaultUrl = "http://localhost";

class SDK {
  constructor({
    usersUrl = defaultUrl,
    // thingsUrl = defaultUrl,
    // groupsUrl = defaultUrl,
    // channelsUrl = defaultUrl,
    // certsUrl = defaultUrl,
  } = {}) {
    this.users = new Users(usersUrl);
    // this.things = new Things(thingsUrl);
    // this.groups = new Groups(groupsUrl);
    // this.channels = new Channels(channelsUrl);
    // this.certs = new Certs(certsUrl);
  }
}

// module.exports = SDK;
// Export the SDK class for use in a web browser
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = SDK; // For Node.js
} else {
  window.SDK = SDK; // For browsers
}
