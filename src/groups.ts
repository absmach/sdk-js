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
  /**
   * @class Groups -
   * Groups API client is used for managing groups. It is used for
   * creating, updating, deleting, and retrieving groups.
   * @param {string} groupsUrl - The URL of the Groups service.
   * @param {string} thingsUrl- Things service URL.
   * @param {string} contentType - The content type of the request.
   * @param {string} groupsEndpoint - The endpoint of the Groups service.
   * @returns {Groups} - Returns a Groups object.
   */
  private readonly usersUrl: URL
  private readonly thingsUrl?: URL
  private readonly contentType: string
  private readonly groupsEndpoint: string
  private readonly groupError: Errors

  public constructor ({ usersUrl, thingsUrl }: { usersUrl: string, thingsUrl?: string }) {
    this.usersUrl = new URL(usersUrl)
    if (thingsUrl !== undefined) {
      this.thingsUrl = new URL(thingsUrl)
    } else {
      this.thingsUrl = new URL('')
    }
    this.contentType = 'application/json'
    this.groupsEndpoint = 'groups'
    this.groupError = new Errors()
  }

  public async CreateGroup (group: Group, token: string): Promise<Group> {
    // Creates a new group
    /**
     * @method Create - Creates a new group once the user is authenticated.
     * and a valid token is provided. The group's parent or child status in the
     * heirarchy can also be established.
     * @param {object} group - The group object to be created.
     * @param {string} token - The user's token.
     * @example
     * const group = {
     * "name": "groupName",
     * "description": "long group description",
     * "parent_id": "bb7edb32-2eac-4aad-aebe-ed96fe073879",
     * "metadata": {
     *   "domain": "example.com"
     * },
     * "status": "enabled",
     * "owner_id": "bb7edb32-2eac-4aad-aebe-ed96fe073879"
     * }
     */
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
      const group: Group = await response.json()
      return group
    } catch (error) {
      throw error
    }
  }

  public async Group (groupID: string, token: string): Promise<Group> {
    // Gets information about a group by ID
    /**
     * @method Get - Provide a group's information once given the group ID and a valid token.
     * @param {string} groupID - The group's ID.
     * @param {string} token - The user's access token.
     * @returns {object} - Returns a group object.
     * @example
     * const group_id = "bb7edb32-2eac-4aad-aebe-ed96fe073879"
     */
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
      const group: Group = await response.json()
      return group
    } catch (error) {
      throw error
    }
  }

  public async Groups (queryParams: QueryParams, token: string): Promise<GroupsPage> {
    // Get a list of enabled groups
    /**
     * @method Groups - Provides a list of all the groups in the database once given a valid token.
     * @param {string} token - The user's access token.
     * @param {Object} queryParams - Query parameters.
     * @returns {object} - Returns a list of all the groups in the database.
     * @example
     * const queryParams = {
     * "offset": 0,
     * "limit": 10
     * }
     */
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
    /**
     * @method GroupPermissions - Provides a group's permissions once given the group ID and a valid token.
     * @param {string} groupID - The group's ID.
     * @param {string} token - The user's access token.
     * @returns {object} - Returns a group's permissions in a string array.
     */
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
      const permission: Permissions = await response.json()
      return permission
    } catch (error) {
      throw error
    }
  }

  public async UpdateGroup (group: Group, token: string): Promise<Group> {
    // Updates a group's information such a name and metadata.
    /**
     * @method UpdateGroup - Updates a group's information such a name and metadata when given a
     * valid token and group ID.
     * @param {object} group - The group object to be updated.
     * @param {string} token - The user's access token.
     * @returns {object} - Returns the updated group object.
     * @example
     * const group = {
     * "id": "bb7edb32-2eac-4aad-aebe-ed96fe073879",
     * "name": "groupName"
     * }
     */
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
    // Enable a group.
    /**
     * @method EnableGroup - Enables a group when given a valid token and group ID.
     * @param {string} group_id - The group's ID.
     * @param {string} token - The user's access token.
     * @returns {object} - Returns a group object with the status reading 'Disabled'.
     */
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
      const group: Group = await response.json()
      return group
    } catch (error) {
      throw error
    }
  }

  public async DisableGroup (groupID: string, token: string): Promise<Group> {
    // Disable a group.
    /**
     * @method DisableGroup - Disables a group when given a valid token and group ID.
     * @param {string} group_id - The group's ID.
     * @param {string} token - The user's access token.
     * @returns {object} - Returns a group object with the status reading 'Disabled'.
     */
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
      const group: Group = await response.json()
      return group
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
    /**
     * @method AddUserToGroup -Assigns a user to a group when given a valid token, group ID,
     * user IDs, and relation. This allows the user to perform
     * some action on the group.
     * @param {string} groupId - The group's ID.
     * @param {Array} userIDs - The members IDs.
     * @param {String} relation - The member's role.
     * @param {string} token - The user's access token.
     * @returns {Object} - Returns a response object that has a status code and a message.
     */
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
    /**
     * @method RemoveUserToGroup - Unassigns a user from a group when given a valid token, group ID,
     * user IDs, and relation. This removes the user's ability to perform
     * some action on the group.
     * @param {string} groupId - The group's ID.
     * @param {Array} userIDs - The members IDs.
     * @param {String} relation - The member's role.
     * @param {string} token - The user's access token.
     * @returns {Object} - Returns a response object that has a status code and a message.
     */
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
    // Get a group's users.
    /**
     * @method ListGroupUsers - Provides a list of a groups' users when provided with
     * a valid token and group ID.
     * @param {string} groupID - The group's ID.
     * @param {string} token - The user's access token.
     * @param {object} queryParams - The query parameters such as offset and limit.
     * @returns {object} - Returns a list of a group's users.
     */
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
      const usersPage: UsersPage = await response.json()
      return usersPage
    } catch (error) {
      throw error
    }
  }

  public async ListGroupChannels (groupID: string, queryParams: QueryParams, token: string): Promise<ChannelsPage> {
    // Get a group's channels.
    /**
     * @method ListGroupChannels - Provides a list of a groups' channels when provided with
     * a valid token and group ID.
     * @param {string} groupID - The group's ID.
     * @param {string} token - The user's access token.
     * @param {object} queryParams - The query parameters such as offset and limit.
     * @returns {object} - Returns a list of a group's channels.
     */
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
      const channelsPage: ChannelsPage = await response.json()
      return channelsPage
    } catch (error) {
      throw error
    }
  }

  public async Parents (groupID: string, queryParams: QueryParams, token: string): Promise<GroupsPage> {
    // Get a group's parents.
    /**
     * @method Parents - Provides a list of a groups' parents when provided with
     * a valid token and group ID.
     * @param {string} groupID - The group's ID.
     * @param {string} token - The user's access token.
     * @param {object} queryParams - The query parameters such as offset and limit.
     * @returns {object} - Returns a list of a group's parents.
     */
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
      const groupsPage: GroupsPage = await response.json()
      return groupsPage
    } catch (error) {
      throw error
    }
  }

  public async Children (groupID: string, queryParams: QueryParams, token: string): Promise<GroupsPage> {
    // Get a group's children.
    /**
     * @method Children - Provides a list of a groups' children.
     * @param {string} groupId- The group's ID.
     * @param {string} token - The user's access token.
     * @param {object} queryParams - The query parameters such as offset and limit.
     * @returns {object} - Returns a list of a group's children.
     */
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
      const groupsPage: GroupsPage = await response.json()
      return groupsPage
    } catch (error) {
      throw error
    }
  }
}
