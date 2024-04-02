import Errors from './errors'
import { type Response } from './defs'
export interface Invitation {
  invitedBy?: string
  userID?: string
  domainID?: string
  token?: string
  relation?: string
  metadata?: Record<string, any>
}

interface InvitationsPage {
  invitations: Invitation[]
  page: PageRes
}

interface PageRes {
  total: number
  offset: number
  limit: number
}

interface QueryParams {
  offset: number
  limit: number
}

export default class Invitations {
  // Invitations API client
  private readonly invitationsUrl: URL
  private readonly contentType: string
  private readonly invitationsEndpoint: string
  private readonly invitationError: Errors

  public constructor (invitationsUrl: string) {
    this.invitationsUrl = new URL(invitationsUrl)
    this.contentType = 'application/json'
    this.invitationsEndpoint = 'invitations'
    this.invitationError = new Errors()
  }

  public async SendInvitation (invitation: Invitation, token: string): Promise<Response> {
    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': this.contentType,
        Authorisation: `Bearer ${token}`
      },
      body: JSON.stringify(invitation)
    }

    try {
      const response = await fetch(
        new URL(this.invitationsEndpoint, this.invitationsUrl).toString(),
        options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.invitationError.HandleError(errorRes.error, response.status)
      }
      const inviteResponse: Response = { status: response.status, message: 'Invitation Sent Successfully' }
      return inviteResponse
    } catch (error) {
      throw error
    }
  }

  public async Invitation (invitation: Invitation, token: string): Promise<Invitation> {
    const options: RequestInit = {
      method: 'GET',
      headers: {
        'Content-Type': this.contentType,
        Authorisation: `Bearer ${token}`
      },
      body: JSON.stringify(invitation)
    }

    try {
      const response = await fetch(
        new URL(`${this.invitationsEndpoint}/${invitation.userID}/${invitation.domainID}`, this.invitationsUrl).toString(),
        options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.invitationError.HandleError(errorRes.error, response.status)
      }
      const invitationData = await response.json()
      return invitationData
    } catch (error) {
      throw error
    }
  }

  public async Invitations (queryParams: QueryParams, token: string): Promise<InvitationsPage> {
    const stringParams: Record<string, string> = Object.fromEntries(
      Object.entries(queryParams).map(([key, value]) => [key, String(value)])
    )

    const options: RequestInit = {
      method: 'GET',
      headers: {
        'Content-Type': this.contentType,
        Authorisation: `Bearer ${token}`
      }
    }

    try {
      const response = await fetch(
        new URL(
            `${this.invitationsEndpoint}?${new URLSearchParams(stringParams).toString()}`,
            this.invitationsUrl
        ).toString(),
        options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.invitationError.HandleError(errorRes.error, response.status)
      }
      const invitationData = await response.json()
      return invitationData
    } catch (error) {
      throw error
    }
  }

  public async AcceptInvitation (invitation: Invitation, token: string): Promise<Response> {
    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': this.contentType,
        Authorisation: `Bearer ${token}`
      },
      body: JSON.stringify({ DomainID: invitation.domainID })
    }

    try {
      const response = await fetch(
        new URL(`${this.invitationsEndpoint}/accept`, this.invitationsUrl).toString(),
        options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.invitationError.HandleError(errorRes.error, response.status)
      }
      const inviteResponse: Response = { status: response.status, message: 'Invitation Accepeted Successfully' }
      return inviteResponse
    } catch (error) {
      throw error
    }
  }

  public async DeleteInvitation (invitation: Invitation, token: string): Promise<Response> {
    const options: RequestInit = {
      method: 'DELETE',
      headers: {
        'Content-Type': this.contentType,
        Authorisation: `Bearer ${token}`
      },
      body: JSON.stringify(invitation)
    }

    try {
      const response = await fetch(
        new URL(`${this.invitationsEndpoint}/${invitation.userID}/${invitation.domainID}`, this.invitationsUrl).toString(),
        options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.invitationError.HandleError(errorRes.error, response.status)
      }
      const inviteResponse: Response = { status: response.status, message: 'Invitation Deleted Successfully' }
      return inviteResponse
    } catch (error) {
      throw error
    }
  }
}
