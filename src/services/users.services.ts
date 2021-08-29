import request from "helpers/request";

import { IUser } from "types/user.model";

type CreateUserRequest = Omit<IUser, "id">;

export function createUser(body: CreateUserRequest): Promise<any> {
  return request.post("/users", { body });
}
export function updateUser(id: number, body: IUser): Promise<any> {
  return request.put(`/users/${id}`, { body });
}
