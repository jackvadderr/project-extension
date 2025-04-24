"use client";

import React from "react";

interface AddClientButtonProps {
  onClick: () => void;
}

export default function AddClientButton({ onClick }: AddClientButtonProps) {
  return (
    <button
      onClick={onClick}
      className="bg-green-500 text-white px-4 py-2 rounded-xl shadow hover:bg-green-600 transition"
    >
      + Adicionar Cliente
    </button>
  );
}

