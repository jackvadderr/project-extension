// src/components/ui/checkbox.tsx
"use client";

import { useState, useEffect } from "react";

interface CheckboxProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export function Checkbox({ checked, onCheckedChange }: CheckboxProps) {
  const [isChecked, setIsChecked] = useState(checked);

  // Sincroniza o estado interno quando o prop checked muda
  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  const handleChange = () => {
    const newChecked = !isChecked;
    setIsChecked(newChecked);
    onCheckedChange(newChecked);
  };

  return (
    <input
      type="checkbox"
      checked={isChecked}
      onChange={handleChange}
      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
    />
  );
}
