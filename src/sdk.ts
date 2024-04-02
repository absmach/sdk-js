import Users from './users'
import Things from './things'

const defaultUrl = 'http://localhost'

interface SDKConfig {
  usersUrl?: string
  thingsUrl?: string
}

class SDK {
  users: Users
  things: Things

  constructor ({
    usersUrl = defaultUrl,
    thingsUrl = defaultUrl
  }: SDKConfig = {}) {
    this.users = new Users(usersUrl, thingsUrl)
    this.things = new Things(thingsUrl)
  }
}

export default SDK
