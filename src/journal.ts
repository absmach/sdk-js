import type { JournalsPage, JournalsPageMetadata } from './defs'
import Errors from './errors'

export default class Journal {
  // Journals API client
  /**
   * @class Journals -
   * Journals API is used for viewing journal logs.
   * @param {String} journalsUrl - URL to the Journals service.
   * @returns {Object} - Journals object.
   */
  private readonly journalsUrl: URL
  private readonly journalsEndpoint: string
  private readonly journalError: Errors
  private readonly contentType: string

  public constructor (journalsUrl: string) {
    this.journalsUrl = new URL(journalsUrl)
    this.contentType = 'application/json'
    this.journalsEndpoint = 'journal'
    this.journalError = new Errors()
  }

  public async Journal (entityType: string, entityId: string, queryParams: JournalsPageMetadata, token: string): Promise<JournalsPage> {
    // Gets all journals with pagination
    /**
     * Provides journals about an entity. Journals are retrieved based on the entity_type and
     * the entity_id.
     * Authorization is using the user_token
     *
     * @method Journal - Get entity journals with pagination.
     * @param {string} entityType - Entity type e.g thing.
     * @param {string} entityId - Id of the entity.
     * @param {object} queryParams - Query parameters.
     * @param {string} token - Access token.
     * @returns {object} - JournalsPage object.
    * @example
     * const queryParams = {
     * "offset": 0,
     * "limit": 10
     * }
     *
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
        new URL(
          `${this.journalsEndpoint}/${entityType}/${entityId}?${new URLSearchParams(stringParams).toString()}`,
          this.journalsUrl
        ).toString(),
        options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.journalError.HandleError(errorRes.message, response.status)
      }
      const journalsPage: JournalsPage = await response.json()
      return journalsPage
    } catch (error) {
      throw error
    }
  }
}
