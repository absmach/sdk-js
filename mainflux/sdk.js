import  Things from "./things.js";
import Users from "./users.js";
import Groups from "./groups.js";
import Channels from "./channels.js";

const defaultUrl = "http://localhost";

class SDK {
  constructor({
    usersUrl = defaultUrl,
    thingsUrl = defaultUrl,
    groupsUrl = defaultUrl,
    channelsUrl = defaultUrl,
  } = {}) {
    this.users = new Users(usersUrl);
    this.things = new Things(thingsUrl);
    this.groups = new Groups(groupsUrl);
    this.channels = new Channels(channelsUrl);
  }
}

export default SDK;
