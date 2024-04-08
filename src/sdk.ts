import Users from './users'
import Domains from './domains'
<<<<<<< HEAD
<<<<<<< HEAD
import Things from './things'
import Invitations from './invitations'
import Groups from './groups'
import Channels from './channels'
=======
// import Things from './things'
=======
import Things from './things'
>>>>>>> 12444a0 (fix: fixing httpAdapter URL)
import Groups from './groups'
import Channels from './channels'
import Messages from './messages'
>>>>>>> e6c2159 (Updating messages files to typescript)

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
} from './defs'

const defaultUrl = 'http://localhost'

interface SDKConfig {
  usersUrl?: string
  domainsUrl?: string
  thingsUrl?: string
  hostUrl?: string
<<<<<<< HEAD
  invitationsUrl?: string
=======
  readersUrl?: string
  httpadapterUrl?: string
>>>>>>> e6c2159 (Updating messages files to typescript)
}

class SDK {
  users: Users
  domains: Domains
<<<<<<< HEAD
<<<<<<< HEAD
  things: Things
  invitations: Invitations
  groups: Groups
  channels: Channels
=======
  // things: Things
=======
  things: Things
>>>>>>> 12444a0 (fix: fixing httpAdapter URL)
  groups: Groups
  channels: Channels
  messages: Messages
>>>>>>> e6c2159 (Updating messages files to typescript)

  constructor ({
    usersUrl = defaultUrl,
    domainsUrl = defaultUrl,
    thingsUrl = defaultUrl,
    hostUrl = defaultUrl,
<<<<<<< HEAD
    invitationsUrl = defaultUrl
  }: SDKConfig = {}) {
    this.users = new Users({ usersUrl, thingsUrl, hostUrl })
    this.domains = new Domains({ domainsUrl, usersUrl })
    this.things = new Things({ thingsUrl, usersUrl })
    this.invitations = new Invitations(invitationsUrl)
    this.groups = new Groups({ usersUrl, thingsUrl })
    this.channels = new Channels({ thingsUrl, usersUrl })
=======
    readersUrl = defaultUrl,
    httpadapterUrl = defaultUrl
  }: SDKConfig = {}) {
    this.users = new Users({ usersUrl, thingsUrl, hostUrl })
    this.domains = new Domains({ domainsUrl, usersUrl })
    this.things = new Things({ thingsUrl, usersUrl })
    this.groups = new Groups({ usersUrl, thingsUrl })
    this.channels = new Channels({ thingsUrl, usersUrl })
    this.messages = new Messages({ readersUrl, httpadapterUrl })
>>>>>>> e6c2159 (Updating messages files to typescript)
  }
}

export default SDK
