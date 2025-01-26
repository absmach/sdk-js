// Copyright (c) Abstract Machines
// SPDX-License-Identifier: Apache-2.0

import fetchMock, { enableFetchMocks } from "jest-fetch-mock";

import SDK, { type Journal, type JournalsPage } from "../src/sdk";

enableFetchMocks();

const journalUrl = "http://localhost";
const sdk = new SDK({ journalUrl });

describe("Journal", () => {
  const userJournal: Journal = {
    operation: "user.view",
    occurred_at: "2024-07-03T11:55:31.372177Z",
  };

  const userJournalsPage: JournalsPage = {
    total: 1,
    offset: 0,
    limit: 10,
    journals: [userJournal],
  };

  const token = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9";
  const userId = "895b0543-50ab-46da-9f23-450cfdb2c12f";

  const queryParams = {
    offset: 0,
    limit: 10,
  };
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  describe("EntityJournals", () => {
    const entities = [
      {
        entityType: "client",
        entityId: "97cbb344-7c41-47f3-a53a-a3d435b67207",
        domainId: "77cbb344-7c41-47f3-a53a-a3d435b67207",
        expectedResponse: {
          total: 1,
          offset: 0,
          limit: 10,
          journals: [
            {
              operation: "client.view",
              occurred_at: "2024-07-03T11:55:31.372177Z",
            },
          ],
        },
      },
      {
        entityType: "channel",
        entityId: "78cbb344-7c41-47f3-a53a-a3d435br7208",
        domainId: "77cbb344-7c41-47f3-a53a-a3d435b67207",
        expectedResponse: {
          total: 1,
          offset: 0,
          limit: 10,
          journals: [
            {
              operation: "channel.view",
              occurred_at: "2024-07-03T11:55:31.372177Z",
            },
          ],
        },
      },
      {
        entityType: "group",
        entityId: "10cbb344-7c41-47f3-a53a-a3d435b97207",
        domainId: "77cbb344-7c41-47f3-a53a-a3d435b67207",
        expectedResponse: {
          total: 1,
          offset: 0,
          limit: 10,
          journals: [
            {
              operation: "group.view",
              occurred_at: "2024-07-03T11:55:31.372177Z",
            },
          ],
        },
      },
    ];

    test.each(entities)(
      "Entity journals should return a list of entity journals for entityType",
      async ({ entityType, entityId, domainId, expectedResponse }) => {
        fetchMock.mockResponseOnce(JSON.stringify(expectedResponse));
        const response = await sdk.Journal.EntityJournals(
          entityType,
          entityId,
          domainId,
          queryParams,
          token
        );
        expect(response).toEqual(expectedResponse);
      }
    );
  });

  test("User journals should return a list of user journals", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(userJournalsPage));

    const response = await sdk.Journal.UserJournals(
      userId,
      queryParams,
      token,
    );
    expect(response).toEqual(userJournalsPage);
  });
});
