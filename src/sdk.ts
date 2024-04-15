import Users from './users'
import Domains from './domains'
import Things from './things'
import Groups from './groups'
import Invitations from './invitations'
import Channels from './channels'
import Messages from './messages'

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
  PageMetadata,
  Token,
  Response,
  Domain,
  DomainsPage,
  Invitation,
  InvitationsPage,
  Relation,
  GroupRelation,
  credentials,
  UserBasicInfo,
  DomainBasicInfo,
  Permissions,
  Status,
  MessagesPage,
  SenMLMessage,
  MessagesPageMetadata
} from './defs'

const defaultUrl = 'http://localhost'

export interface SDKConfig {
  usersUrl?: string
  domainsUrl?: string
  thingsUrl?: string
  hostUrl?: string
  readersUrl?: string
  httpadapterUrl?: string
  invitationsUrl?: string
}

class SDK {
  users: Users
  domains: Domains
  things: Things
  groups: Groups
  channels: Channels
  messages: Messages
  invitations: Invitations
  constructor ({
    usersUrl = defaultUrl,
    domainsUrl = defaultUrl,
    thingsUrl = defaultUrl,
    hostUrl = defaultUrl,
    readersUrl = defaultUrl,
    httpadapterUrl = defaultUrl,
    invitationsUrl = defaultUrl
  }: SDKConfig = {}) {
    this.users = new Users({ usersUrl, thingsUrl, hostUrl })
    this.domains = new Domains({ domainsUrl, usersUrl })
    this.things = new Things({ thingsUrl, usersUrl })
    this.groups = new Groups({ usersUrl, thingsUrl })
    this.channels = new Channels({ thingsUrl, usersUrl })
    this.messages = new Messages({ readersUrl, httpadapterUrl })
    this.invitations = new Invitations(invitationsUrl)
  }
}

export default SDK
