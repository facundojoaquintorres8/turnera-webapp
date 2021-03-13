export interface IProfile {
  id: number;
  organizationId: number;
  active: boolean;
  description: string;
  permissions: IPermission[];
}

export interface IPermission {
  id: number;
  description: string;
  code: string;
}