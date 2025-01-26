// Copyright (c) Abstract Machines
// SPDX-License-Identifier: Apache-2.0

import fetchMock, { enableFetchMocks } from "jest-fetch-mock";
import Roles from "../src/roles";

enableFetchMocks();

describe("Roles", () => {
  const roles = new Roles();

  const baseUrl = new URL("https://example.com");
  const endpoint = "/domains";
  const token = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9";
  const entityId = "123e4567-e89b-12d3-a456-426614174000";
  const roleName = "editor";
  const actions = ["read", "write"];
  const members = ["user1", "user2"];
  const role = { name: roleName, actions, members };
  const queryParams = { offset: 0, limit: 10 };

  beforeEach(() => {
    fetchMock.resetMocks();
  });

  test("List available actions should return available actions", async () => {
    const availableActions = ["read", "write", "delete"];
    fetchMock.mockResponseOnce(JSON.stringify({ available_actions: availableActions }));

    const response = await roles.ListAvailableActions(baseUrl, endpoint, token);
    expect(response).toEqual(availableActions);
  });

  test("Create role should create a new role and return it", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(role));

    const response = await roles.CreateRole(
      baseUrl,
      endpoint,
      entityId,
      roleName,
      token,
      actions,
      members
    );
    expect(response).toEqual(role);
  });

  test("List roles should return a page of roles", async () => {
    const rolesPage = { roles: [role], total: 1, offset: 0, limit: 10 };
    fetchMock.mockResponseOnce(JSON.stringify(rolesPage));

    const response = await roles.ListRoles(
      baseUrl,
      endpoint,
      entityId,
      queryParams,
      token
    );
    expect(response).toEqual(rolesPage);
  });

  test("View role should return details of a specific role", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(role));

    const response = await roles.ViewRole(
      baseUrl,
      endpoint,
      entityId,
      roleName,
      token
    );
    expect(response).toEqual(role);
  });

  test("Update role should update a role and return the updated role", async () => {
    const updatedRole = { ...role, actions: [...actions, "execute"] };
    fetchMock.mockResponseOnce(JSON.stringify(updatedRole));

    const response = await roles.UpdateRole(
      baseUrl,
      endpoint,
      entityId,
      roleName,
      updatedRole,
      token
    );
    expect(response).toEqual(updatedRole);
  });

  test("Delete role should delete a role  response", async () => {
    const successResponse = {
      status: 200,
      message: "Role deleted successfully",
    };
    fetchMock.mockResponseOnce(JSON.stringify(successResponse));

    const response = await roles.DeleteRole(
      baseUrl,
      endpoint,
      entityId,
      roleName,
      token
    );
    expect(response).toEqual(successResponse);
  });

  test("Add role actions should add actions to a role and return updated actions", async () => {
    const updatedActions = [...actions, "execute"];
    fetchMock.mockResponseOnce(JSON.stringify({ actions: updatedActions }));

    const response = await roles.AddRoleActions(
      baseUrl,
      endpoint,
      entityId,
      roleName,
      ["execute"],
      token
    );
    expect(response).toEqual(updatedActions);
  });

  test("List role actions should return actions of a specific role", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ actions }));

    const response = await roles.ListRoleActions(
      baseUrl,
      endpoint,
      entityId,
      roleName,
      token
    );
    expect(response).toEqual(actions);
  });

  test("Delete role actions should remove actions from a role  response", async () => {
    const successResponse = {
      status: 200,
      message: "Role actions deleted successfully",
    };
    fetchMock.mockResponseOnce(JSON.stringify(successResponse));

    const response = await roles.DeleteRoleActions(
      baseUrl,
      endpoint,
      entityId,
      roleName,
      ["write"],
      token
    );
    expect(response).toEqual(successResponse);
  });

  test("Delete all role actions should remove all actions from a role  response", async () => {
    const successResponse = {
      status: 200,
      message: "Role actions deleted successfully",
    };
    fetchMock.mockResponseOnce(JSON.stringify(successResponse));

    const response = await roles.DeleteAllRoleActions(
      baseUrl,
      endpoint,
      entityId,
      roleName,
      token
    );
    expect(response).toEqual(successResponse);
  });

  test("Add role members should add members to a role and return updated members", async () => {
    const updatedMembers = [...members, "user3"];
    fetchMock.mockResponseOnce(JSON.stringify({ members: updatedMembers }));

    const response = await roles.AddRoleMembers(
      baseUrl,
      endpoint,
      entityId,
      roleName,
      ["user3"],
      token
    );
    expect(response).toEqual(updatedMembers);
  });

  test("List role members should return members of a specific role", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ members }));

    const response = await roles.ListRoleMembers(
      baseUrl,
      endpoint,
      entityId,
      roleName,
      queryParams,
      token
    );
    expect(response).toEqual(members);
  });

  test("Delete role members should remove members from a role  response", async () => {
    const successResponse = {
      status: 200,
      message: "Role members deleted successfully",
    };
    fetchMock.mockResponseOnce(JSON.stringify(successResponse));

    const response = await roles.DeleteRoleMembers(
      baseUrl,
      endpoint,
      entityId,
      roleName,
      ["user1"],
      token
    );
    expect(response).toEqual(successResponse);
  });

  test("Delete all role members should remove all members from a role  response", async () => {
    const successResponse = {
      status: 200,
      message: "Role members deleted successfully",
    };
    fetchMock.mockResponseOnce(JSON.stringify(successResponse));

    const response = await roles.DeleteAllRoleMembers(
      baseUrl,
      endpoint,
      entityId,
      roleName,
      token
    );
    expect(response).toEqual(successResponse);
  });
});
