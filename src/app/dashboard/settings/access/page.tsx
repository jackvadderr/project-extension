import { UserCircleIcon } from "@heroicons/react/24/solid";

// Temporary mock data
const mockUsers = [
  { id: 1, email: "john.doe@company.com", status: "pending", requestDate: "2024-03-20" },
  { id: 2, email: "alice.smith@company.com", status: "pending", requestDate: "2024-03-21" },
  { id: 3, email: "bob.wilson@company.com", status: "pending", requestDate: "2024-03-22" },
];

export default function AccessControlPage() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-900">Controle de Acesso</h1>
        <p className="text-sm text-gray-500 mt-1">Gerencie as solicitações de acesso pendentes</p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usuário</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data do Pedido</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
          </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
          {mockUsers.map((user) => (
            <tr key={user.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <UserCircleIcon className="h-8 w-8 text-gray-400" />
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{user.email}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(user.requestDate).toLocaleDateString('pt-BR')}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                    Em espera
                  </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button className="text-green-600 hover:text-green-900 mr-4">
                  Aprovar
                </button>
                <button className="text-red-600 hover:text-red-900">
                  Rejeitar
                </button>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}