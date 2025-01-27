// Copyright (c) Abstract Machines
// SPDX-License-Identifier: Apache-2.0

import fetchMock, { enableFetchMocks } from "jest-fetch-mock";

import SDK from "../src/sdk";
import type { Channel, ChannelsPage } from "../src/sdk";

enableFetchMocks();

const channelsUrl = "http://localhost";
const sdk = new SDK({ channelsUrl });

describe("Channels", () => {
  const channel: Channel = {
    id: "290b0f49-7a57-4b8c-9e4e-fbf17c6ab7d9",
    name: "channelName",
    domain_id: "bb7edb32-2eac-4aad-aebe-ed96fe073879",
    tags: ["tag1", "tag2"],
  };
  const channels = [
    { name: "channel1", id: "bb7edb32-2eac-4aad-aebe-ed96fe073879" },
    { name: "channel2", id: "bb7edb32-2eac-4aad-aebe-ed96fe073879" },
  ];
  const channelsPage: ChannelsPage = {
    channels: [channel],
    total: 1,
    offset: 0,
    limit: 10,
  };
  const queryParams = {
    offset: 0,
    limit: 10,
  };

  const channelId = "290b0f49-7a57-4b8c-9e4e-fbf17c6ab7d9";
  const groupId = "1be56995-aa42-4940-88e3-1fb1e82065fa";
  const domainId = "886b4266-77d1-4258-abae-2931fb4f16de";
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NjU3OTMwNjksImlhdCI6";
  const channelIds = [
    "b9921574-f562-4048-a6bf-295c0036fc2a",
    "ce42d80e-9773-49b2-a8c2-6aa748597a92",
  ];
  const clientIds = [
    "b9921574-f562-4048-a6bf-295c0036fc2a",
    "ce42d80e-9773-49b2-a8c2-6aa748597a92",
  ];
  const connectionType = ["publish"];
  const roleName = "editor";
  const actions = ["read", "write"];
  const members = ["user1", "user2"];
  const role = { name: roleName, actions, members };

  beforeEach(() => {
    fetchMock.resetMocks();
  });

  test("Channel should retrieve a channel", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(channel));

    const response = await sdk.channels.Channel(channelId, domainId, token);
    expect(response).toEqual(channel);
  });

  test("Create channel should create a channel", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(channel));

    const response = await sdk.channels.CreateChannel(channel, domainId, token);
    expect(response).toEqual(channel);
  });

  test("Create channels should create multiple channels", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(channels));

    const response = await sdk.channels.CreateChannels(
      channels,
      domainId,
      token
    );
    expect(response).toEqual(channels);
  });

  test("Channels should return a list of channels", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(channelsPage));

    const response = await sdk.channels.Channels(queryParams, domainId, token);
    expect(response).toEqual(channelsPage);
  });

  test("Update channel name and metadata should update a channel's name and metadata", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(channel));

    const response = await sdk.channels.UpdateChannelNameAndMetadata(
      channel,
      domainId,
      token
    );
    expect(response).toEqual(channel);
  });

  test("Update channel tags should update channel's tags", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(channel));

    const response = await sdk.channels.UpdateChannelTags(
      channel,
      domainId,
      token
    );
    expect(response).toEqual(channel);
  });

  test("Enable channel should enable a channel", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(channel));

    const response = await sdk.channels.EnableChannel(
      channelId,
      domainId,
      token
    );
    expect(response).toEqual(channel);
  });

  test("Disable channel should disable a channel", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(channel));

    const response = await sdk.channels.DisableChannel(
      channelId,
      domainId,
      token
    );
    expect(response).toEqual(channel);
  });

  test("Delete should delete a channel", async () => {
    const deleteResponse = {
      status: 200,
      message: "Channel deleted successfully",
    };
    fetchMock.mockResponseOnce(JSON.stringify(deleteResponse));

    const response = await sdk.channels.DeleteChannel(
      channelId,
      domainId,
      token
    );
    expect(response).toEqual(deleteResponse);
  });

  test("Connect client should connect clients to a channel", async () => {
    const connectClientResponse = {
      status: 200,
      message: "Clients connected successfully",
    };
    fetchMock.mockResponseOnce(JSON.stringify(connectClientResponse));

    const response = await sdk.channels.ConnectClient(
      clientIds,
      channelId,
      connectionType,
      domainId,
      token
    );
    expect(response).toEqual(connectClientResponse);
  });

  test("Disconnect client should disconnect clients from a channel", async () => {
    const DisconnectClientResponse = {
      status: 200,
      message: "Clients disconnected successfully",
    };
    fetchMock.mockResponseOnce(JSON.stringify(DisconnectClientResponse));

    const response = await sdk.channels.DisconnectClient(
      clientIds,
      channelId,
      connectionType,
      domainId,
      token
    );
    expect(response).toEqual(DisconnectClientResponse);
  });

  test("Connect should connect clients to channels", async () => {
    const connectResponse = {
      status: 200,
      message: "Clients connected successfully",
    };
    fetchMock.mockResponseOnce(JSON.stringify(connectResponse));

    const response = await sdk.channels.Connect(
      clientIds,
      channelIds,
      connectionType,
      domainId,
      token
    );
    expect(response).toEqual(connectResponse);
  });

  test("Disconnect should disconnect clients from channels", async () => {
    const DisconnectResponse = {
      status: 200,
      message: "Clients disconnected successfully",
    };
    fetchMock.mockResponseOnce(JSON.stringify(DisconnectResponse));

    const response = await sdk.channels.Disconnect(
      clientIds,
      channelIds,
      connectionType,
      domainId,
      token
    );
    expect(response).toEqual(DisconnectResponse);
  });

  test("Set channel parent group should set a group parent to a channel", async () => {
    const ChannelParentsResponse = {
      status: 200,
      message: "Channel group parent added successfully",
    };
    fetchMock.mockResponseOnce(JSON.stringify(ChannelParentsResponse));

    const response = await sdk.channels.SetChannelParentGroup(
      domainId,
      channelId,
      groupId,
      token
    );
    expect(response).toEqual(ChannelParentsResponse);
  });

  test("Delete channel parent group should delete a group parent from a channel", async () => {
    const ChannelParentsResponse = {
      status: 200,
      message: "Channel group parent deleted successfully",
    };
    fetchMock.mockResponseOnce(JSON.stringify(ChannelParentsResponse));

    const response = await sdk.channels.DeleteChannelParentGroup(
      domainId,
      channelId,
      token
    );
    expect(response).toEqual(ChannelParentsResponse);
  });

  test("List channel actions should return available actions", async () => {
    const availableActions = ["read", "write", "delete"];
    fetchMock.mockResponseOnce(
      JSON.stringify({ available_actions: availableActions })
    );

    const response = await sdk.channels.ListChannelActions(domainId, token);
    expect(response).toEqual(availableActions);
  });

  test("Create channel role should create a new role and return it", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(role));

    const response = await sdk.channels.CreateChannelRole(
      channelId,
      roleName,
      domainId,
      token,
      actions,
      members
    );
    expect(response).toEqual(role);
  });

  test("List channel roles should return a page of roles", async () => {
    const rolesPage = { roles: [role], total: 1, offset: 0, limit: 10 };
    fetchMock.mockResponseOnce(JSON.stringify(rolesPage));

    const response = await sdk.channels.ListChannelRoles(
      channelId,
      domainId,
      { offset: 0, limit: 10 },
      token
    );
    expect(response).toEqual(rolesPage);
  });

  test("View channel role should return details of a specific role", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(role));

    const response = await sdk.channels.ViewChannelRole(
      channelId,
      domainId,
      roleName,
      token
    );
    expect(response).toEqual(role);
  });

  test("Update channel role should update a role and return the updated role", async () => {
    const updatedRole = { ...role, actions: [...role.actions, "execute"] };
    fetchMock.mockResponseOnce(JSON.stringify(updatedRole));

    const response = await sdk.channels.UpdateChannelRole(
      channelId,
      domainId,
      roleName,
      updatedRole,
      token
    );
    expect(response).toEqual(updatedRole);
  });

  test("Delete channel role should delete a role", async () => {
    const successResponse = {
      status: 200,
      message: "Role deleted successfully",
    };
    fetchMock.mockResponseOnce(JSON.stringify(successResponse));

    const response = await sdk.channels.DeleteChannelRole(
      channelId,
      domainId,
      roleName,
      token
    );
    expect(response).toEqual(successResponse);
  });

  test("Add channel role actions should add actions to a role and return updated actions", async () => {
    const updatedActions = [...actions, "execute"];
    fetchMock.mockResponseOnce(JSON.stringify({ actions: updatedActions }));

    const response = await sdk.channels.AddChannelRoleActions(
      channelId,
      domainId,
      roleName,
      ["execute"],
      token
    );
    expect(response).toEqual(updatedActions);
  });

  test("List channel role actions should return actions of a specific role", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ actions }));

    const response = await sdk.channels.ListChannelRoleActions(
      channelId,
      domainId,
      roleName,
      token
    );
    expect(response).toEqual(actions);
  });

  test("Delete channel role actions should remove actions from a role", async () => {
    const successResponse = {
      status: 200,
      message: "Role actions deleted successfully",
    };
    fetchMock.mockResponseOnce(JSON.stringify(successResponse));

    const response = await sdk.channels.DeleteChannelRoleActions(
      channelId,
      domainId,
      roleName,
      ["write"],
      token
    );
    expect(response).toEqual(successResponse);
  });

  test("Delete all channel role actions should remove all actions from a role", async () => {
    const successResponse = {
      status: 200,
      message: "Role actions deleted successfully",
    };
    fetchMock.mockResponseOnce(JSON.stringify(successResponse));

    const response = await sdk.channels.DeleteAllChannelRoleActions(
      channelId,
      domainId,
      roleName,
      token
    );
    expect(response).toEqual(successResponse);
  });

  test("Add channel role members should add members to a role and return updated members", async () => {
    const updatedMembers = [...members, "user3"];
    fetchMock.mockResponseOnce(JSON.stringify({ members: updatedMembers }));

    const response = await sdk.channels.AddChannelRoleMembers(
      channelId,
      domainId,
      roleName,
      ["user3"],
      token
    );
    expect(response).toEqual(updatedMembers);
  });

  test("List channel role members should return members of a specific role", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ members }));

    const response = await sdk.channels.ListChannelRoleMembers(
      channelId,
      domainId,
      roleName,
      { offset: 0, limit: 10 },
      token
    );
    expect(response).toEqual(members);
  });

  test("Delete channel role members should remove members from a role response", async () => {
    const successResponse = {
      status: 200,
      message: "Role members deleted successfully",
    };
    fetchMock.mockResponseOnce(JSON.stringify(successResponse));

    const response = await sdk.channels.DeleteChannelRoleMembers(
      channelId,
      domainId,
      roleName,
      ["user1"],
      token
    );
    expect(response).toEqual(successResponse);
  });

  test("Delete all channel role members should remove all members from a role response", async () => {
    const successResponse = {
      status: 200,
      message: "Role members deleted successfully",
    };
    fetchMock.mockResponseOnce(JSON.stringify(successResponse));

    const response = await sdk.channels.DeleteAllChannelRoleMembers(
      channelId,
      domainId,
      roleName,
      token
    );
    expect(response).toEqual(successResponse);
  });
});
