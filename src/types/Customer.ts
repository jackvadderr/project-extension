export interface Customer {
  id: string;
  name: string;
  cpf: string;
  phone?: string | null;
  email?: string | null;
  address?: string | null;
  document: string;
  status: CustomerStatus;
  createdAt: Date;
  updatedAt: Date;
  events?: Event[];
}

export type CustomerStatus = 'active' | 'inactive';

export interface CustomerDetails extends Omit<Customer, 'createdAt' | 'updatedAt'> {
  createdAt: string;
  updatedAt: string;
  observations?: string;
  lastPurchaseDate?: string;
  totalPurchases?: number;
}