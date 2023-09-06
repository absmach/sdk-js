import  Things from "mainflux-sdk/mainflux/things.js";
import Users from "mainflux-sdk/mainflux/users.js";

class SDK {
  constructor(url) {
    this.things = new Things(url);
    this.users = new Users(url);
  }
}

export default SDK;