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

  test("ListAvailableActions should return available actions", async () => {
    const availableActions = ["read", "write", "delete"];
    fetchMock.mockResponseOnce(JSON.stringify(availableActions));

    const response = await roles.ListAvailableActions(baseUrl, endpoint, token);
    expect(response).toEqual(availableActions);
  });

  test("CreateRole should create a new role and return it", async () => {
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

  test("ListRoles should return a page of roles", async () => {
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

  test("ViewRole should return details of a specific role", async () => {
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

  test("UpdateRole should update a role and return the updated role", async () => {
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

  test("DeleteRole should delete a role and return success response", async () => {
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

  test("AddRoleActions should add actions to a role and return updated actions", async () => {
    const updatedActions = [...actions, "execute"];
    fetchMock.mockResponseOnce(JSON.stringify(updatedActions));

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

  test("ListRoleActions should return actions of a specific role", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(actions));

    const response = await roles.ListRoleActions(
      baseUrl,
      endpoint,
      entityId,
      roleName,
      token
    );
    expect(response).toEqual(actions);
  });

  test("DeleteRoleActions should remove actions from a role and return success response", async () => {
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

  test("DeleteAllRoleActions should remove all actions from a role and return success response", async () => {
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

  test("AddRoleMembers should add members to a role and return updated members", async () => {
    const updatedMembers = [...members, "user3"];
    fetchMock.mockResponseOnce(JSON.stringify(updatedMembers));

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

  test("ListRoleMembers should return members of a specific role", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(members));

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

  test("DeleteRoleMembers should remove members from a role and return success response", async () => {
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

  test("DeleteAllRoleMembers should remove all members from a role and return success response", async () => {
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
