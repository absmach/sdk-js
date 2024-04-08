import Errors from './errors'

import {
  type Response,
  type MessagesPage,
  type QueryParams
} from './defs'

export default class Messages {
  // Messages API Client
  /**
   * @method Messages - Messages is used to manage messages.
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
     * @method Send- Sends message to a given channel via HTTP protocol. Message is sent
     * through a writer add-on such as timescale. Message is sent to a
     * http port specific to the writer add-on. The thing and channel must be
     * created before sending the message and connected.
     * @param {string} channel_id - The channel_id of the channel to send the message to.
     * @param {string} msg -message to send to the channel that should be in encoded into
     *       bytes format for example:
     *       [{"bn":"demo", "bu":"V", "n":"voltage", "u":"V", "v":5}]
     * @param {string} thing_key - The secret of the thing sending the message.
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
      body: JSON.stringify(new TextEncoder().encode(msg))
    }
    try {
      const response = await fetch(
        new URL(
          `channels/${chanId}/messages/${subtopic}`,
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
     * add-on such as timescale. Messages are read from a http port specific to the reader
     * @param {string} channel_id - The channel_id of the channel to read the message from.
     * @param {string} token - The token to be used for authentication.
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
