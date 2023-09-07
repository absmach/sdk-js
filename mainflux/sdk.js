import  Things from "./things.js";
import Users from "./users.js";

class SDK {
  constructor(url) {
    this.things = new Things(url);
    this.users = new Users(url);
  }
}

export default SDK;