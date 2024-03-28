import Errors from './errors'

export interface Domain {
  name?: string
  id?: string
  alias?: string
  email?: string
}

interface QueryParams {
  offset: number
  limit: number
}

interface DomainsInterface {
  domains: Domain[]
  page: PageRes
}

interface PageRes {
  total: number
  offset: number
  limit: number
}

interface Permissions {
  permissions: string[]
}

export default class Domains {
  // Domains API client

  private readonly domainsUrl: URL
  private readonly contentType: string
  private readonly domainsEndpoint: string
  private readonly domainError: Errors

  public constructor (domainsUrl: string) {
    this.domainsUrl = new URL(domainsUrl)
    this.contentType = 'application/json'
    this.domainsEndpoint = 'domains'
    this.domainError = new Errors()
  }

  public async CreateDomain (domain: Domain, token: string): Promise<Domain> {
    // CreateDomain creates a new domain.
    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': this.contentType,
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(domain)
    }

    try {
      const response = await fetch(
        new URL(this.domainsEndpoint, this.domainsUrl).toString(),
        options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.domainError.HandleError(errorRes.error, response.status)
      }
      const domainData: Domain = await response.json()
      return domainData
    } catch (error) {
      console.error(error)
    }
  }

  public async UpdateDomain (domain: Domain, token: string): Promise<Domain> {
    // UpdateDomain updates an existing domain.
    const options: RequestInit = {
      method: 'PATCH',
      headers: {
        'Content-Type': this.contentType,
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(domain)
    }

    try {
      const response = await fetch(
        new URL(`${this.domainsEndpoint}/${domain.id}`, this.domainsUrl).toString(),
        options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.domainError.HandleError(errorRes.error, response.status)
      }
      const domainData: Domain = await response.json()
      return domainData
    } catch (error) {
      console.error(error)
    }
  }

  public async Domain (domainID: string, token: string): Promise<Domain> {
    // Domain retrieves domain with provided ID.
    const options: RequestInit = {
      method: 'GET',
      headers: {
        'Content-Type': this.contentType,
        Authorization: `Bearer ${token}`
      }
    }

    try {
      const response = await fetch(
        new URL(`${this.domainsEndpoint}/${domainID}`, this.domainsUrl).toString(),
        options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.domainError.HandleError(errorRes.error, response.status)
      }
      const domainData: Domain = await response.json()
      return domainData
    } catch (error) {
      console.error(error)
    }
  }

  public async DomainPermissions (domainID: string, token: string): Promise<Permissions> {
    // DomainPermissions retrieves domain permissions with provided ID.
    /**
         * @method DomainPermissions - retrieves domain permissions with provided ID.
         * @param {string} domainID - domain ID.
         * @param {string} token - user token.
         * @returns {object} - returns an object domain permissions eg:
         *  { permissions: [ 'admin', 'edit', 'view', 'membership' ] }
         * @example
         * const domainID = "domainID";
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
        new URL(`${this.domainsEndpoint}/${domainID}/permissions`, this.domainsUrl).toString(),
        options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.domainError.HandleError(errorRes.error, response.status)
      }
      const domainData: Permissions = await response.json()
      return domainData
    } catch (error) {
      console.error(error)
    }
  }

  public async Domains (queryParams: QueryParams, token: string): Promise<DomainsInterface> {
    // Domains retrieves all domains.

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
        new URL(`${this.domainsEndpoint}?${new URLSearchParams(stringParams).toString()}`, this.domainsUrl).toString(),
        options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.domainError.HandleError(errorRes.error, response.status)
      }
      const domainData = await response.json()
      return domainData
    } catch (error) {
      console.error(error)
    }
  }

  public async ListUserDomains (userID: string, queryParams: QueryParams, token: string): Promise<DomainsInterface> {
    // ListUserDomains retrieves all domains for a user.

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
        new URL(`/users/${userID}/domains?${new URLSearchParams(stringParams).toString()}`, this.domainsUrl).toString(),
        options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.domainError.HandleError(errorRes.error, response.status)
      }
      const domainData = await response.json()
      return domainData
    } catch (error) {
      console.error(error)
    }
  }

  public async EnableDomain (domainID: string, token: string): Promise<Domain> {
    // EnableDomain enables domain with provided ID.
    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': this.contentType,
        Authorization: `Bearer ${token}`
      }
    }

    try {
      const response = await fetch(
        new URL(`${this.domainsEndpoint}/${domainID}/enable`, this.domainsUrl).toString(),
        options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.domainError.HandleError(errorRes.error, response.status)
      }
      const domainData: Domain = await response.json()
      return domainData
    } catch (error) {
      console.error(error)
    }
  }

  public async DisableDomain (domainID: string, token: string): Promise<Domain> {
    // DisableDomain disables domain with provided ID.
    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': this.contentType,
        Authorization: `Bearer ${token}`
      }
    }

    try {
      const response = await fetch(
        new URL(`${this.domainsEndpoint}/${domainID}/disable`, this.domainsUrl).toString(),
        options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.domainError.HandleError(errorRes.error, response.status)
      }
      const domainData: Domain = await response.json()
      return domainData
    } catch (error) {
      console.error(error)
    }
  }

  public async AddUsertoDomain (domainID: string, userIDs: string[], relation: string, token: string): Promise<string> {
    // AddUsertoDomain adds user to domain.
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
        new URL(`${this.domainsEndpoint}/${domainID}/users/assign`, this.domainsUrl).toString(),
        options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.domainError.HandleError(errorRes.error, response.status)
      }
      return 'Policy created.'
    } catch (error) {
      console.error(error)
    }
  }

  public async RemoveUserfromDomain (domainID: string, userIDs: string[], relation: string, token: string): Promise<any> {
    // RemoveUserfromDomain removes user from domain.
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
        new URL(`${this.domainsEndpoint}/${domainID}/users/unassign`, this.domainsUrl).toString(),
        options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.domainError.HandleError(errorRes.error, response.status)
      }
      return 'Policy deleted.'
    } catch (error) {
      console.error(error)
    }
  }
}
