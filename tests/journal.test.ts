import fetchMock, { enableFetchMocks } from "jest-fetch-mock";

import SDK, { type Journal, type JournalsPage } from "../src/sdk";

enableFetchMocks();

const journalUrl = "http://localhost";
const sdk = new SDK({ journalUrl });

describe("Journal", () => {
  const journal: Journal = {
    operation: "client.view",
    occurred_at: "2024-07-03T11:55:31.372177Z",
  };

  const journalsPage: JournalsPage = {
    total: 1,
    offset: 0,
    limit: 10,
    journals: [journal],
  };

  const token = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9";
  const domainId = "886b4266-77d1-4258-abae-2931fb4f16de";
  const entityType = "client";
  const entityId = "134135";

  const queryParams = {
    offset: 0,
    limit: 10,
  };
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  test("Journal should return a list of journals", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(journalsPage));

    const response = await sdk.Journal.Journal(
      entityType,
      entityId,
      domainId,
      queryParams,
      token,
    );
    expect(response).toEqual(journalsPage);
  });
});
