import type { HealthInfo } from './defs'
import Errors from './errors'

export default class Health {
  private readonly usersUrl?: URL
  private readonly thingsUrl?: URL
  private readonly bootstrapUrl?: URL
  private readonly certsUrl?: URL
  private readonly readersUrl?: URL
  private readonly httpAdapterUrl?: URL
  private readonly journalUrl?: URL
  private readonly invitationsUrl?: URL
  private readonly healthEndpoint: string
  private readonly healthError: Errors

  public constructor ({
    usersUrl,
    thingsUrl,
    bootstrapUrl,
    certsUrl,
    readersUrl,
    httpAdapterUrl,
    journalUrl,
    invitationsUrl
  }: {
    usersUrl?: string
    thingsUrl?: string
    bootstrapUrl?: string
    certsUrl?: string
    readersUrl?: string
    httpAdapterUrl?: string
    journalUrl?: string
    invitationsUrl?: string
  }) {
    if (usersUrl !== undefined) {
      this.usersUrl = new URL(usersUrl)
    }
    if (thingsUrl !== undefined) {
      this.thingsUrl = new URL(thingsUrl)
    }
    if (bootstrapUrl !== undefined) {
      this.bootstrapUrl = new URL(bootstrapUrl)
    }
    if (certsUrl !== undefined) {
      this.certsUrl = new URL(certsUrl)
    }
    if (readersUrl !== undefined) {
      this.readersUrl = new URL(readersUrl)
    }
    if (httpAdapterUrl !== undefined) {
      this.httpAdapterUrl = new URL(httpAdapterUrl)
    }
    if (journalUrl !== undefined) {
      this.journalUrl = new URL(journalUrl)
    }
    if (invitationsUrl !== undefined) {
      this.invitationsUrl = new URL(invitationsUrl)
    }
    this.healthEndpoint = 'health'
    this.healthError = new Errors()
  }

  public async Health (service: string): Promise<HealthInfo> {
    let url: URL | undefined
    switch (service) {
      case 'things': {
        url = this.thingsUrl
        break
      }
      case 'users': {
        url = this.usersUrl
        break
      }
      case 'bootstrap': {
        url = this.bootstrapUrl
        break
      }
      case 'certs': {
        url = this.certsUrl
        break
      }
      case 'reader': {
        url = this.readersUrl
        break
      }
      case 'http-adapter': {
        url = this.httpAdapterUrl
        break
      }
      case 'journal': {
        url = this.journalUrl
        break
      }
      case 'invitations': {
        url = this.invitationsUrl
        break
      }
    }
    try {
      const response = await fetch(
        new URL(this.healthEndpoint, url).toString()
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.healthError.HandleError(errorRes.message, response.status)
      }
      const userData: HealthInfo = await response.json()
      return userData
    } catch (error) {
      throw error
    }
  }
}
