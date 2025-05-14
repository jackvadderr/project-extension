'use client';

import { UserCircleIcon } from "@heroicons/react/24/solid";
import { useState, useEffect } from 'react';

interface AccessRequest {
  id: string;
  email: string;
  status: string;
  requestDate: string;
}

interface AccessControlWrapperProps {
  getPendingRequests: () => Promise<AccessRequest[]>;
  approveRequest: (id: string) => Promise<void>;
  rejectRequest: (id: string) => Promise<void>;
}

export default function AccessControlWrapper({
                                               getPendingRequests,
                                               approveRequest,
                                               rejectRequest
                                             }: AccessControlWrapperProps) {
  const [requests, setRequests] = useState<AccessRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    try {
      const data = await getPendingRequests();
      setRequests(data);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    try {
      await approveRequest(id);
      await loadRequests();
    } catch (error) {
      console.error('Error approving request:', error);
    }
  };

  const handleReject = async (id: string) => {
    try {
      await rejectRequest(id);
      await loadRequests();
    } catch (error) {
      console.error('Error rejecting request:', error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-900">Controle de Acesso</h1>
        <p className="text-sm text-gray-500 mt-1">Gerencie as solicitações de acesso pendentes</p>
      </div>

      {requests.length === 0 ? (
        <p className="text-gray-500 text-center py-4">Nenhuma solicitação pendente</p>
      ) : (
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
            {requests.map((request) => (
              <tr key={request.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <UserCircleIcon className="h-8 w-8 text-gray-400" />
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{request.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(request.requestDate).toLocaleDateString('pt-BR')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {request.status === 'PENDING' ? (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
          Pendente
        </span>
                  ) : (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
          Rejeitado
        </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {request.status === 'PENDING' && (
                    <>
                      <button
                        onClick={() => handleApprove(request.id)}
                        className="text-green-600 hover:text-green-900 mr-4"
                      >
                        Aprovar
                      </button>
                      <button
                        onClick={() => handleReject(request.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Rejeitar
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}