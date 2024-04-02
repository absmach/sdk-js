export interface User {
  name?: string
  id?: string
  credentials?: {
    identity: string
    secret?: string
  }
  owner?: string
  tags?: [string, string]
  role?: string
  status?: 'enabled' | 'disabled'
  metadata?: Record<string, any>
  updatedBy?: string
}

export interface UsersPage {
  users: User[]
  page: PageRes
}

export interface PageRes {
  total: number
  offset: number
  limit: number
}

export interface Thing {
  name?: string
  tags?: string[]
  credentials?: {
    identity?: string
    secret?: string
  }
  owner?: string
  metadata?: Record<string, any>
  status?: string
}

export interface ThingsPage {
  things: Thing[]
  page: PageRes
}

export interface Group {
  id?: string
  name?: string
  status?: 'enabled' | 'disabled'
  createdAt?: string
  updatedAt?: string
}

export interface GroupsPage {
  groups: Group[]
  page: PageRes
}

export interface Channel {
  id?: string
  name?: string
  status?: 'enabled' | 'disabled'
  createdAt?: string
  updatedAt?: string
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
  refreshToken: string
}

export interface Status {
  status: string
}

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
  list_perms?: string
  invited_by?: string
  user_id?: string
  domain_id?: string
  relation?: string
}
