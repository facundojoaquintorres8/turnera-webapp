export interface IOrganization {
  id: number;
  businessName: string;
  brandName?: string;
  cuit?: string;
  address?: string;
  phone1?: string;
  phone2?: string;
  defaultEmail: string;
}