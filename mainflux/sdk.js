import  Things from "./things.js";
import Users from "./users.js";
import Groups from "./groups.js";
import Channels from "./channels.js";
import Certs from "./certs.js";

const defaultUrl = "http://localhost";

class SDK {
  constructor({
    usersUrl = defaultUrl,
    thingsUrl = defaultUrl,
    groupsUrl = defaultUrl,
    channelsUrl = defaultUrl,
    certsUrl = defaultUrl,
  } = {}) {
    this.users = new Users(usersUrl);
    this.things = new Things(thingsUrl);
    this.groups = new Groups(groupsUrl);
    this.channels = new Channels(channelsUrl);
    this.certs = new Certs(certsUrl);
  }
}

export default SDK;
