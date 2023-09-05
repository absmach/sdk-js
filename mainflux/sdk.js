import  Things from "mainflux-sdk/mainflux/things.js";

class SDK {
  constructor(things_url) {
    this.things = new Things(things_url);
  }
}

export default SDK;