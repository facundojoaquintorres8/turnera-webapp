import { IProfile } from "./profile.models";

export interface IUser {
  id: number;
  organizationId: number;
  active: boolean;
  firstName: string;
  lastName: string;
  username: string;
  admin?: boolean;
  profiles: IProfile[];
}