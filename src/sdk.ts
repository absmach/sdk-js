import Users from './users'
import Domains from './domains'
import Things from './things'
import Certs from './certs'
import Groups from './groups'
import Invitations from './invitations'
import Channels from './channels'
import Messages from './messages'
import Bootstrap from './bootstrap'
import Journal from './journal'

export type {
  User,
  UsersPage,
  ThingBasicInfo,
  Thing,
  ThingsPage,
  GroupBasicInfo,
  Group,
  GroupsPage,
  ChannelBasicInfo,
  Channel,
  ChannelsPage,
  Login,
  PageMetadata,
  Token,
  Response,
  Domain,
  DomainsPage,
  Cert,
  CertSerials,
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
  MessagesPageMetadata,
  BootstrapConfig,
  BootstrapPage,
  Journal,
  JournalsPage,
  JournalsPageMetadata
} from './defs'

const defaultUrl = 'http://localhost'

export interface SDKConfig {
  usersUrl?: string
  domainsUrl?: string
  thingsUrl?: string
  hostUrl?: string
  certsUrl?: string
  readersUrl?: string
  httpadapterUrl?: string
  invitationsUrl?: string
  bootstrapUrl?: string
  journalUrl?: string
}

class SDK {
  users: Users
  domains: Domains
  things: Things
  certs: Certs
  groups: Groups
  channels: Channels
  messages: Messages
  invitations: Invitations
  bootstrap: Bootstrap
  Journal: Journal
  constructor ({
    usersUrl = defaultUrl,
    domainsUrl = defaultUrl,
    thingsUrl = defaultUrl,
    hostUrl = defaultUrl,
    certsUrl = defaultUrl,
    readersUrl = defaultUrl,
    httpadapterUrl = defaultUrl,
    invitationsUrl = defaultUrl,
    bootstrapUrl = defaultUrl,
    journalUrl = defaultUrl
  }: SDKConfig = {}) {
    this.users = new Users({ usersUrl, thingsUrl, hostUrl })
    this.domains = new Domains({ domainsUrl, usersUrl })
    this.things = new Things({ thingsUrl, usersUrl })
    this.certs = new Certs(certsUrl)
    this.groups = new Groups({ usersUrl, thingsUrl })
    this.channels = new Channels({ thingsUrl, usersUrl })
    this.messages = new Messages({ readersUrl, httpadapterUrl })
    this.invitations = new Invitations(invitationsUrl)
    this.bootstrap = new Bootstrap(bootstrapUrl)
    this.Journal = new Journal(journalUrl)
  }
}

export default SDK
