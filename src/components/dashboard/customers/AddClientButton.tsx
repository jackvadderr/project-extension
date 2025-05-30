"use client";

import { UserPlus } from 'lucide-react';

interface AddClientButtonProps {
  onClick: () => void;
}

export default function AddClientButton({ onClick }: AddClientButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-xl shadow hover:bg-green-600 transition"
    >
      <span className="text-lg">➕</span>
      <span>Adicionar Cliente</span>
    </button>

  );
}
