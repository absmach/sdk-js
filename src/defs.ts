export interface UserBasicInfo {
  id?: string
  name?: string
  credentials?: credentials
  status?: Status
}

export interface User extends UserBasicInfo {
  role?: string
  tags?: string[]
  metadata?: Record<string, any>
  created_at?: Date
  updated_at?: Date
  updated_by?: string | UserBasicInfo
}

export interface UsersPage {
  users: User[]
  total: number
  offset: number
  limit: number
}

export interface credentials {
  identity?: string
  secret?: string
}

export interface Thing {
  id?: string
  name?: string
  credentials?: credentials
  tags?: string[]
  domain_id?: string | DomainBasicInfo
  metadata?: Record<string, any>
  status?: Status
  created_at?: Date
  updated_at?: Date
  updated_by?: string | UserBasicInfo
  permissions?: string[]
}

export interface ThingsPage {
  things: Thing[]
  total: number
  offset: number
  limit: number
}

export interface Group {
  id?: string
  domain_id?: string
  parent_id?: string
  name?: string
  description?: string
  metadata?: Record<string, any>
  level?: number
  path?: string
  children?: Group[]
  status?: Status
  created_at?: Date
  updated_at?: Date
  updated_by?: string | UserBasicInfo
  permissions?: string[]
}

export interface GroupsPage {
  groups: Group[]
  total: number
  offset: number
  limit: number
}

export interface Channel {
  id?: string
  name?: string
  domain_id?: string
  description?: string
  metadata?: Record<string, any>
  level?: number
  path?: string
  status?: Status
  created_at?: Date
  updated_at?: Date
  updated_by?: string
  permissions?: string[]
}

export interface ChannelsPage {
  channels: Channel[]
  total: number
  offset: number
  limit: number
}

export interface Login {
  identity?: string
  secret?: string
  domain_id?: string
}

export interface Token {
  access_token: string
  refresh_token: string
  access_type?: string
}

export interface DomainBasicInfo {
  id?: string
  name?: string
  alias?: string
  status?: Status
}

export interface Domain extends DomainBasicInfo {
  tags?: string[]
  metadata?: Record<string, any>
  permission?: string
  permissions?: string[]
  created_by?: string | UserBasicInfo
  updated_by?: string | UserBasicInfo
  created_at?: Date
  updated_at?: Date
}

export interface DomainsPage {
  domains: Domain[]
  total: number
  offset: number
  limit: number
}

export interface Permissions {
  permissions: string[]
}

export interface Invitation {
  invited_by?: string | UserBasicInfo
  user_id?: string | UserBasicInfo
  domain_id?: string | DomainBasicInfo
  relation?: Relation
  token?: string
  created_at?: Date
  updated_at?: Date
  resend?: boolean
  confirmed_at?: Date
}

export interface InvitationsPage {
  invitations: Invitation[]
  total: number
  offset: number
  limit: number
}

export interface Response {
  status: number
  message?: string
}

export type Relation = 'administrator' | 'editor' | 'viewer' | 'member'

export type GroupRelation = 'administrator' | 'editor' | 'viewer'

export type Status = 'enabled' | 'disabled'

export interface QueryParams {
  total?: number
  offset?: number
  limit?: number
  order?: string
  direction?: string
  level?: number
  identity?: string
  name?: string
  type?: string
  metadata?: Record<string, any>
  status?: string
  action?: string
  subject?: string
  object?: string
  permission?: string
  tag?: string
  owner?: string
  shared_by?: string
  visibility?: string
  owner_id?: string
  topic?: string
  contact?: string
  state?: string
  list_perms?: boolean
  invited_by?: string
  user_id?: string
  domain_id?: string
  relation?: string
}

export interface MessagesPage {
  messages: SenMLMessage[]
  total: number
  offset: number
  limit: number
}

export interface SenMLMessage {
  channel?: string
  subtopic?: string
  publisher?: string
  protocol?: string
  name?: string
  unit?: string
  time?: number
  update_time?: number
  value?: number | null
  string_value?: string | null
  data_value?: string | null
  bool_value?: boolean | null
  sum?: number | null
}
