"use client";

import { useState } from "react";
import { Customer } from "@/types/Customer";
import SearchBar from '@/components/dashboard/customers/SearchBar';
import AddClientButton from '@/components/dashboard/customers/AddClientButton';
import BulkActionsClient from '@/components/dashboard/customers/BulkActionsClient';
import ClientList from '@/components/dashboard/customers/ClientList';
import ClientForm from '@/components/dashboard/customers/ClientForm';


interface ClientListPageProps {
  initialClients: Customer[];
  createClientAction: (clientData: Omit<Customer, 'id'>) => Promise<Customer>;
  updateClientAction: (id: string, clientData: Partial<Customer>) => Promise<Customer>;
  deleteClientsAction: (ids: string[]) => Promise<void>;
}

export default function ClientListPage({
                                         initialClients,
                                         createClientAction,
                                         updateClientAction,
                                         deleteClientsAction,
                                       }: ClientListPageProps) {
  const [clients, setClients] = useState<Customer[]>(initialClients);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Customer | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedClients, setSelectedClients] = useState<string[]>([]);
  const clientsPerPage = 10;
  const [selectedStatus, setSelectedStatus] = useState<string>('');


  // Filtros e paginação
  const filteredClients = clients.filter(client =>
    (client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (client.email || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (client.cpf || "").includes(searchTerm)) &&
    (!selectedStatus || client.status === selectedStatus)
  );

  const indexOfLastClient = currentPage * clientsPerPage;
  const indexOfFirstClient = indexOfLastClient - clientsPerPage;
  const currentClients = filteredClients.slice(indexOfFirstClient, indexOfLastClient);
  const totalPages = Math.ceil(filteredClients.length / clientsPerPage);

  // Seleção de itens
  const isAllSelected =
    currentClients.length > 0 &&
    currentClients.every(client => selectedClients.includes(client.id));

  const handleSelectClient = (id: string, isSelected: boolean) => {
    setSelectedClients(prev =>
      isSelected
        ? [...prev, id]
        : prev.filter(clientId => clientId !== id)
    );
  };

  const handleSelectAll = (isSelected: boolean) => {
    const currentIds = currentClients.map(c => c.id);
    if (isSelected) {
      setSelectedClients(prev => [...new Set([...prev, ...currentIds])]);
    } else {
      setSelectedClients(prev => prev.filter(id => !currentIds.includes(id)));
    }
  };

  const handleMarkAsInactive = async () => {
    if (selectedClients.length === 0) return;
    try {
      await Promise.all(
        selectedClients.map(id =>
          updateClientAction(id, { status: 'inactive' })
        )
      );
      setClients(prev =>
        prev.map(client =>
          selectedClients.includes(client.id)
            ? { ...client, status: 'inactive' }
            : client
        )
      );
      setSelectedClients([]);
    } catch (error) {
      console.error("Failed to mark clients as inactive:", error);
    }
  };

  const handleAddClient = () => {
    setEditingClient(null);
    setIsModalOpen(true);
  };

  const handleEditClient = (client: Customer) => {
    setEditingClient(client);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingClient(null);
  };

  const handleDeleteClients = async () => {
    if (selectedClients.length === 0) return;
    try {
      await deleteClientsAction(selectedClients);
      setClients(prev => prev.filter(c => !selectedClients.includes(c.id)));
      setSelectedClients([]);
    } catch (error) {
      console.error("Falha ao excluir clientes:", error);
    }
  };

  const handleSubmitClient = async (formData: Omit<Customer, 'id'> | Partial<Customer>) => {
    try {
      if (editingClient) {
        const updated = await updateClientAction(editingClient.id, formData);
        setClients(prev => prev.map(c => c.id === updated.id ? updated : c));
      } else {
        const created = await createClientAction(formData as Omit<Customer, 'id'>);
        setClients(prev => [...prev, created]);
      }
      handleCloseModal();
    } catch (error) {
      console.error("Falha ao salvar cliente:", error);
    }
  };

  return (
    <div className="p-4 sm:p-6">
      {/* Barra de busca e botão de adicionar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-5">
        <div className="w-full sm:w-auto flex-1">
          <div className="flex items-center gap-4">
            <SearchBar
              placeholder="Buscar por nome, email ou CPF..."
              value={searchTerm}
              onChange={e => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
            <select
              value={selectedStatus}
              onChange={(e) => {
                setSelectedStatus(e.target.value);
                setCurrentPage(1);
              }}
              className="px-3 py-2 border rounded-lg bg-white"
            >
              <option value="">Todos os status</option>
              <option value="active">Ativo</option>
              <option value="inactive">Inativo</option>
            </select>
            <div className="text-sm font-medium bg-gray-200 px-3 py-1 rounded-full">
              {filteredClients.length} {filteredClients.length === 1 ? 'cliente' : 'clientes'}
            </div>
          </div>
        </div>
        <AddClientButton onClick={handleAddClient} />
      </div>

      {/* Ações em massa */}
      {selectedClients.length > 0 && (
        <BulkActionsClient
          onDelete={handleDeleteClients}
          onMarkAsInactive={handleMarkAsInactive}
          selectedCount={selectedClients.length}
        />
      )}

      {/* Lista de clientes */}
      <ClientList
        clients={currentClients}
        selectedClients={selectedClients}
        onSelectClient={handleSelectClient}
        onSelectAll={handleSelectAll}
        isAllSelected={isAllSelected}
        onEdit={handleEditClient}
      />

      {/* Paginação */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="bg-gray-500 text-white px-4 py-2 rounded-xl disabled:opacity-50"
        >
          Anterior
        </button>
        <span>Página {currentPage} de {totalPages}</span>
        <button
          onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          className="bg-gray-500 text-white px-4 py-2 rounded-xl disabled:opacity-50"
        >
          Próxima
        </button>
      </div>

      {/* Modal de formulário */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-xl animate-slide-up transition-all duration-300">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                {editingClient ? "Editar Cliente" : "Cadastrar Cliente"}
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                &times;
              </button>
            </div>
            <ClientForm
              onCancel={handleCloseModal}
              onSubmit={handleSubmitClient}
              initialData={editingClient || undefined}
            />
          </div>
        </div>
      )}
    </div>
  );
}
