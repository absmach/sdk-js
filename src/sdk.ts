import Users from './users'
import Domains from './domains'
import Things from './things'
import Groups from './groups'
import type {
  User,
  UsersPage,
  Thing,
  ThingsPage,
  Group,
  GroupsPage,
  Channel,
  ChannelsPage,
  Domain,
  DomainsPage,
  Invitation,
  InvitationsPage,
  Login,
  QueryParams,
  Token,
  Response

} from './defs'

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
  groups: Groups

  constructor ({
    usersUrl = defaultUrl,
    domainsUrl = defaultUrl,
    thingsUrl = defaultUrl,
    hostUrl = defaultUrl
  }: SDKConfig = {}) {
    this.users = new Users({ usersUrl, thingsUrl, hostUrl })
    this.domains = new Domains({ domainsUrl, usersUrl })
    this.things = new Things(thingsUrl)
    this.groups = new Groups(usersUrl, thingsUrl)
  }
}

export default SDK
export type {
  User,
  UsersPage,
  Thing,
  ThingsPage,
  Group,
  GroupsPage,
  Channel,
  ChannelsPage,
  Login,
  QueryParams,
  Token,
  Response,
  Domain,
  DomainsPage,
  Invitation,
  InvitationsPage
}
