export interface UserBasicInfo {
  id?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  credentials?: UserCredentials;
  status?: Status;
  profile_picture?: string;
}

export interface User extends UserBasicInfo {
  role?: string;
  permissions?: string[];
  tags?: string[];
  metadata?: Record<string, any>;
  created_at?: Date;
  updated_at?: Date;
  updated_by?: string | UserBasicInfo;
}

export interface UsersPage {
  users: User[];
  total: number;
  offset: number;
  limit: number;
}

export interface UserCredentials {
  username?: string;
  secret?: string;
}

export interface ClientCredentials {
  identity?: string;
  secret?: string;
}

export interface ClientBasicInfo {
  id?: string;
  name?: string;
  credentials?: ClientCredentials;
  status?: Status;
}

export interface Client extends ClientBasicInfo {
  tags?: string[];
  domain_id?: string | DomainBasicInfo;
  parent_group_id?: string;
  metadata?: Record<string, any>;
  created_at?: Date;
  updated_at?: Date;
  updated_by?: string | UserBasicInfo;
  permissions?: string[];
  identity?: string;
}

export interface ClientsPage {
  clients: Client[];
  total: number;
  offset: number;
  limit: number;
}

export interface GroupBasicInfo {
  id?: string;
  name?: string;
  status?: Status;
  description?: string;
}

export interface Group extends GroupBasicInfo {
  domain_id?: string | DomainBasicInfo;
  parent_id?: string | GroupBasicInfo;
  name?: string;
  metadata?: Record<string, any>;
  level?: number;
  path?: string;
  children?: Group[];
  created_at?: Date;
  updated_at?: Date;
  updated_by?: string | UserBasicInfo;
  permissions?: string[];
}

export interface GroupsPage {
  groups: Group[];
  total: number;
  offset: number;
  limit: number;
}

export interface ChannelBasicInfo {
  id?: string;
  name?: string;
  status?: Status;
}

export interface Channel extends ChannelBasicInfo {
  domain_id?: string | DomainBasicInfo;
  metadata?: Record<string, any>;
  tags?: string[];
  parent_group_id?: string;
  created_at?: Date;
  updated_at?: Date;
  updated_by?: string;
  permissions?: string[];
}

export interface ChannelsPage {
  channels: Channel[];
  total: number;
  offset: number;
  limit: number;
}

export interface Login {
  identity?: string;
  secret?: string;
}

export interface Token {
  access_token: string;
  refresh_token: string;
  access_type?: string;
}

export interface DomainBasicInfo {
  id?: string;
  name?: string;
  alias?: string;
  status?: Status;
}

export interface Domain extends DomainBasicInfo {
  tags?: string[];
  metadata?: Record<string, any>;
  permission?: string;
  permissions?: string[];
  created_by?: string | UserBasicInfo;
  updated_by?: string | UserBasicInfo;
  created_at?: Date;
  updated_at?: Date;
}

export interface DomainsPage {
  domains: Domain[];
  total: number;
  offset: number;
  limit: number;
}

export interface Permissions {
  permissions: string[];
}

export interface Invitation {
  invited_by?: string | UserBasicInfo;
  user_id?: string | UserBasicInfo;
  domain_id?: string | DomainBasicInfo;
  relation?: Relation;
  token?: string;
  created_at?: Date;
  updated_at?: Date;
  resend?: boolean;
  confirmed_at?: Date;
}

export interface InvitationsPage {
  invitations: Invitation[];
  total: number;
  offset: number;
  limit: number;
}

export interface Response {
  status: number;
  message?: string;
}

export type Relation =
  | "administrator"
  | "editor"
  | "contributor"
  | "member"
  | "guest";

export type GroupRelation =
  | "administrator"
  | "editor"
  | "contributor"
  | "guest";

export type Status = "enabled" | "disabled";

export interface BasicPageMeta {
  total?: number;
  offset?: number;
  limit?: number;
}
export interface PageMetadata extends BasicPageMeta {
  total?: number;
  offset?: number;
  limit?: number;
  order?: string;
  direction?: string;
  level?: number;
  email?: string;
  username?: string;
  first_name?: string;
  last_name?: string;
  name?: string;
  type?: string;
  metadata?: Record<string, any>;
  status?: string;
  action?: string;
  subject?: string;
  object?: string;
  permission?: string;
  tag?: string;
  id?: string;
  tree?: boolean;
  owner?: string;
  shared_by?: string;
  visibility?: string;
  owner_id?: string;
  topic?: string;
  contact?: string;
  state?: string;
  list_perms?: boolean;
  invited_by?: string;
  domain_id?: string;
  user_id?: string;
  relation?: string;
  from?: number;
  to?: number;
}

export interface MessagesPage {
  messages: SenMLMessage[];
  total: number;
  offset: number;
  limit: number;
}

export interface MessagesPageMetadata extends PageMetadata {
  subtopic?: string;
  publisher?: string | ClientBasicInfo;
  protocol?: string;
  comparator?: string;
  vb?: boolean;
  vs?: string;
  vd?: string;
  aggregation?: string;
  interval?: string;
  value?: number;
}

export interface SenMLMessage {
  channel?: string | ChannelBasicInfo;
  subtopic?: string;
  publisher?: string | ClientBasicInfo;
  protocol?: string;
  name?: string;
  unit?: string;
  time?: number;
  update_time?: number;
  value?: number | null;
  string_value?: string | null;
  data_value?: string | null;
  bool_value?: boolean | null;
  sum?: number | null;
}

export interface Cert {
  client_id?: string;
  cert_serial?: string;
  client_key?: string;
  client_cert?: string;
  expiration?: string;
}

export interface CertSerials {
  certs: Cert[];
  total: number;
  offset: number;
  limit: number;
}

export interface BootstrapConfig {
  channels?: string[];
  external_id?: string;
  external_key?: string;
  client_id?: string;
  client_secret?: string;
  name?: string;
  client_cert?: string;
  client_key?: string;
  ca_cert?: string;
  content?: string;
  state?: number;
  encryptedBootstrap?: string;
  decrypted_key?: string;
  encrypted_buffer?: string;
  decrypted?: string;
}

export interface BootstrapPage {
  configs: BootstrapConfig[];
  total: number;
  offset: number;
  limit: number;
}

export interface JournalsPageMetadata extends PageMetadata {
  operation?: string;
  with_metadata?: boolean;
  with_attributes?: boolean;
  id?: string;
}

export interface Journal {
  id?: string;
  operation?: string;
  occurred_at?: string;
  payload?: Record<string, any>;
}

export interface JournalsPage {
  journals: Journal[];
  total: number;
  offset: number;
  limit: number;
}

export interface HealthInfo {
  status: string;
  version: string;
  commit: string;
  description: string;
  build_time: string;
  instance_id: string;
}

export interface Role {
  id?: string;
  name?: string;
  entity_id?: string;
  created_by?: string;
  created_at?: Date;
  updated_at?: Date;
  updated_by?: string;
}

export interface RolePage {
  roles: Role[];
  total: number;
  offset: number;
  limit: number;
}

export interface EntityActionRole {
  entity_id?: string;
  action?: string;
  role_id?: string;
}

export interface EntityMemberRole {
  entity_id?: string;
  member_id?: string;
  role_id?: string;
}

export interface MembersPage {
  members: string[];
  total: number;
  offset: number;
  limit: number;
}
