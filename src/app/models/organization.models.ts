export interface IOrganization {
  id: number;
  businessName: string;
  brandName?: string;
  cuit?: string;
  defaultEmail: string;
  phone1?: string;
  phone2?: string;
  address?: string;
}