import { CustomerDetails } from '@/types/Customer';

interface CustomerDetailsRowProps {
  customer: CustomerDetails;
}

export function CustomerDetailsRow({ customer }: CustomerDetailsRowProps) {
  return (
    <tr className="bg-gray-50">
      <td className="px-6 py-4" colSpan={6}>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
          {customer.name && (
            <div>
              <p className="text-gray-500">Nome completo</p>
              <p className="font-medium">{customer.name}</p>
            </div>
          )}
          {customer.cpf && (
            <div>
              <p className="text-gray-500">CPF</p>
              <p className="font-medium">{customer.cpf}</p>
            </div>
          )}
          {customer.email && (
            <div>
              <p className="text-gray-500">Email</p>
              <p className="font-medium">{customer.email}</p>
            </div>
          )}
          {customer.phone && (
            <div>
              <p className="text-gray-500">Telefone</p>
              <p className="font-medium">{customer.phone}</p>
            </div>
          )}
          {customer.address && (
            <div className="col-span-2">
              <p className="text-gray-500">Endereço</p>
              <p className="font-medium">{customer.address}</p>
            </div>
          )}
          {customer.document && (
            <div>
              <p className="text-gray-500">Documento</p>
              <p className="font-medium">{customer.document}</p>
            </div>
          )}
          <div>
            <p className="text-gray-500">Status</p>
            <p className="font-medium capitalize">
              {customer.status === 'active' ? 'Ativo' : 'Inativo'}
            </p>
          </div>
          {customer.createdAt && (
            <div>
              <p className="text-gray-500">Criado em</p>
              <p className="font-medium">
                {new Date(customer.createdAt).toLocaleDateString()}
              </p>
            </div>
          )}
          {customer.updatedAt && (
            <div>
              <p className="text-gray-500">Última atualização</p>
              <p className="font-medium">
                {new Date(customer.updatedAt).toLocaleDateString()}
              </p>
            </div>
          )}
          {customer.lastPurchaseDate && (
            <div>
              <p className="text-gray-500">Última compra</p>
              <p className="font-medium">
                {new Date(customer.lastPurchaseDate).toLocaleDateString()}
              </p>
            </div>
          )}
          {customer.totalPurchases !== undefined && (
            <div>
              <p className="text-gray-500">Total de compras</p>
              <p className="font-medium">{customer.totalPurchases}</p>
            </div>
          )}
          {customer.observations && (
            <div className="col-span-2 md:col-span-3">
              <p className="text-gray-500">Observações</p>
              <p className="font-medium">{customer.observations}</p>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
}