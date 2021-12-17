import { RoleEnum } from "src/app/shared/models/enums/role-enum";

export interface LoginResponse {
    email: string;
    id: number
    roles: RoleEnum[];
    token: string;
    type: string;
    username: string;
}