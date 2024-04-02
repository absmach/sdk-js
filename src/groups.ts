import Errors from './errors'

export interface Group {
  id?: string
  name?: string
  domainID?: string
  parentID?: string
  description?: string
  level?: number
  permissions?: string[]
  createdAt?: string
  updatedAt?: string
  status?: 'enabled' | 'disabled'
  metadata?: Record<string, string>
}

interface QueryParams {
  offset: number
  limit: number
}

interface GroupsPage {
  groups: Group[]
  page: PageRes
}

interface PageRes {
  total: number
  offset: number
  limit: number
  level: number
}

export default class Groups {
  // Groups API client

  private readonly groupsUrl: URL
  private readonly thingsUrl: URL
  private readonly contentType: string
  private readonly groupsEndpoint: string
  private readonly groupError: Errors

  public constructor (groupsUrl: string, thingsUrl: string) {
    this.groupsUrl = new URL(groupsUrl)
    this.thingsUrl = new URL(thingsUrl)
    this.contentType = 'application/json'
    this.groupsEndpoint = 'groups'
    this.groupError = new Errors()
  }

  public async CreateGroup (group: Group, token: string): Promise<Group> {
    // Creates a new group
    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': this.contentType,
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(group)
    }

    try {
      const response = await fetch(
        new URL(this.groupsEndpoint, this.groupsUrl).toString(),
        options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.groupError.HandleError(errorRes.error, response.status)
      }
      const groupData: Group = await response.json()
      return groupData
    } catch (error) {
      throw error
    }
  }

  public async Group (groupID: string, token: string): Promise<Group> {
    const options: RequestInit = {
      method: 'GET',
      headers: {
        'Content-Type': this.contentType,
        Authorization: `Bearer ${token}`
      }
    }

    try {
      const response = await fetch(
        new URL(`${this.groupsEndpoint}/${groupID}`, this.groupsUrl).toString(),
        options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.groupError.HandleError(errorRes.error, response.status)
      }
      const groupData: Group = await response.json()
      return groupData
    } catch (error) {
      throw error
    }
  }

  public async Groups (queryParams: QueryParams, token: string): Promise<GroupsPage> {
    const stringParams: Record<string, string> = Object.fromEntries(
      Object.entries(queryParams).map(([key, value]) => [key, String(value)])
    )

    const options: RequestInit = {
      method: 'GET',
      headers: {
        'Content-Type': this.contentType,
        Authorization: `Bearer ${token}`
      }
    }

    try {
      const response = await fetch(
        new URL(`${this.groupsEndpoint}?${new URLSearchParams(stringParams).toString()}`, this.groupsUrl).toString(),
        options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.groupError.HandleError(errorRes.error, response.status)
      }
      const groupsData: GroupsPage = await response.json()
      return groupsData
    } catch (error) {
      throw error
    }
  }

  public async GetGroups (queryParams: QueryParams, token: string): Promise<GroupsPage> {
    const stringParams: Record<string, string> = Object.fromEntries(
      Object.entries(queryParams).map(([key, value]) => [key, String(value)])
    )

    const options: RequestInit = {
      method: 'GET',
      headers: {
        'Content-Type': this.contentType,
        Authorization: `Bearer ${token}`
      }
    }

    try {
      const response = await fetch(
        new URL(`${this.groupsEndpoint}?${new URLSearchParams(stringParams).toString()}`, this.groupsUrl).toString(),
        options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.groupError.HandleError(errorRes.error, response.status)
      }
      const groupsData: GroupsPage = await response.json()
      return groupsData
    } catch (error) {
      throw error
    }
  }

  public async GroupPermissions (groupID: string, token: string): Promise<Group> {
    // Gets a group permissions by ID
    const options: RequestInit = {
      method: 'GET',
      headers: {
        'Content-Type': this.contentType,
        Authorization: `Bearer ${token}`
      }
    }

    try {
      const response = await fetch(
        new URL(`${this.groupsEndpoint}/${groupID}/permissions`, this.groupsUrl).toString(),
        options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.groupError.HandleError(errorRes.error, response.status)
      }
      const groupData: Group = await response.json()
      return groupData
    } catch (error) {
      throw error
    }
  }

  public async UpdateGroup (group: Group, token: string): Promise<Group> {
    const options: RequestInit = {
      method: 'PUT',
      headers: {
        'Content-Type': this.contentType,
        Authorization: `Bearer ${token}`
      }
    }

    try {
      const response = await fetch(
        new URL(`${this.groupsEndpoint}/${group.id}`, this.groupsUrl).toString(),
        options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.groupError.HandleError(errorRes.error, response.status)
      }
      const groupData: Group = await response.json()
      return groupData
    } catch (error) {
      throw error
    }
  }

  public async EnableGroup (groupID: string, token: string): Promise<Group> {
    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': this.contentType,
        Authorization: `Bearer ${token}`
      }
    }

    try {
      const response = await fetch(
        new URL(`${this.groupsEndpoint}/${groupID}/enable`, this.groupsUrl).toString(),
        options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.groupError.HandleError(errorRes.error, response.status)
      }
      const groupData: Group = await response.json()
      return groupData
    } catch (error) {
      throw error
    }
  }

  public async DisableGroup (groupID: string, token: string): Promise<Group> {
    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': this.contentType,
        Authorization: `Bearer ${token}`
      }
    }

    try {
      const response = await fetch(
        new URL(`${this.groupsEndpoint}/${groupID}/disable`, this.groupsUrl).toString(),
        options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.groupError.HandleError(errorRes.error, response.status)
      }
      const groupData: Group = await response.json()
      return groupData
    } catch (error) {
      throw error
    }
  }

  public async DeleteGroup (groupID: string, token: string): Promise<any> {
    const options: RequestInit = {
      method: 'DELETE',
      headers: {
        'Content-Type': this.contentType,
        Authorization: `Bearer ${token}`
      }
    }

    try {
      const response = await fetch(
        new URL(`${this.groupsEndpoint}/${groupID}`, this.groupsUrl).toString(),
        options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.groupError.HandleError(errorRes.error, response.status)
      }
      return 'Group deleted successfully.'
    } catch (error) {
      throw error
    }
  }

  public async AddUserToGroup (groupID: string, token: string): Promise<any> {
    // Adds a user to a group thus creating a membership
    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': this.contentType,
        Authorization: `Bearer ${token}`
      }
    }

    try {
      const response = await fetch(
        new URL(`${this.groupsEndpoint}/${groupID}/users/assign`, this.groupsUrl).toString(),
        options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.groupError.HandleError(errorRes.error, response.status)
      }
      return 'User added to group successfully.'
    } catch (error) {
      throw error
    }
  }

  public async RemoveUserFromGroup (groupID: string, token: string): Promise<any> {
    // Removes a user from a group thus deleting a membership
    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': this.contentType,
        Authorization: `Bearer ${token}`
      }
    }

    try {
      const response = await fetch(
        new URL(`${this.groupsEndpoint}/${groupID}/users/unassign`, this.groupsUrl).toString(),
        options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.groupError.HandleError(errorRes.error, response.status)
      }
      return 'User removed from group successfully.'
    } catch (error) {
      throw error
    }
  }

  public async ListGroupUsers (groupID: string, queryParams: QueryParams, token: string): Promise<Group> {
    const stringParams: Record<string, string> = Object.fromEntries(
      Object.entries(queryParams).map(([key, value]) => [key, String(value)])
    )
    const options: RequestInit = {
      method: 'GET',
      headers: {
        'Content-Type': this.contentType,
        Authorization: `Bearer ${token}`
      }
    }

    try {
      const response = await fetch(
        new URL(`${this.groupsEndpoint}/${groupID}/users?${new URLSearchParams(stringParams).toString()}`, this.groupsUrl).toString(),
        options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.groupError.HandleError(errorRes.error, response.status)
      }
      const groupData: Group = await response.json()
      return groupData
    } catch (error) {
      throw error
    }
  }

  public async ListGroupChannels (groupID: string, queryParams: QueryParams, token: string): Promise<Group> {
    const stringParams: Record<string, string> = Object.fromEntries(
      Object.entries(queryParams).map(([key, value]) => [key, String(value)])
    )
    const options: RequestInit = {
      method: 'GET',
      headers: {
        'Content-Type': this.contentType,
        Authorization: `Bearer ${token}`
      }
    }

    try {
      const response = await fetch(
        new URL(`${this.groupsEndpoint}/${groupID}/channels?${new URLSearchParams(stringParams).toString()}`, this.thingsUrl).toString(),
        options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.groupError.HandleError(errorRes.error, response.status)
      }
      const groupData: Group = await response.json()
      return groupData
    } catch (error) {
      throw error
    }
  }

  public async Parents (groupID: string, queryParams: QueryParams, token: string): Promise<GroupsPage> {
    const stringParams: Record<string, string> = Object.fromEntries(
      Object.entries(queryParams).map(([key, value]) => [key, String(value)])
    )
    const options: RequestInit = {
      method: 'GET',
      headers: {
        'Content-Type': this.contentType,
        Authorization: `Bearer ${token}`
      }
    }

    try {
      const response = await fetch(
        new URL(`${this.groupsEndpoint}/${groupID}/parents?${new URLSearchParams(stringParams).toString()}`, this.groupsUrl).toString(),
        options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.groupError.HandleError(errorRes.error, response.status)
      }
      const groupData: GroupsPage = await response.json()
      return groupData
    } catch (error) {
      throw error
    }
  }

  public async Children (groupID: string, queryParams: QueryParams, token: string): Promise<GroupsPage> {
    const stringParams: Record<string, string> = Object.fromEntries(
      Object.entries(queryParams).map(([key, value]) => [key, String(value)])
    )
    const options: RequestInit = {
      method: 'GET',
      headers: {
        'Content-Type': this.contentType,
        Authorization: `Bearer ${token}`
      }
    }

    try {
      const response = await fetch(
        new URL(`${this.groupsEndpoint}/${groupID}/children?${new URLSearchParams(stringParams).toString()}`, this.groupsUrl).toString(),
        options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.groupError.HandleError(errorRes.error, response.status)
      }
      const groupData: GroupsPage = await response.json()
      return groupData
    } catch (error) {
      throw error
    }
  }
}
