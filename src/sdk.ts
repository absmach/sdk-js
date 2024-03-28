import Users from './users'
import Domains from './domains'
import Things from './things'

const defaultUrl = 'http://localhost'

interface SDKConfig {
  usersUrl?: string
  domainsUrl?: string
  thingsUrl?: string
  hostUrl?: string
}

class SDK {
  users: Users
  domains: Domains
  things: Things

  constructor ({
    usersUrl = defaultUrl,
    domainsUrl = defaultUrl,
    thingsUrl = defaultUrl,
    hostUrl = defaultUrl
  }: SDKConfig = {}) {
    this.users = new Users({ usersUrl, thingsUrl, hostUrl })
    this.domains = new Domains(domainsUrl)
    this.things = new Things(thingsUrl)
  }
}

export default SDK
