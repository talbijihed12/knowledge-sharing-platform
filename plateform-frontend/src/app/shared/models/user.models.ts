import { Role } from './role.model';

export class User {
  userId: number;
  username: string;
  email: string;
  enabled: boolean;
  password: string;
  roles: Role[];
  
  createdBy: string;
  createdDate: Date;
  lastModifiedBy: string;
  lastModifiedDate: Date;
}
