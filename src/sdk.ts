import Users from "./users";
import Domains from "./domains";
import Things from "./things";
import Certs from "./certs";
import Groups from "./groups";
import Invitations from "./invitations";
import Channels from "./channels";
import Messages from "./messages";
import Bootstrap from "./bootstrap";
import Journal from "./journal";
import Health from "./health";

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
  BasicPageMeta,
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
  Credentials,
  ThingCredentials,
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
  JournalsPageMetadata,
  HealthInfo,
  Role,
  RolePage,
  EntityActionRole,
  EntityMemberRole,
  MembersPage,
} from "./defs";

const defaultUrl = "http://localhost";

export interface SDKConfig {
  usersUrl?: string;
  channelsUrl?: string;
  groupsUrl?: string;
  domainsUrl?: string;
  thingsUrl?: string;
  certsUrl?: string;
  readersUrl?: string;
  httpAdapterUrl?: string;
  invitationsUrl?: string;
  bootstrapUrl?: string;
  journalUrl?: string;
}

class SDK {
  users: Users;

  domains: Domains;

  things: Things;

  certs: Certs;

  groups: Groups;

  channels: Channels;

  messages: Messages;

  invitations: Invitations;

  bootstrap: Bootstrap;

  Journal: Journal;

  Health: Health;

  constructor({
    usersUrl = defaultUrl,
    channelsUrl = defaultUrl,
    groupsUrl = defaultUrl,
    domainsUrl = defaultUrl,
    thingsUrl = defaultUrl,
    certsUrl = defaultUrl,
    readersUrl = defaultUrl,
    httpAdapterUrl = defaultUrl,
    invitationsUrl = defaultUrl,
    bootstrapUrl = defaultUrl,
    journalUrl = defaultUrl,
  }: SDKConfig = {}) {
    this.users = new Users({ usersUrl, thingsUrl });
    this.domains = new Domains({ domainsUrl, usersUrl });
    this.things = new Things({ thingsUrl, usersUrl });
    this.certs = new Certs(certsUrl);
    this.groups = new Groups({ usersUrl, groupsUrl });
    this.channels = new Channels({ channelsUrl, usersUrl });
    this.messages = new Messages({ readersUrl, httpAdapterUrl });
    this.invitations = new Invitations(invitationsUrl);
    this.bootstrap = new Bootstrap(bootstrapUrl);
    this.Journal = new Journal(journalUrl);
    this.Health = new Health({
      usersUrl,
      thingsUrl,
      bootstrapUrl,
      certsUrl,
      readersUrl,
      httpAdapterUrl,
      journalUrl,
      invitationsUrl,
    });
  }
}

export default SDK;
