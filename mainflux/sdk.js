import  Things from "./things.js";
import Users from "./users.js";
import Groups from "./groups.js";
import Channels from "./channels.js";

class SDK {
  constructor(url) {
    this.things = new Things(url);
    this.users = new Users(url);
    this.groups = new Groups(url);
    this.channels = new Channels(url);
  }
}

export default SDK;
