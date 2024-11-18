import Errors from "./errors";

export default class Roles {
  private readonly contentType: string;
  private readonly roleError: Errors;

  public constructor() {
    this.contentType = "application/json";
    this.roleError = new Errors();
  }

  public async ListAvailableActions(url: string, token: string) {
    const options: RequestInit = {
      method: "GET",
      headers: {
        "Content-Type": this.contentType,
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await fetch(
        new URL("/roles/available-actions", url).toString(),
        options
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw this.roleError.HandleError(errorRes.message, response.status);
      }
      const actions = await response.json();
      return actions;
    } catch (error) {
      throw error;
    }
  }

  public async CreateRole(
    url: string,
    entityId: string,
    roleName: string,
    token: string,
    optionalActions?: string[],
    optionalMembers?: string[]
  ) {
    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": this.contentType,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        role_name: roleName,
        optional_actions: optionalActions,
        optional_members: optionalMembers,
      }),
    };
    try {
      const response = await fetch(
        new URL(`${entityId}/roles`, url).toString(),
        options
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw this.roleError.HandleError(errorRes.message, response.status);
      }
      const role = await response.json();
      return role;
    } catch (error) {
      throw error;
    }
  }
}
