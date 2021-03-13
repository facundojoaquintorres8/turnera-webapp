import { IResourceType } from "./resourceType.models";

export interface IResource {
  id: number;
  organizationId: number;
  active: boolean;
  description: string;
  code?: string;
  resourceType: IResourceType;
}