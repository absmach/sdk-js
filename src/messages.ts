import Errors from './errors'

import {
  type Response,
  type MessagesPage,
  type QueryParams
} from './defs'

export default class Messages {
  // Messages API Client
  /**
   * @method Messages - Messages is used for sending and reading messages.
   * It provides methods for sending and reading messages.
   * @param {string} readersUrl - The url of the readers service.
   * @param {string} httpadapterUrl - The URL of the Magistrala Messages adapter.
   * @param {string} contentType - The content type of the request.
   * @returns {Messages} - Returns a Messages object.
   */

  private readonly readersUrl: URL
  private readonly httpadapterUrl: URL
  private readonly messageError: Errors
  private readonly contentType: string

  public constructor ({ readersUrl, httpadapterUrl }: { readersUrl: string, httpadapterUrl: string }) {
    this.readersUrl = new URL(readersUrl)
    this.httpadapterUrl = new URL(httpadapterUrl)
    this.contentType = 'application/json'
    this.messageError = new Errors()
  }

  public async Send (
    channelId: string,
    msg: string,
    thingKey: string
  ): Promise<Response> {
    // Send a message
    /**
     * @method Send- Sends message to a given Channel via HTTP adapter. Message is sent
     * through a writer add-on such as Timescale. Message is sent to the
     * HTTP adapter. The Thing and Channel must exist and the Thing connected to the Channel.
     * @param {string} channel_id - The ID of the Channel to send the message to.
     * @param {string} msg -message to send to the Channel that should be in encoded into
     *       bytes format for example:
     *       [{"bn":"demo", "bu":"V", "n":"voltage", "u":"V", "v":5}]
     * @param {string} thing_key - The secret of the Thing sending the message.
     */

    const chanNameParts = channelId.split('.', 2)
    const chanId = chanNameParts[0]
    let subtopic = ''

    if (chanNameParts.length === 2) {
      subtopic = chanNameParts[1].replace('.', '/')
    }

    const options: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': this.contentType,
        Authorization: `Thing ${thingKey}`
      },
      body: msg
    }
    try {
      const response = await fetch(
        new URL(
          `channels/${chanId}/messages${subtopic}`,
          this.httpadapterUrl
        ).toString(),
        options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.messageError.HandleError(errorRes.error, response.status)
      }
      const sendResponse: Response = { status: response.status, message: 'Message sent' }
      return sendResponse
    } catch (error) {
      throw error
    }
  }

  public async Read (queryParams: QueryParams, channelId: string, token: string): Promise<MessagesPage> {
    // Read messages
    /**
     *
     * @method Read - Read messages from a given channel. Messages are read from a reader
     * add-on such as Timescale. Messages are read from the http adapter.
     * @param {string} channel_id - The ID of the channel to read the message from.
     * @param {string} token - Authentication token.
     */

    const stringParams: Record<string, string> = Object.fromEntries(
      Object.entries(queryParams).map(([key, value]) => [key, String(value)])
    )
    const chanNameParts = channelId.split('.', 2)
    const chanId = chanNameParts[0]
    let subtopicPart = ''
    if (chanNameParts.length === 2) {
      subtopicPart = chanNameParts[1].replace('.', '/')
    }

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
        `channels/${chanId}/messages${subtopicPart}?${new URLSearchParams(stringParams).toString()}`,
        this.readersUrl
        ).toString(),
        options
      )
      if (!response.ok) {
        const errorRes = await response.json()
        throw this.messageError.HandleError(errorRes.error, response.status)
      }
      const messageData: MessagesPage = await response.json()
      return messageData
    } catch (error) {
      throw error
    }
  }
}
