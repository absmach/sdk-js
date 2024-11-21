import type {
  PageMetadata,
  Role,
  RolePage,
  Response,
  BasicPageMeta,
} from "./defs";
import Errors from "./errors";

export default class Roles {
  private readonly contentType: string;

  public constructor() {
    this.contentType = "application/json";
  }

  public async ListAvailableActions(url: URL, endpoint: string, token: string) {
    const options: RequestInit = {
      method: "GET",
      headers: {
        "Content-Type": this.contentType,
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await fetch(
        new URL(`${endpoint}/roles/available-actions`, url).toString(),
        options,
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const actions = await response.json();
      return actions;
    } catch (error) {
      throw error;
    }
  }

  public async CreateRole(
    url: URL,
    endpoint: string,
    entityId: string,
    roleName: string,
    token: string,
    optionalActions?: string[],
    optionalMembers?: string[],
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
        new URL(`${endpoint}/${entityId}/roles`, url).toString(),
        options,
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const role: Role = await response.json();
      return role;
    } catch (error) {
      throw error;
    }
  }

  public async ListRoles(
    url: URL,
    endpoint: string,
    entityId: string,
    queryParams: PageMetadata,
    token: string,
  ) {
    const stringParams: Record<string, string> = Object.fromEntries(
      Object.entries(queryParams).map(([key, value]) => [key, String(value)]),
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
          `${endpoint}/${entityId}/roles?${new URLSearchParams(
            stringParams,
          ).toString()}`,
          url,
        ).toString(),
        options,
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const roles: RolePage = await response.json();
      return roles;
    } catch (error) {
      throw error;
    }
  }

  public async ViewRole(
    url: URL,
    endpoint: string,
    entityId: string,
    roleName: string,
    token: string,
  ) {
    const options: RequestInit = {
      method: "GET",
      headers: {
        "Content-Type": this.contentType,
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await fetch(
        new URL(`${endpoint}/${entityId}/roles/${roleName}`, url).toString(),
        options,
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const role: Role = await response.json();
      return role;
    } catch (error) {
      throw error;
    }
  }

  public async UpdateRole(
    url: URL,
    endpoint: string,
    entityId: string,
    roleName: string,
    role: Role,
    token: string,
  ) {
    const options: RequestInit = {
      method: "PUT",
      headers: {
        "Content-Type": this.contentType,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(role),
    };

    try {
      const response = await fetch(
        new URL(`${endpoint}/${entityId}/roles/${roleName}`, url).toString(),
        options,
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const updatedRole: Role = await response.json();
      return updatedRole;
    } catch (error) {
      throw error;
    }
  }

  public async DeleteRole(
    url: URL,
    endpoint: string,
    entityId: string,
    roleName: string,
    token: string,
  ) {
    const options: RequestInit = {
      method: "DELETE",
      headers: {
        "Content-Type": this.contentType,
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await fetch(
        new URL(`${endpoint}/${entityId}/roles/${roleName}`, url).toString(),
        options,
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const deleteResponse: Response = {
        status: response.status,
        message: "Role deleted successfully",
      };
      return deleteResponse;
    } catch (error) {
      throw error;
    }
  }

  public async AddRoleActions(
    url: URL,
    endpoint: string,
    entityId: string,
    roleName: string,
    actions: string[],
    token: string,
  ) {
    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": this.contentType,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ actions }),
    };

    try {
      const response = await fetch(
        new URL(
          `${endpoint}/${entityId}/roles/${roleName}/actions`,
          url,
        ).toString(),
        options,
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const addedActions: string[] = await response.json();
      return addedActions;
    } catch (error) {
      throw error;
    }
  }

  public async ListRoleActions(
    url: URL,
    endpoint: string,
    entityId: string,
    roleName: string,
    token: string,
  ) {
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
          `${endpoint}/${entityId}/roles/${roleName}/actions`,
          url,
        ).toString(),
        options,
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const actions: string[] = await response.json();
      return actions;
    } catch (error) {
      throw error;
    }
  }

  public async DeleteRoleActions(
    url: URL,
    endpoint: string,
    entityId: string,
    roleName: string,
    actions: string[],
    token: string,
  ) {
    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": this.contentType,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ actions }),
    };

    try {
      const response = await fetch(
        new URL(
          `${endpoint}/${entityId}/roles/${roleName}/actions/delete`,
          url,
        ).toString(),
        options,
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const deleteResponse: Response = {
        status: response.status,
        message: "Role actions deleted successfully",
      };
      return deleteResponse;
    } catch (error) {
      throw error;
    }
  }

  public async DeleteAllRoleActions(
    url: URL,
    endpoint: string,
    entityId: string,
    roleName: string,
    token: string,
  ) {
    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": this.contentType,
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await fetch(
        new URL(
          `${endpoint}/${entityId}/roles/${roleName}/actions/delete-all`,
          url,
        ).toString(),
        options,
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const deleteResponse: Response = {
        status: response.status,
        message: "Role actions deleted successfully",
      };
      return deleteResponse;
    } catch (error) {
      throw error;
    }
  }

  public async AddRoleMembers(
    url: URL,
    endpoint: string,
    entityId: string,
    roleName: string,
    members: string[],
    token: string,
  ) {
    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": this.contentType,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ members }),
    };

    try {
      const response = await fetch(
        new URL(
          `${endpoint}/${entityId}/roles/${roleName}/members`,
          url,
        ).toString(),
        options,
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const addedMembers: string[] = await response.json();
      return addedMembers;
    } catch (error) {
      throw error;
    }
  }

  public async ListRoleMembers(
    url: URL,
    endpoint: string,
    entityId: string,
    roleName: string,
    queryParams: BasicPageMeta,
    token: string,
  ) {
    const options: RequestInit = {
      method: "GET",
      headers: {
        "Content-Type": this.contentType,
        Authorization: `Bearer ${token}`,
      },
    };

    const stringParams: Record<string, string> = Object.fromEntries(
      Object.entries(queryParams).map(([key, value]) => [key, String(value)]),
    );

    try {
      const response = await fetch(
        new URL(
          `${endpoint}/${entityId}/roles/${roleName}/members?${new URLSearchParams(
            stringParams,
          ).toString()}`,
          url,
        ).toString(),
        options,
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const members: string[] = await response.json();
      return members;
    } catch (error) {
      throw error;
    }
  }

  public async DeleteRoleMembers(
    url: URL,
    endpoint: string,
    entityId: string,
    roleName: string,
    members: string[],
    token: string,
  ) {
    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": this.contentType,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ members }),
    };

    try {
      const response = await fetch(
        new URL(
          `${endpoint}/${entityId}/roles/${roleName}/members/delete`,
          url,
        ).toString(),
        options,
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const deleteResponse: Response = {
        status: response.status,
        message: "Role members deleted successfully",
      };
      return deleteResponse;
    } catch (error) {
      throw error;
    }
  }

  public async DeleteAllRoleMembers(
    url: URL,
    endpoint: string,
    entityId: string,
    roleName: string,
    token: string,
  ) {
    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": this.contentType,
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await fetch(
        new URL(
          `${endpoint}/${entityId}/roles/${roleName}/members/delete-all`,
          url,
        ).toString(),
        options,
      );
      if (!response.ok) {
        const errorRes = await response.json();
        throw Errors.HandleError(errorRes.message, response.status);
      }
      const deleteResponse: Response = {
        status: response.status,
        message: "Role members deleted successfully",
      };
      return deleteResponse;
    } catch (error) {
      throw error;
    }
  }
}
