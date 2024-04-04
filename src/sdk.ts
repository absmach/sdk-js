import Users from './users'
import Things from './things'

const defaultUrl = 'http://localhost'

interface SDKConfig {
  usersUrl?: string
  thingsUrl?: string
  hostUrl?: string
}

class SDK {
  users: Users
  things: Things

  constructor ({
    usersUrl = defaultUrl,
    thingsUrl = defaultUrl,
    hostUrl = defaultUrl
  }: SDKConfig = {}) {
    this.users = new Users({ usersUrl, thingsUrl, hostUrl })
    this.things = new Things(thingsUrl)
  }
}

export default SDK
