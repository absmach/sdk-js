// Copyright (c) Abstract Machines
// SPDX-License-Identifier: Apache-2.0

import type { ClientTelemetry, JournalsPage, JournalsPageMetadata } from "./defs";
import Errors from "./errors";

/**
* @class Journal
* Handles interactions with Journal API.
*/
export default class Journal {
  private readonly journalsUrl: URL;

  private readonly journalsEndpoint: string;

  private readonly contentType: string;

  /**
   * @constructor
   * Initializes the Journal API client.
   * @param {object} config - Configuration object.
   * @param {string} config.journalsUrl - Base URL for the journal API.
   */
  public constructor(journalsUrl: string) {
    this.journalsUrl = new URL(journalsUrl);
    this.contentType = "application/json";
    this.journalsEndpoint = "journal";
  }

  /**
  * @method EntityJournals - Retrieve entity journals by entity id matching the provided query parameters.
  * @param {string} entityType - Entity type i.e client, channel or group.
  * @param {string} entityId - The  unique ID of the entity.
  * @param {string} domainId - The  unique ID of the domain.
  * @param {JournalsPageMetadata} queryParams - Query parameters for the request.
  * @param {string} token - Authorization token.
  * @returns {Promise<JournalsPage>} journalsPage - A page of journals.
  * @throws {Error} - If the journals cannot be fetched.
  */
  public async EntityJournals(
    entityType: string,
    entityId: string,
    domainId: string,
    queryParams: JournalsPageMetadata,
    token: string
  ): Promise<JournalsPage> {
    const stringParams: Record<string, string> = Object.fromEntries(
      Object.entries(queryParams).map(([key, value]) => [key, String(value)])
    );

    const options: RequestInit = {
      method: "GET",
      headers: {
        "Content-Type": this.contentType,
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await fetch(
        new URL(
          `${domainId}/${
            this.journalsEndpoint
          }/${entityType}/${entityId}?${new URLSearchParams(
            stringParams
          ).toString()}`,
          this.journalsUrl
        ).toString(),
        options
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const journalsPage: JournalsPage = await response.json();
      return journalsPage;
    } catch (error) {
      throw error;
    }
  }

  /**
  * @method UserJournals - Retrieve user journals by user id matching the provided query parameters.
  * @param {string} userId - The  unique ID of the user.
  * @param {JournalsPageMetadata} queryParams - Query parameters for the request.
  * @param {string} token - Authorization token.
  * @returns {Promise<JournalsPage>} journalsPage - A page of journals.
  * @throws {Error} - If the journals cannot be fetched.
  */
  public async UserJournals(
    userId: string,
    queryParams: JournalsPageMetadata,
    token: string
  ): Promise<JournalsPage> {
    const stringParams: Record<string, string> = Object.fromEntries(
      Object.entries(queryParams).map(([key, value]) => [key, String(value)])
    );

    const options: RequestInit = {
      method: "GET",
      headers: {
        "Content-Type": this.contentType,
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await fetch(
        new URL(
          `${
            this.journalsEndpoint
          }/user/${userId}?${new URLSearchParams(
            stringParams
          ).toString()}`,
          this.journalsUrl
        ).toString(),
        options
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const journalsPage: JournalsPage = await response.json();
      return journalsPage;
    } catch (error) {
      throw error;
    }
  }

  /**
  * @method ClientTelemetry - Retrieves client telemetry.
  * @param {string} clientId - The  unique ID of the client.
  * @param {string} token - Authorization token.
  * @param {string} domainId - The  unique ID of the domain.
  * @returns {Promise<ClientTelemetry>} clientTelemetry - A  client telemetry interface.
  * @throws {Error} - If client telemetry cannot be fetched.
  */
  public async ClientTelemetry(
    clientId: string,
    domainId: string,
    token: string
  ): Promise<ClientTelemetry> {
    const options: RequestInit = {
      method: "GET",
      headers: {
        "Content-Type": this.contentType,
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await fetch(
        new URL(
          `${domainId}/${
            this.journalsEndpoint
          }/client/${clientId}/telemetry`,
          this.journalsUrl
        ).toString(),
        options
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const clientTelemetry: ClientTelemetry = await response.json();
      return clientTelemetry;
    } catch (error) {
      throw error;
    }
  }
}
