export interface User {
  id?: string
  name?: string
  credentials?: credentials
  role?: string
  status?: status
  tags?: string[]
  metadata?: Record<string, any>
  created_at?: Date
  updated_at?: Date
}

export interface UsersPage {
  users: User[]
  page: PageRes
}

<<<<<<< HEAD
interface credentials {
  identity: string
  secret?: string
}

export interface PageRes {
  total: number
  offset: number
  limit: number
}

=======
>>>>>>> f98ebdf (resolving comments)
export interface Thing {
  id?: string
  name?: string
<<<<<<< HEAD
  credentials?: credentials
=======
  id?: string
>>>>>>> f98ebdf (resolving comments)
  tags?: string[]
  domain_id?: string
  metadata?: Record<string, any>
<<<<<<< HEAD
  status?: status
  created_at?: Date
  updated_at?: Date
  permissions?: string[]
=======
  status?: string
  created_at?: string
  updated_at?: string
  updatedBy?: string
>>>>>>> f98ebdf (resolving comments)
}

export interface ThingsPage {
  things: Thing[]
  page: PageRes
}

export interface Group {
  id?: string
  domain_id?: string
  parent_id?: string
  name?: string
<<<<<<< HEAD
  description?: string
  metadata?: Record<string, any>
  level?: number
  path?: string
  children?: Group[]
  status?: status
  created_at?: Date
  updated_at?: Date
  permissions?: string[]
=======
  status?: 'enabled' | 'disabled'
  created_at?: string
  updated_at?: string
>>>>>>> 4e65430 (Fixing Cl failing issues)
}

export interface GroupsPage {
  groups: Group[]
  page: PageRes
}

export interface Channel {
  id?: string
  name?: string
<<<<<<< HEAD
<<<<<<< HEAD
  domain_id?: string
  description?: string
  metadata?: Record<string, any>
  level?: number
  path?: string
  status?: status
  created_at?: Date
  updated_at?: Date
  permissions?: string[]
=======
  parent_id?: string
=======
  domain_id?: string
>>>>>>> 4e65430 (Fixing Cl failing issues)
  credentials?: {
    identity?: string
  }
  status?: 'enabled' | 'disabled'
  created_at?: string
  updated_at?: string
  description?: string
<<<<<<< HEAD
>>>>>>> f98ebdf (resolving comments)
=======
  metadata?: Record<string, any>
  path?: string
  children?: Channel[]
  level?: number
>>>>>>> 4e65430 (Fixing Cl failing issues)
}

export interface ChannelsPage {
  channel: Channel[]
  page: PageRes
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

export interface Domain {
  id?: string
  name?: string
  alias?: string
  status?: status
  tags?: string[]
  metadata?: Record<string, any>
  permission?: string
  permissions?: string[]
  created_by?: string
  updated_by?: string
  created_at?: Date
  updated_at?: Date
}

export interface DomainsPage {
  domains: Domain[]
  page: PageRes
}

export interface Permissions {
  permissions: string[]
}

export interface Invitation {
  invited_by?: string
  user_id?: string
  domain_id?: string
  relation?: Relation
  token?: string
  created_at?: Date
  updated_at?: Date
  resend?: boolean
  confirmed_at?: Date
}

export interface InvitationsPage {
  invitations: Invitation[]
  page: PageRes
}

export interface Response {
  status: number
  message?: string
}

export type Relation = 'administrator' | 'editor' | 'viewer' | 'member'

type status = 'enabled' | 'disabled'

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
<<<<<<< HEAD
=======

export interface Domain {
  name?: string
  id?: string
  alias?: string
  metadata?: Record<string, any>
  tags?: string[]
  status?: 'enabled' | 'disabled'
  permission?: string
  permissions?: string[]
  created_by?: string
  updated_by?: string
  created_at?: Date
  updated_at?: Date
}

export interface DomainsPage {
  domains: Domain[]
  page: PageRes
}

export interface Permissions {
  permissions: string[]
}

export interface PageRes {
  total: number
  offset: number
  limit: number
}

export interface Relation {
  relation: 'administrator' | 'editor' | 'viewer' | 'member'
}
>>>>>>> f98ebdf (resolving comments)
