// src/types/Customer.ts
export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  document: string;
  address: string;
  status: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
}

export interface Customer {
  id: string;
  name: string;
  cpf: string;
  phone?: string | null;
  email?: string | null;
  address?: string | null;
  status: CustomerStatus;
  createdAt: Date;
  updatedAt: Date;
  events?: Event[];
}

export type CustomerStatus = 'active' | 'inactive';
