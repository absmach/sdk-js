import Errors from './errors'
import {
  type Group,
  type GroupsPage,
  type QueryParams,
  type ChannelsPage,
  type Permissions,
  type Response,
  type UsersPage
} from './defs'

export default class Groups {
  // Groups API client

  private readonly usersUrl: URL
  private readonly thingsUrl: URL
  private readonly contentType: string
  private readonly groupsEndpoint: string
  private readonly groupError: Errors

  public constructor (usersUrl: string, thingsUrl: string) {
    this.usersUrl = new URL(usersUrl)
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
        new URL(this.groupsEndpoint, this.usersUrl).toString(),
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
        new URL(`${this.groupsEndpoint}/${groupID}`, this.usersUrl).toString(),
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
        new URL(`${this.groupsEndpoint}?${new URLSearchParams(stringParams).toString()}`, this.usersUrl).toString(),
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
        new URL(`${this.groupsEndpoint}?${new URLSearchParams(stringParams).toString()}`, this.usersUrl).toString(),
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

  public async GroupPermissions (groupID: string, token: string): Promise<Permissions> {
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
        new URL(`${this.groupsEndpoint}/${groupID}/permissions`, this.usersUrl).toString(),
        options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.groupError.HandleError(errorRes.error, response.status)
      }
      const groupData: Permissions = await response.json()
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
      },
      body: JSON.stringify(group)
    }

    try {
      const response = await fetch(
        new URL(`${this.groupsEndpoint}/${group.id}`, this.usersUrl).toString(),
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
        new URL(`${this.groupsEndpoint}/${groupID}/enable`, this.usersUrl).toString(),
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
        new URL(`${this.groupsEndpoint}/${groupID}/disable`, this.usersUrl).toString(),
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

  public async DeleteGroup (groupID: string, token: string): Promise<Response> {
    const options: RequestInit = {
      method: 'DELETE',
      headers: {
        'Content-Type': this.contentType,
        Authorization: `Bearer ${token}`
      }
    }

    try {
      const response = await fetch(
        new URL(`${this.groupsEndpoint}/${groupID}`, this.usersUrl).toString(),
        options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.groupError.HandleError(errorRes.error, response.status)
      }
      const deleteResponse: Response = { status: response.status, message: 'Group Deleted Successfully' }
      return deleteResponse
    } catch (error) {
      throw error
    }
  }

  public async AddUserToGroup (groupID: string, userIDs: string[], relation: string, token: string): Promise<Response> {
    // Adds a user to a group thus creating a membership
    const req = { user_ids: userIDs, relation }
    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': this.contentType,
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(req)
    }

    try {
      const response = await fetch(
        new URL(`${this.groupsEndpoint}/${groupID}/users/assign`, this.usersUrl).toString(),
        options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.groupError.HandleError(errorRes.error, response.status)
      }
      const addResponse: Response = { status: response.status, message: 'User Added Successfully' }
      return addResponse
    } catch (error) {
      throw error
    }
  }

  public async RemoveUserFromGroup (groupID: string, userIDs: string[], relation: string, token: string): Promise<Response> {
    // Removes a user from a group thus deleting a membership
    const req = { user_ids: userIDs, relation }
    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': this.contentType,
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(req)
    }

    try {
      const response = await fetch(
        new URL(`${this.groupsEndpoint}/${groupID}/users/unassign`, this.usersUrl).toString(),
        options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.groupError.HandleError(errorRes.error, response.status)
      }
      const removeResponse: Response = { status: response.status, message: 'User Removed Successfully' }
      return removeResponse
    } catch (error) {
      throw error
    }
  }

  public async ListGroupUsers (groupID: string, queryParams: QueryParams, token: string): Promise<UsersPage> {
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
        new URL(`${this.groupsEndpoint}/${groupID}/users?${new URLSearchParams(stringParams).toString()}`, this.usersUrl).toString(),
        options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.groupError.HandleError(errorRes.error, response.status)
      }
      const usersData: UsersPage = await response.json()
      return usersData
    } catch (error) {
      throw error
    }
  }

  public async ListGroupChannels (groupID: string, queryParams: QueryParams, token: string): Promise<ChannelsPage> {
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
      const channelsData: ChannelsPage = await response.json()
      return channelsData
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
        new URL(`${this.groupsEndpoint}/${groupID}/parents?${new URLSearchParams(stringParams).toString()}`, this.usersUrl).toString(),
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
        new URL(`${this.groupsEndpoint}/${groupID}/children?${new URLSearchParams(stringParams).toString()}`, this.usersUrl).toString(),
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
