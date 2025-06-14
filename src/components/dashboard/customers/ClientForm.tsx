"use client";

import React, { useState, useEffect } from "react";
import { Customer } from "@/types/Customer";

interface ClientFormProps {
  initialData?: Customer;
  onCancel: () => void;
  onSubmit: (data: Omit<Customer, 'id'> | Partial<Customer>) => Promise<void>;
}

// Função para validar CPF
function validateCPF(cpf: string): boolean {
  // Remove caracteres não numéricos
  cpf = cpf.replace(/[^\d]+/g, '');

  // Verifica se tem 11 dígitos ou se é uma sequência de dígitos repetidos
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
    return false;
  }

  // Validação do primeiro dígito verificador
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let remainder = 11 - (sum % 11);
  let digit = remainder >= 10 ? 0 : remainder;
  if (digit !== parseInt(cpf.charAt(9))) {
    return false;
  }

  // Validação do segundo dígito verificador
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf.charAt(i)) * (11 - i);
  }
  remainder = 11 - (sum % 11);
  digit = remainder >= 10 ? 0 : remainder;
  if (digit !== parseInt(cpf.charAt(10))) {
    return false;
  }

  return true;
}

export default function ClientForm({ initialData, onCancel, onSubmit }: ClientFormProps) {
  const [form, setForm] = useState<Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>>({
    name: initialData?.name || "",
    cpf: initialData?.cpf || "",
    phone: initialData?.phone || "",
    email: initialData?.email || "",
    address: initialData?.address || "",
    status: initialData?.status || 'active',
    document: initialData?.document || "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name,
        cpf: initialData.cpf,
        phone: initialData.phone || "",
        email: initialData.email || "",
        address: initialData.address || "",
        status: initialData.status,
        document: initialData.document,
      });
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // Formatação do CPF enquanto digita
    if (name === 'cpf') {
      const formattedValue = value
        .replace(/\D/g, '') // Remove tudo que não é dígito
        .replace(/(\d{3})(\d)/, '$1.$2') // Coloca ponto após 3 dígitos
        .replace(/(\d{3})(\d)/, '$1.$2') // Coloca ponto após mais 3 dígitos
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Coloca hífen antes dos últimos 2 dígitos

      setForm(prev => ({ ...prev, [name]: formattedValue }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }

    // Limpa o erro quando o usuário começa a digitar
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!form.name) {
      newErrors.name = 'Nome é obrigatório';
    }

    if (!form.cpf) {
      newErrors.cpf = 'CPF é obrigatório';
    } else if (!validateCPF(form.cpf)) {
      newErrors.cpf = 'CPF inválido';
    }

    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Email inválido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    await onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-md">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome*</label>
        <input
          id="name"
          name="name"
          required
          value={form.name}
          onChange={handleChange}
          className={`mt-1 block w-full px-3 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />
        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
      </div>
      <div>
        <label htmlFor="cpf" className="block text-sm font-medium text-gray-700">CPF*</label>
        <input
          id="cpf"
          name="cpf"
          required
          value={form.cpf}
          onChange={handleChange}
          placeholder="000.000.000-00"
          maxLength={14}
          className={`mt-1 block w-full px-3 py-2 border ${errors.cpf ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />
        {errors.cpf && <p className="mt-1 text-sm text-red-600">{errors.cpf}</p>}
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          className={`mt-1 block w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />
        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Telefone</label>
        <input
          id="phone"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">Endereço</label>
        <input
          id="address"
          name="address"
          value={form.address}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status*</label>
        <select
          id="status"
          name="status"
          value={form.status}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="active">Ativo</option>
          <option value="inactive">Inativo</option>
        </select>
      </div>
      <div className="flex justify-end gap-4 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          {initialData ? "Atualizar Cliente" : "Cadastrar Cliente"}
        </button>
      </div>
    </form>
  );
}