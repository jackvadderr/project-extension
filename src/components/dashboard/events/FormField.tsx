interface FormFieldProps {
  label: string;
  name: string;
  type: 'text' | 'number' | 'date' | 'time' | 'select';
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  required?: boolean;
  options?: Array<{ value: string; label: string }>;
}

export const FormField = ({
                            label,
                            name,
                            type,
                            value,
                            onChange,
                            required = false,
                            options = []
                          }: FormFieldProps) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
      {label}{required && '*'}
    </label>
    {type === 'select' ? (
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {options.map(({ value, label }) => (
          <option key={value} value={value}>{label}</option>
        ))}
      </select>
    ) : (
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    )}
  </div>
);